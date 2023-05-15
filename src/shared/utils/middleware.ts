import { NextApiRequest, NextApiResponse } from 'next'
// import jwt, { JwtPayload } from 'jsonwebtoken'

// const secretKey = process.env.JWT_SECRET

export const middleware =
  (
    methodsProtecteds: Array<'GET' | 'POST' | 'PUT' | 'DELETE' | string | undefined>,
    handler: (req: NextApiRequest, res: NextApiResponse) => void
  ) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    // const { cookies } = req

    // if (cookies && cookies.token) {
    //   const token = cookies.token

    //   if (!secretKey) {
    //     throw new Error('Undefined secret key')
    //   }
    //   try {
    //     const { user_id } = jwt.verify(token, secretKey) as JwtPayload

    //     req.user_id = user_id
    //   } catch (error) {
    //     console.log('Error', error)
    //   }
    // } else {
    //   throw new Error('Without cookies')
    // }
    // if (methodsProtecteds.includes(req.method) && !req.user_id) {
    //   throw new Error('Method not allowed')
    // }

    return handler(req, res)
  }
