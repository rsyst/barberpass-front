import { useToast } from '@chakra-ui/react'
import Router from 'next/router'
import React, { useContext, createContext, useState, useEffect } from 'react'
import { iLogin } from '@shared/pages/Auth/Login/AuthLogin'
import { useMutationAuthPost } from '@shared/service/Auth'
import { iAuthResponse } from '@pages/api/auth'

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
  auth: iAuthResponse
  setAuth(item: unknown): void
  isLoadingLogin: boolean
  handleLogin(user: iLogin): void
  handleLogout: () => void
}

export const Auth = createContext({} as iAuthContext)

export const useAuth = () => useContext(Auth)

export const AuthProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [auth, setAuth] = useState<iAuthResponse>({} as iAuthResponse)

  const toast = useToast()

  const { mutate: postAuth, isLoading: isLoadingLogin } = useMutationAuthPost()

  const handleLogin = (user: iLogin) => {
    postAuth(
      { email: user.user, password: user.password, user_type: user.userType.value },
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
    setAuth({} as iAuthResponse)
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
