import { useToast } from '@chakra-ui/react'
import Router from 'next/router'
import React, { useContext, createContext, useState, useEffect } from 'react'
import { iLogin } from '@shared/pages/Auth/Login/AuthLogin'
import { usePost } from '@shared/service/use-queries'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { destroyCookie, setCookie } from 'nookies'
import { COOKIES_NAMES } from '@shared/constants/cookie-names'

export interface iCompany {
  created_at: string
  document: string
  email: string
  id: string
  nome: string
  nome_empresa: string
  password: string
  updated_at: string
}

export interface iAuthContext {
  auth: any
  setAuth(item: unknown): void
  isLoadingLogin: boolean
  handleLogin(user: iLogin): void
  handleLogout: () => void
}

export const Auth = createContext({} as iAuthContext)

export const useAuth = () => useContext(Auth)

const EXPIRE_TOKEN_IN_SECONDS = 60 * 60 * 24 * 7 // one week
export const AuthProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [auth, setAuth] = useState<any>({} as any)

  const toast = useToast()

  const { mutate: postAuth, isLoading: isLoadingLogin } = usePost(ENDPOINTS.POST_AUTH)

  const handleLogin = (user: iLogin) => {
    postAuth(
      { email: user.email, password: user.password, role: user.role.value },
      {
        onSuccess: ({ data }) => {
          if (user.role.value === 'CLIENT') {
            setCookie(undefined, COOKIES_NAMES.CLIENT_TOKEN, data.token, {
              maxAge: EXPIRE_TOKEN_IN_SECONDS,
              path: '/',
              secure: true
            })
            Router.push('/client/dashboard')
          }

          if (user.role.value === 'BARBER') {
            setCookie(undefined, COOKIES_NAMES.BARBER_TOKEN, data.token, {
              maxAge: EXPIRE_TOKEN_IN_SECONDS,
              path: '/',
              secure: true
            })
            Router.push('/barber/dashboard')
          }

          if (user.role.value === 'BARBERSHOP') {
            setCookie(undefined, COOKIES_NAMES.BARBER_SHOP_TOKEN, data.token, {
              maxAge: EXPIRE_TOKEN_IN_SECONDS,
              path: '/',
              secure: true
            })
            Router.push('/barbershop/dashboard')
          }

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
  }

  const handleLogout = () => {
    destroyCookie(undefined, COOKIES_NAMES.CLIENT_TOKEN, {
      path: '/'
    })
    destroyCookie(undefined, COOKIES_NAMES.BARBER_TOKEN, {
      path: '/'
    })
    destroyCookie(undefined, COOKIES_NAMES.BARBER_SHOP_TOKEN, {
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
