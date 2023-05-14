import { NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { RstNextApiRequest } from '@shared/utils/api'
import { prisma } from '@db/prisma'

export interface iAuthRequest {
  email: string
  password: string
  userType: string
}

export interface iAuthResponse {
  token: string
}

const secretKey = process.env.JWT_SECRET

export const handler = async (req: RstNextApiRequest<iAuthRequest>, res: NextApiResponse<iAuthResponse>) => {
  if (req.method === 'POST') {
    const { email, password, userType } = req.body

    try {
      if (userType !== 'client') {
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

        const token = jwt.sign({ userId: barberId, userType: userType }, secretKey)

        const cookieSerialized = cookie.serialize('token', token, {
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
          maxAge: 3600
        })

        res.setHeader('Set-Cookie', cookieSerialized)

        return res.status(200).json({ token: token })
      }
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

      const token = jwt.sign({ userId: clientId, userType: userType }, secretKey)

      const cookieSerialized = cookie.serialize('token', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 3600
      })

      res.setHeader('Set-Cookie', cookieSerialized)

      return res.status(200).json({ token: token })
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
