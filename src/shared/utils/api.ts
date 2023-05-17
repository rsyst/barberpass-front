import { NextApiRequest } from 'next'

export interface RstNextApiRequest<T = unknown> extends NextApiRequest {
  body: T
  user_id?: string
}
