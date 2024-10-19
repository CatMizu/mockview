import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.SES_ACCESS_KEY, 
  secretAccessKey: process.env.SES_SECRET_KEY,
});

const ses = new AWS.SES();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text } = req.body;

  const params = {
    Destination: {
      ToAddresses: ['jianhaotian1206@gmail.com'],
    },
    Message: {
      Body: {
        Text: { Data: text },
      },
      Subject: { Data: 'Transcript from your session' },
    },
    Source: 'zhrmghgjht@gmail.com',
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log("Email sent successfully", result);
    return res.status(200).json({ message: 'Email sent successfully', result });
  } catch (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ error: 'Email sending failed', details: error });
  }
}
