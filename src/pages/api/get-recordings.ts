// pages/api/list-user-recordings.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

type Data = {
  videoUrls?: string[];
  message?: string;
  error?: string;
};

// 从环境变量中读取必要的配置
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRET_KEY = process.env.S3_SECRET_KEY;
const S3_BUCKET = process.env.S3_BUCKET;
const S3_REGION = process.env.S3_REGION;

if (!S3_ACCESS_KEY || !S3_SECRET_KEY || !S3_BUCKET || !S3_REGION) {
  throw new Error('Missing necessary S3 environment variables.');
}

// 初始化 S3 客户端
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
    // 列出所有带有用户邮箱的文件
    const params = {
      Bucket: S3_BUCKET as string,
      Prefix: `${userEmail}_`,  // 根据前缀匹配所有相关文件
    };

    const listedObjects = await s3.listObjectsV2(params).promise();
    const files = listedObjects.Contents || [];

    // 按照文件名中的 timestamp 进行排序，假设文件名格式为 userEmail_timestamp_output
    const sortedFiles = files
      .filter((file) => file.Key?.includes(userEmail)) // 过滤掉不相关的文件
      .sort((a, b) => {
        const timeA = new Date(a.LastModified!).getTime();
        const timeB = new Date(b.LastModified!).getTime();
        return timeB - timeA;  // 按时间倒序排列
      });

    // 生成每个文件的预签名 URL
    const videoUrls = await Promise.all(
      sortedFiles.map((file) => {
        const params = {
          Bucket: S3_BUCKET,
          Key: file.Key!,
          Expires: 60 * 60, // 1小时过期
        };
        return s3.getSignedUrlPromise('getObject', params);
      })
    );

    res.status(200).json({ videoUrls });
  } catch (error) {
    console.error('Error listing recordings:', error);
    res.status(500).json({ error: 'Failed to list recordings' });
  }
}
