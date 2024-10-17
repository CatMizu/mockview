// pages/api/stop-egress.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { EgressClient } from 'livekit-server-sdk';

type Data = {
  message?: string;
  error?: string;
};

// 从环境变量中读取必要的配置
const LIVEKIT_SERVER_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL!;
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;

if (!LIVEKIT_SERVER_URL || !LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) {
  throw new Error('缺少必要的环境变量。');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // 仅允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { egressId } = req.body;

  // 验证请求体中是否包含 egressId
  if (!egressId || typeof egressId !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing egressId' });
  }

  try {
    // 初始化 EgressClient
    const egressClient = new EgressClient(LIVEKIT_SERVER_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
    
    // 停止指定的 egress
    await egressClient.stopEgress(egressId);

    res.status(200).json({ message: 'Egress stopped successfully' });
  } catch (error) {
    console.error('Error stopping egress:', error);
    res.status(500).json({ error: 'Failed to stop egress' });
  }
}
