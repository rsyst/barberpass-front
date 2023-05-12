import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

interface iUserAuth {
  email: string
  password: string
  userType: string
}
const secretKey = process.env.JWT_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password, userType } = req.body as iUserAuth

  try {
    if (userType !== 'client') {
      const barber = await prisma.barbers.findUnique({ where: { email: email } })

      if (!barber) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      const passwordMatch = await bcrypt.compare(password, barber.password)

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' })
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
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const passwordMatch = await bcrypt.compare(password, client.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
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
    return res.status(500).json({ message: 'Error verifying users login' })
  } finally {
    await prisma.$disconnect()
  }
}
