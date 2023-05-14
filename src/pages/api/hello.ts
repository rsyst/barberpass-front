// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { middleware } from '@shared/utils/middleware'

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'john' })
}

export default middleware(['GET'], handler)
