import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: '只支持GET请求' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // 首先获取系统配置
    const systemResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SYSTEM_SHEET_ID,
      range: 'Categories!A2:G', // 系统配置表格范围
    });

    if (!systemResponse.data.values || systemResponse.data.values.length === 0) {
      return res.status(404).json({ error: '未找到系统配置数据' });
    }

    // 处理系统配置数据
    const systemCategories = systemResponse.data.values.map((row) => ({
      internalName: row[0],
      lang: row[1],
      categoryName: row[2],
      sheetName: row[3],
      spreadId: row[4],
      apiKey: row[5],
      internalCode: row[6]
    }));

    // 对系统配置数据进行去重处理
    const uniqueCategories = Array.from(new Set(
      systemCategories.map(cat => cat.categoryName)
    )).map(name => {
      const category = systemCategories.find(cat => cat.categoryName === name);
      if (!category) return null;
      return {
        ...category,
        subCategories: systemCategories
          .filter(cat => cat.internalCode === category.internalCode)
          .map(cat => ({
            sheetName: cat.sheetName,
            lang: cat.lang,
            spreadId: cat.spreadId,
            apiKey: cat.apiKey
          }))
      };
    }).filter(Boolean);

    res.status(200).json(uniqueCategories);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
}