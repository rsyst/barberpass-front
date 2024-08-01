import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import RstInput from '@shared/components/Input'
import { useAuth } from '@shared/providers/auth'
import RstButton from '@shared/components/Button'
import RstText from '@shared/components/Text'
import { usePost } from '@shared/services/use-queries'
// import { useRouter } from 'next/router'

interface iRegister {
  name: string
  phoneNumber: string
  email: string
  password: string
}

export const AuthRegister = () => {
  const { mutate } = usePost('/client')

  const initialValues: iRegister = useMemo(() => {
    return {
      name: '',
      phoneNumber: '',
      email: '',
      password: ''
    }
  }, [])

  const [formValues, setFormValues] = useState<iRegister>(initialValues)
  // const router = useRouter()

  const { handleLogin, isLoadingLogin } = useAuth()

  const handleChangeValue = (fname: keyof iRegister, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  const handleSubmit = () => {
    mutate(formValues, {
      onSuccess: () => {
        handleLogin({
          phoneNumber: formValues.phoneNumber,
          password: formValues.password
        })
      }
    })
    // router.push('/dashboard')
  }

  return (
    <Box
      as="form"
      onSubmit={(e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault()
      }}
    >
      <Flex justifyContent="center" alignItems="center" minH="100vh" bg="gray.100">
        <Grid maxW={480} w="100%" gap={4} p={8} borderRadius={16} m={6}>
          <GridItem>
            <RstText fontVariant="h3" color="newBlue.1100">
              Cadastro de Usuário
            </RstText>
            <RstText fontVariant="body1" color="gray.1100">
              Por favor, preencha o formulário abaixo para criar sua conta
            </RstText>
          </GridItem>

          <RstInput
            placeholder="Nome"
            onChange={({ target }) => handleChangeValue('name', target.value)}
            value={formValues.name}
          />

          <RstInput
            placeholder="E-mail"
            onChange={({ target }) => handleChangeValue('email', target.value)}
            value={formValues.email}
          />

          <RstInput
            placeholder="CPF"
            onChange={({ target }) => handleChangeValue('phoneNumber', target.value)}
            value={formValues.phoneNumber}
          />

          <RstInput
            placeholder="Senha"
            onChange={({ target }) => handleChangeValue('password', target.value)}
            type="password"
            value={formValues.password}
          />

          <RstButton size="md" type="submit" onClick={handleSubmit} isLoading={isLoadingLogin}>
            Cadastrar
          </RstButton>

          <Box color="gray.600" w="100%" h="2px" bg="gray.600" />

          <RstText color="gray.1200" fontVariant="body1" textAlign="center">
            Já possui conta?
            <RstButton ml={2} variant="link" as="a" href="/auth/login">
              Entrar
            </RstButton>
          </RstText>
        </Grid>
      </Flex>
    </Box>
  )
}
