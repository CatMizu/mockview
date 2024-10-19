// pages/api/start-recording
import type { NextApiRequest, NextApiResponse } from 'next';
import { EgressClient, SegmentedFileOutput, EncodingOptionsPreset } from 'livekit-server-sdk';

type Data = {
  egressId?: string;
  message?: string;
  error?: string;
};

const LIVEKIT_SERVER_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL!;
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRET = process.env.S3_SECRET_KEY;
const S3_BUCKET = process.env.S3_BUCKET;
const S3_REGION = process.env.S3_REGION;

if (
  !LIVEKIT_SERVER_URL ||
  !LIVEKIT_API_KEY ||
  !LIVEKIT_API_SECRET ||
  !S3_ACCESS_KEY ||
  !S3_SECRET ||
  !S3_BUCKET ||
  !S3_REGION
) {
  throw new Error('Missing necessary environment variables.');
}

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { roomName, userEmail, timestamp } = req.body;

  if (!roomName || typeof roomName !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing roomName' });
  }

  try {
    const outputs = {
      segments: new SegmentedFileOutput({
        filenamePrefix: `${userEmail}_${timestamp}_output`,
        playlistName: `${userEmail}_${timestamp}_output.m3u8`,
        livePlaylistName: `${userEmail}_${timestamp}_output-live.m3u8`,
        segmentDuration: 2,
        output: {
          case: 's3',
          value: {
            accessKey: S3_ACCESS_KEY,
            secret: S3_SECRET,
            bucket: S3_BUCKET,
            region: S3_REGION,
            forcePathStyle: true,
          },
        },
      }),
    };

    const egressClient = new EgressClient(LIVEKIT_SERVER_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
    const egress = await egressClient.startRoomCompositeEgress(roomName, outputs, {
      layout: 'grid',
      encodingOptions: EncodingOptionsPreset.H264_1080P_30,
      audioOnly: false,
    });


    res.status(200).json({ 
      egressId: egress.egressId,
      message: 'Egress started successfully' 
    });
  } catch (error) {
    console.error('Error starting egress:', error);
    res.status(500).json({ error: 'Failed to start egress' });
  }
}