import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'

export const withAuth = (WrappedComponent: ElementType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props: any) => {
    const router = useRouter()
    useEffect(() => {
      const token = localStorage.getItem('accessToken')

      if (!token) {
        router.push('/')
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router])

    return <WrappedComponent {...props} />
  }
  return Wrapper
}
