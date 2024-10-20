// pages/api/list-user-recordings.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

type Data = {
  videoUrls?: string[];
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
      Prefix: `${userEmail}_`, 
    };

    const listedObjects = await s3.listObjectsV2(params).promise();
    const files = listedObjects.Contents || [];


    const sortedFiles = files
      .filter((file) => file.Key?.endsWith('.m3u8') && !file.Key.includes('-live')) 
      .sort((a, b) => {
        const timeA = new Date(a.LastModified!).getTime();
        const timeB = new Date(b.LastModified!).getTime();
        return timeB - timeA;  
      });


    const videoUrls = sortedFiles.map((file) => `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${file.Key}`);

    res.status(200).json({ videoUrls });
  } catch (error) {
    console.error('Error listing recordings:', error);
    res.status(500).json({ error: 'Failed to list recordings' });
  }
}
