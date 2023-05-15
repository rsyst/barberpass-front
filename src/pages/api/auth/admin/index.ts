import { NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { RstNextApiRequest } from '@shared/utils/api'
import { prisma } from '@db/prisma'

export interface iAuthAdminRequest {
  email: string
  password: string
}

export interface iAuthAdminResponse {
  token: string
}

const secretKey = process.env.JWT_SECRET

export const handler = async (req: RstNextApiRequest<iAuthAdminRequest>, res: NextApiResponse<iAuthAdminResponse>) => {
  if (req.method === 'POST') {
    const { email, password } = req.body

    try {
      const barberShop = await prisma.barber_shops.findUnique({ where: { email: email } })

      if (!barberShop) {
        throw new Error('Invalid credentials')
      }

      const passwordMatch = await bcrypt.compare(password, barberShop.password)

      if (!passwordMatch) {
        throw new Error('Invalid credentials')
      }

      const barberShopId = barberShop.id

      if (!secretKey) {
        throw new Error('Undefined secret key')
      }

      const token = jwt.sign({ user_id: barberShopId }, secretKey)

      const cookieSerialized = cookie.serialize('token', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 3600
      })

      res.setHeader('Set-Cookie', cookieSerialized)

      return res.status(200).json({ token: token })
    } catch (error) {
      console.log('Error verifying admin login', error)
      throw new Error('Error verifying admin login')
    } finally {
      await prisma.$disconnect()
    }
  } else {
    throw new Error('Method not allowed')
  }
}

export default handler
