import { google } from 'googleapis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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

    const { spreadId, sheetName, apiKey } = req.query;
    if (!spreadId || !sheetName || !apiKey) {
      return res.status(400).json({ error: '缺少必要的参数' });
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadId as string,
      range: `${sheetName}!A2:I`, // 扩展范围到I列以包含日语文本
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: '未找到数据' });
    }

    const questions = rows.map((row, index) => ({
      id: index + 2, // 因为数据从A2开始，所以索引需要加2
      question: row[1],
      options: [row[2], row[3], row[4], row[5]].filter(Boolean),
      correctAnswer: parseInt(row[6]) - 1, // 假设正确答案是1-4的数字，转换为0-3的索引
      explanation: row[7],
      japaneseText: row[8] || null
    }));

    res.status(200).json(questions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
}