import { Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import RstInput from 'shared/components/Input'
import { useAuth } from 'shared/providers/auth'

export interface iLogin {
  user: string
  password: string
}

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
        <Grid maxW={480} w="100%" gap={4} p={8} bg="white" borderRadius={16} boxShadow="sm" m={6}>
          {/* <GridItem>
          <Text fontSize="xxx-large">Logo</Text>
        </GridItem> */}

          <GridItem>
            <Text fontSize="lg">Faça seu login</Text>
          </GridItem>

          <GridItem>
            <RstInput
              placeholder="Usuário"
              onChange={({ target }) => handleChangeValue('user', target.value)}
              value={formValues.user}
            />
          </GridItem>

          <GridItem>
            <RstInput
              placeholder="Senha"
              onChange={({ target }) => handleChangeValue('password', target.value)}
              type="password"
              value={formValues.password}
            />
          </GridItem>

          <GridItem display="flex" justifyContent="space-between">
            <Button colorScheme="gray" disabled={isLoadingLogin}>
              Register
            </Button>
            <Button colorScheme="whatsapp" type="submit" onClick={handleSubmit} isLoading={isLoadingLogin}>
              Login
            </Button>
          </GridItem>
        </Grid>
      </Flex>
    </form>
  )
}

export default AuthLogin
