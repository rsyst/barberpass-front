import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import RstInput from '@shared/components/Input'
import { useAuth } from '@shared/providers/auth'
import RstButton from '@shared/components/Button'
import RstText from '@shared/components/Text'
import RstRadioButton from '@shared/components/RadioButton'

export interface iLogin {
  user: string
  password: string
}

const options = [
  { label: 'Cliente', value: 'CLIENT', id: 0 },
  { label: 'Profissional', value: 'BARBER', id: 1 }
]

const AuthLogin = () => {
  const initialValues: iLogin = useMemo(() => {
    return {
      user: '',
      password: ''
    }
  }, [])

  const [formValues, setFormValues] = useState<iLogin>(initialValues)

  const { handleLogin, isLoadingLogin } = useAuth()

  const handleChangeValue = (fname: keyof iLogin, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  const handleSubmit = () => {
    handleLogin(formValues)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <Flex justifyContent="center" alignItems="center" minH="100vh" bg="gray.100">
        <Grid maxW={480} w="100%" gap={6} p={8} borderRadius={16} m={6}>
          <GridItem>
            <RstText fontVariant="h3" color="blue.1100">
              Bem vindo
            </RstText>
            <RstText fontVariant="body1" color="gray.1100">
              Estamos felizes em ver vôce aqui. para acessar sua conta, primeiro realize o login.
            </RstText>
          </GridItem>

          <RstRadioButton options={options} />

          <RstInput
            placeholder="Usuário"
            onChange={({ target }) => handleChangeValue('user', target.value)}
            value={formValues.user}
          />

          <GridItem display="flex" flexDir="column" alignItems="end">
            <RstInput
              placeholder="Senha"
              onChange={({ target }) => handleChangeValue('password', target.value)}
              type="password"
              value={formValues.password}
            />
            <RstButton variant="link" textAlign="end" color="gray.900">
              esqueci minha senha
            </RstButton>
          </GridItem>

          <RstButton size="md" type="submit" onClick={handleSubmit} isLoading={isLoadingLogin}>
            Login
          </RstButton>

          <Box color="gray.600" w="100%" h="2px" bg="gray.600" />

          <RstText color="gray.1200" fontVariant="body1" textAlign="center">
            Não possui conta?
            <RstButton ml={2} variant="link">
              Cadastre-se
            </RstButton>
          </RstText>
        </Grid>
      </Flex>
    </form>
  )
}

export default AuthLogin
