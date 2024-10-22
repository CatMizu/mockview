// /pages/api/analyze-text.ts
// pages/api/conversation-analyze.ts
import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from "next";
import AWS from 'aws-sdk';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRET_KEY = process.env.S3_SECRET_KEY;
const S3_BUCKET = process.env.S3_BUCKET;
const S3_REGION = process.env.S3_REGION;

if (!S3_ACCESS_KEY || !S3_SECRET_KEY || !S3_BUCKET || !S3_REGION) {
  throw new Error('Missing necessary S3 environment variables.');
}

const s3 = new AWS.S3({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
  region: S3_REGION,
});

const prompt = `
Provide feedback for the learner based on the conversation transcript, considering the following grading criteria.

If the learner’s performance was excellent, simply acknowledge their strengths without unnecessary feedback. For areas that need improvement, offer constructive suggestions on how they can improve, and propose specific next steps or actions for further development. Be mindful of their past feedback and improvements to tailor the suggestions appropriately.
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { text, timestamp, userEmail } = req.body;

    if (!text || !timestamp) {
      return res.status(400).json({ error: "Text and timestamp are required" });
    }

    try {
      // Step 1: 调用 OpenAI API 分析文本
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant that evaluates how well the user's speech is structured and clear." },
          { role: "user", content: text },
        ],
      });

      const analysisResult = response.choices[0].message?.content || "No analysis available";

      const fileName = `${userEmail}_${timestamp}_analysis.txt`;

      const params = {
        Bucket: S3_BUCKET as string,
        Key: fileName,
        Body: analysisResult,
        ContentType: 'text/plain',
      };

      await s3.upload(params).promise();

      res.status(200).json({ message: `Analysis stored as ${fileName}` });
    } catch (error) {
      console.error("Error analyzing and storing text:", error);
      res.status(500).json({ error: "Failed to analyze and store text" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
