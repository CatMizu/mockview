// /pages/api/analyze-text.ts

import OpenAI from "openai"; // 使用 OpenAI 而不是 OpenAIApi
import type { NextApiRequest, NextApiResponse } from "next";

// 初始化 OpenAI 配置
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // 从环境变量中读取 API Key
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    try {
      // 调用 OpenAI API 来分析文本
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant that evaluates how well the user's speech is structured and clear." },
          { role: "user", content: text },
        ],
      });

      // 返回分析结果
      const analysisResult = response.choices[0].message?.content || "No analysis available";
      res.status(200).json({ analysisResult });
    } catch (error) {
      console.error("OpenAI API error:", error);
      res.status(500).json({ error: "OpenAI API request failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
