import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { RstInput } from '@shared/components'
import { COOKIES_NAMES } from '@shared/constants'
import { useAuth } from '@shared/providers'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useEffect, useMemo, useState } from 'react'

interface iForm {
  phoneNumber: string
  password: string
}

export const AuthLogin = () => {
  const initialValues: iForm = useMemo(() => {
    return {
      phoneNumber: '',
      password: ''
    }
  }, [])

  const [formValues, setFormValues] = useState<iForm>(initialValues)

  const { handleLogin, isLoadingLogin } = useAuth()
  const router = useRouter()

  const handleChangeValue = (fname: keyof iForm, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  const handleSubmit = () => {
    handleLogin(formValues)
  }

  //Redirect to Dashboard if is logged
  useEffect(() => {
    const { [COOKIES_NAMES.CLIENT_TOKEN]: clientToken, [COOKIES_NAMES.BARBER_TOKEN]: barberToken } = parseCookies()

    if (barberToken) {
      router.push('/barber/dashboard')
    }
    if (clientToken) {
      router.push('/client/dashboard')
    }
  }, [router])

  return (
    <Box
      as="form"
      onSubmit={(e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault()
      }}
    >
      <Flex justifyContent="center" alignItems="center" minH="100dvh" bg="white">
        <Grid
          maxW={480}
          w="100%"
          gap={6}
          p={8}
          borderRadius={16}
          m={6}
          bg="gray.50"
          border="2px solid"
          borderColor="gray.200"
        >
          <GridItem>
            <Text fontSize="2xl" fontWeight="bold" color={`newBlue.1100`}>
              Bem-vindo
            </Text>
            <Text fontSize="md" color="gray.1100">
              Estamos felizes em ver você aqui. para acessar sua conta, primeiro realize o login.
            </Text>
          </GridItem>

          <RstInput
            placeholder="E-mail"
            onChange={({ target }) => handleChangeValue('phoneNumber', target.value)}
            value={formValues.phoneNumber}
          />

          <GridItem display="flex" flexDir="column" alignItems="end">
            <RstInput
              placeholder="Senha"
              onChange={({ target }) => handleChangeValue('password', target.value)}
              type="password"
              value={formValues.password}
            />
            <Button variant="link" textAlign="end">
              esqueci minha senha
            </Button>
          </GridItem>

          <Button size="md" type="submit" onClick={handleSubmit} isLoading={isLoadingLogin} colorScheme={`blue`}>
            Login
          </Button>

          <Box color="gray.600" w="100%" h="2px" bg="gray.600" />

          <Text color="gray.1200" fontSize="md" textAlign="center">
            Não possui conta?
            <Button ml={2} variant="link" as={Link} href="/auth/register">
              Cadastre-se
            </Button>
          </Text>
        </Grid>
      </Flex>
    </Box>
  )
}
