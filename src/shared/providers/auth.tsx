import { useToast } from '@chakra-ui/react'
import Router from 'next/router'
import React, { useContext, createContext, useState, useEffect } from 'react'
import { iLogin } from 'shared/pages/Auth/Login/AuthLogin'
import { iAuthControllerCreateResponse, useMutationAuthControllerCreate } from 'shared/service/AuthController'

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
  auth: iAuthControllerCreateResponse
  setAuth(item: unknown): void
  isLoadingLogin: boolean
  handleLogin(user: iLogin): void
  handleLogout: () => void
}

export const Auth = createContext({} as iAuthContext)

export const useAuth = () => useContext(Auth)

export const AuthProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [auth, setAuth] = useState<iAuthControllerCreateResponse>({} as iAuthControllerCreateResponse)

  const toast = useToast()

  const { mutate: postAuth, isLoading: isLoadingLogin } = useMutationAuthControllerCreate()

  const handleLogin = (user: iLogin) => {
    postAuth(
      { email: user.user, password: user.password },
      {
        onSuccess: (data) => {
          localStorage.setItem('accessToken', data.token)
          setAuth(data)
          Router.push('/dashboard')
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
    localStorage.removeItem('accessToken')
    setAuth({} as iAuthControllerCreateResponse)
    Router.push('/auth/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !auth.token) {
      setAuth({ token, company: {} as iCompany })
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
