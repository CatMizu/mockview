// pages/api/list-user-analyses.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

type Data = {
  analysisContents?: { fileName: string; content: string }[];
  message?: string;
  error?: string;
};

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userEmail } = req.body;

  if (!userEmail || typeof userEmail !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing userEmail' });
  }

  try {
    const params = {
      Bucket: S3_BUCKET as string,
      Prefix: `${userEmail}_`, // 只列出以用户邮箱开头的文件
    };

    const listedObjects = await s3.listObjectsV2(params).promise();
    const files = listedObjects.Contents || [];

    // 过滤出以 '_analysis.txt' 结尾的文件，并按时间排序
    const sortedFiles = files
      .filter((file) => file.Key?.endsWith('_analysis.txt')) 
      .sort((a, b) => {
        const timeA = new Date(a.LastModified!).getTime();
        const timeB = new Date(b.LastModified!).getTime();
        return timeB - timeA;  
      });

    // 用来存储每个文件的内容
    const analysisContents: { fileName: string; content: string }[] = [];

    // 循环读取每个符合条件的文件内容
    for (const file of sortedFiles) {
      const fileParams = {
        Bucket: S3_BUCKET as string,
        Key: file.Key as string,
      };

      // 获取文件内容
      const fileData = await s3.getObject(fileParams).promise();
      const fileContent = fileData.Body?.toString('utf-8') || ''; // 将文件内容转为字符串

      // 添加到分析内容数组中
      analysisContents.push({
        fileName: file.Key as string,
        content: fileContent,
      });
    }

    // 返回分析文件的内容列表
    res.status(200).json({ analysisContents });
  } catch (error) {
    console.error('Error listing analysis files:', error);
    res.status(500).json({ error: 'Failed to list analysis files' });
  }
}
