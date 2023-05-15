import { NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { RstNextApiRequest } from '@shared/utils/api'
import { prisma } from '@db/prisma'

export interface iAuthRequest {
  email: string
  password: string
  user_type: 'BARBER' | 'CLIENT'
}

export interface iAuthResponse {
  token: string
}

const secretKey = process.env.JWT_SECRET

export const handler = async (req: RstNextApiRequest<iAuthRequest>, res: NextApiResponse<iAuthResponse>) => {
  if (req.method === 'POST') {
    const { email, password, user_type } = req.body
    try {
      if (user_type === 'BARBER') {
        const barber = await prisma.barbers.findUnique({ where: { email: email } })
        if (!barber) {
          throw new Error('Invalid credentials')
        }

        const passwordMatch = await bcrypt.compare(password, barber.password)

        if (!passwordMatch) {
          throw new Error('Invalid credentials')
        }

        const barberId = barber.id

        if (!secretKey) {
          throw new Error('Undefined secret key')
        }

        const token = jwt.sign({ user_id: barberId, user_type: user_type }, secretKey)

        const cookieSerialized = cookie.serialize('token', token, {
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
          maxAge: 3600
        })

        res.setHeader('Set-Cookie', cookieSerialized)

        return res.status(200).json({ token: token })
      } else if (user_type === 'CLIENT') {
        const client = await prisma.clients.findUnique({ where: { email: email } })

        if (!client) {
          throw new Error('Invalid credentials')
        }

        const passwordMatch = await bcrypt.compare(password, client.password)

        if (!passwordMatch) {
          throw new Error('Invalid credentials')
        }

        const clientId = client.id

        if (!secretKey) {
          throw new Error('Undefined secret key')
        }

        const token = jwt.sign({ user_id: clientId, user_type: user_type }, secretKey)

        const cookieSerialized = cookie.serialize('token', token, {
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
          maxAge: 3600
        })

        res.setHeader('Set-Cookie', cookieSerialized)

        return res.status(200).json({ token: token })
      }
    } catch (error) {
      console.log('Error verifying users login', error)
      throw new Error('Error verifying users login')
    } finally {
      await prisma.$disconnect()
    }
  } else {
    throw new Error('Method not allowed')
  }
}

export default handler
