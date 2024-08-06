import { useToast } from '@chakra-ui/react'
import Router from 'next/router'
import React, { useContext, createContext, useState, useEffect } from 'react'
import { destroyCookie, setCookie } from 'nookies'
import { COOKIES_NAMES } from '@shared/constants'
import {
  iAuthenticatesBarbersOwnersAndClientsPayload,
  useMutationAuthenticatesBarbersOwnersAndClients
} from '@shared/services'

export interface iAuthContext {
  auth: any
  setAuth(item: unknown): void
  isLoadingLogin: boolean
  handleLogin(user: iAuthenticatesBarbersOwnersAndClientsPayload): void
  handleLogout: () => void
}

export const Auth = createContext({} as iAuthContext)

export const useAuth = () => useContext(Auth)

const EXPIRE_TOKEN_IN_SECONDS = 60 * 60 * 24 * 7 // one week

const ROUTES_TO_PUSH = {
  BARBER: '/barber/dashboard',
  CLIENT: '/client/dashboard',
  OWNER: '/barbershop/dashboard'
}

export const AuthProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [auth, setAuth] = useState<any>({} as any)

  const toast = useToast()

  const { mutate: postAuth, isPending: isLoadingLogin } = useMutationAuthenticatesBarbersOwnersAndClients()

  const handleLogin = (user: iAuthenticatesBarbersOwnersAndClientsPayload) => {
    postAuth(
      { phoneNumber: user.phoneNumber, password: user.password },
      {
        onSuccess: ({ data }) => {
          console.log(data)
          setCookie(undefined, COOKIES_NAMES.USER_TOKEN, data.token, {
            maxAge: EXPIRE_TOKEN_IN_SECONDS,
            path: '/',
            secure: true
          })
          setCookie(undefined, COOKIES_NAMES.USER_ROLE, data.role, {
            maxAge: EXPIRE_TOKEN_IN_SECONDS,
            path: '/',
            secure: true
          })

          Router.push(ROUTES_TO_PUSH[data.role])

          setAuth(data)
        },
        onError: () => {
          toast({
            title: 'Erro ao fazer login',
            description: 'Usuário ou senha incorretos',
            status: 'error',
            duration: 9000,
            isClosable: true
          })
        }
      }
    )
    console.log('post')
  }

  const handleLogout = () => {
    destroyCookie(undefined, COOKIES_NAMES.USER_TOKEN, {
      path: '/'
    })

    setAuth({} as any)
    Router.push('/')
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token && !auth.token) {
      setAuth({ token })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Auth.Provider
      value={{
        auth,
        setAuth,
        isLoadingLogin,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </Auth.Provider>
  )
}
