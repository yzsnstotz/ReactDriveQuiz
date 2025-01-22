import { google } from 'googleapis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const sheets = google.sheets('v4');

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

    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ error: '缺少category参数' });
    }

    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.SHEET_ID,
      range: `${category}!A2:G`, // 假设数据从A2开始，包含题目所有字段
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: '未找到数据' });
    }

    const questions = rows.map((row) => ({
      id: parseInt(row[0]),
      question: row[1],
      japaneseText: row[2],
      options: [row[3], row[4], row[5], row[6]],
      correctAnswer: parseInt(row[7]) - 1, // 假设正确答案在第8列，从1开始计数
      explanation: row[8],
    }));

    res.status(200).json(questions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
}