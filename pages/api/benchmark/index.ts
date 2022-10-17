import { randomBytes } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).send(randomBytes(1000000 * 500)) // 500 megabytes
}
