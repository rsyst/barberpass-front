import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import RstInput from '@shared/components/Input'
import { useAuth } from '@shared/providers/auth'
import RstButton from '@shared/components/Button'
import RstText from '@shared/components/Text'
import { usePost } from '@shared/service/use-queries'
// import { useRouter } from 'next/router'

export interface iLogin {
  name: string
  phoneNumber: string
  email: string
  password: string
  document: string
  address: string
}

const BarbershopRegister = () => {
  const { mutate } = usePost('/barberShop')

  const initialValues: iLogin = useMemo(() => {
    return {
      name: '',
      phoneNumber: '',
      document: '',
      address: '',
      email: '',
      password: ''
    }
  }, [])

  const [formValues, setFormValues] = useState<iLogin>(initialValues)
  // const router = useRouter()

  const { handleLogin, isLoadingLogin } = useAuth()

  const handleChangeValue = (fname: keyof iLogin, value: unknown) => {
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
            <RstText fontVariant="h3" color="newYellow.1100">
              Cadastro de Barberaria
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
            placeholder="Celular"
            onChange={({ target }) => handleChangeValue('phoneNumber', target.value)}
            value={formValues.phoneNumber}
          />

          <RstInput
            placeholder="CNPJ"
            onChange={({ target }) => handleChangeValue('document', target.value)}
            value={formValues.document}
          />

          <RstInput
            placeholder="Endereço"
            onChange={({ target }) => handleChangeValue('address', target.value)}
            value={formValues.address}
          />

          <RstInput
            placeholder="E-mail"
            onChange={({ target }) => handleChangeValue('email', target.value)}
            value={formValues.email}
          />

          <RstInput
            placeholder="Senha"
            onChange={({ target }) => handleChangeValue('password', target.value)}
            type="password"
            value={formValues.password}
          />

          <RstButton
            size="md"
            type="submit"
            onClick={handleSubmit}
            isLoading={isLoadingLogin}
            colorScheme={`newYellow`}
          >
            Cadastrar
          </RstButton>

          <Box color="gray.600" w="100%" h="2px" bg="gray.600" />

          <RstText color="gray.1200" fontVariant="body1" textAlign="center">
            Já possui conta?
            <RstButton ml={2} variant="link" as="a" href="/barbershop/login" colorScheme={`newYellow`}>
              Entrar
            </RstButton>
          </RstText>
        </Grid>
      </Flex>
    </Box>
  )
}

export default BarbershopRegister
