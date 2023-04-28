import { Button, Divider, Flex, Grid, GridItem, Text, useToast } from '@chakra-ui/react'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import RstInput from 'shared/components/Input'
import RstNavBar from 'shared/components/NavBar'
import { useUserContext } from 'shared/providers/user'
import { useMutationEmployesControllerUpdate, useQueryEmployesControllerShow } from 'shared/service/EmployesController'

interface iForm {
  name: string
  email: string
  start_time: string
  end_time: string
  time_per_work: string
}

export const ConfigUser = () => {
  const { user } = useUserContext()

  console.log(user)

  const { data } = useQueryEmployesControllerShow({ employe_id: user?.id })

  console.log(data)

  const initialValues: iForm = useMemo(() => {
    return {
      name: user?.name,
      email: user?.email,
      start_time: moment(user?.start_time).format('HH:mm'),
      end_time: moment(user?.end_time).format('HH:mm'),
      time_per_work: user?.time_per_work
    }
  }, [user])

  const { mutate: editTime } = useMutationEmployesControllerUpdate({ employe_id: user?.id })

  const [formValues, setFormValues] = useState<iForm>(initialValues)
  const toast = useToast()

  const handleChangeValue = (fname: keyof iForm, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  console.log(moment(formValues.start_time, 'HH:mm').format())

  const handleSubmit = () => {
    editTime(
      {
        name: formValues.name,
        email: formValues.email,
        start_time: moment(formValues.start_time, 'HH:mm').format(),
        end_time: moment(formValues.end_time, 'HH:mm').format(),
        time_per_work: formValues.time_per_work
      },
      {
        onSuccess: () => {
          toast({
            title: 'Horário alterado com sucesso',
            status: 'success'
          })
        },
        onError: () => {
          toast({
            title: 'Erro ao editar horário',
            description: 'Ocorreu um erro ao editar este horário',
            status: 'error'
          })
        }
      }
    )
  }

  return (
    <Flex flexDir={{ base: 'column', md: 'row' }}>
      <RstNavBar />
      <Flex p={1} m={3} bg="white" borderRadius={16} flexDir="column">
        <Text p={5} fontWeight="bold" color="gray.700" fontSize="lg">
          Configurações do usuário
        </Text>
        <Grid gap={4} p={3}>
          <RstInput
            label="Nome"
            value={formValues.name}
            onChange={({ target }) => handleChangeValue('name', target.value)}
          />

          <RstInput
            label="E-mail"
            value={formValues.email}
            onChange={({ target }) => handleChangeValue('email', target.value)}
          />

          <RstInput
            label="Horário de início"
            type="time"
            value={formValues.start_time}
            onChange={({ target }) => handleChangeValue('start_time', target.value)}
          />
          <RstInput
            label="Horário de fechamento"
            type="time"
            value={formValues.end_time}
            onChange={({ target }) => handleChangeValue('end_time', target.value)}
          />
          <RstInput
            label="Tempo por serviço"
            value={formValues.time_per_work}
            onChange={({ target }) => handleChangeValue('time_per_work', target.value)}
            type="number"
            helperText="digite o valor em minutos ex: 45"
            errorMessage="digite o valor em minutos ex: 45"
          />
          <Divider mt={4} />
          <GridItem display="flex" justifyContent="flex-end">
            <Button colorScheme="whatsapp" onClick={handleSubmit}>
              Salvar
            </Button>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  )
}
