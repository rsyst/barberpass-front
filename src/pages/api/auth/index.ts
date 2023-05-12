import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

interface iBarberShop {
  email: string
  password: string
  userType: string
}
const secretKey = process.env.JWT_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password, userType } = req.body as iBarberShop

  try {
    const barberShop = await prisma.barber_shops.findUnique({ where: { email: email } })

    if (!barberShop) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const passwordMatch = await bcrypt.compare(password, barberShop.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const barberShopId = barberShop.id

    if (!secretKey) {
      throw new Error('Undefined secret key')
    }

    const token = jwt.sign({ barberShopId: barberShopId, userType: userType }, secretKey)

    const cookieSerialized = cookie.serialize('token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 3600
    })

    res.setHeader('Set-Cookie', cookieSerialized)

    return res.status(200).json({ token: token })
  } catch (error) {
    console.log('Error verifying barberShops login', error)
    return res.status(500).json({ message: 'Error verifying barberShops login' })
  } finally {
    await prisma.$disconnect()
  }
}
