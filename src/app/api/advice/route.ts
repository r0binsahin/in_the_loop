import { giveAdvice } from '@/lib/advice';
import { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'edge';
export async function POST(request: NextApiRequest, response: NextApiResponse) {
  const result = await giveAdvice();
  return result;
}
