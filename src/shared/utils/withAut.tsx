// import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'
import { useAuth } from '@shared/providers/auth'

export const withAuth = (WrappedComponent: ElementType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props: any) => {
    // const router = useRouter()
    const { auth } = useAuth()
    useEffect(() => {
      const token = auth.token
      console.log({ token })
      if (!token) {
        // router.push('/')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <WrappedComponent {...props} />
  }
  return Wrapper
}
