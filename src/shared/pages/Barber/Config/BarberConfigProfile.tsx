import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import RstButton from '@shared/components/Button'
import { RstHeaderBarber } from '@shared/components/Header'
import RstInput from '@shared/components/Input'
import RstInputPhone from '@shared/components/Input/InputPhone'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iBarber } from '@shared/interface/public'
import { useFetch, usePut } from '@shared/service/use-queries'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'

interface iFormService {
  name: string
  phoneNumber: string
  startWork: string
  endWork: string
  timePerWork: number
  email: string
}

const BarberConfigProfile = () => {
  const { data, isLoading } = useFetch<iBarber>(QUERY_KEYS.GET_BARBER, ENDPOINTS.GET_BARBER)
  const { mutate: editProfile, isLoading: loadingProfile } = usePut(ENDPOINTS.PUT_BARBER)

  const [formValues, setFormValues] = useState({} as iFormService)

  const handleChangeValue = (fname: keyof iFormService, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  const handleSubmit = () => {
    const payload = {
      name: formValues.name,
      phoneNumber: formValues.phoneNumber,
      startWork: moment(formValues.startWork, 'HH:mm').toDate(),
      endWork: moment(formValues.endWork, 'HH:mm').toDate(),
      timePerWork: formValues.timePerWork,
      email: formValues.email
    }
    editProfile(payload)
    console.log(formValues)
  }

  useEffect(() => {
    if (data) {
      setFormValues({
        name: data?.name || '',
        phoneNumber: data?.phoneNumber || '',
        startWork: moment(data?.startWork).format('HH:mm') || '',
        endWork: moment(data?.endWork).format('HH:mm') || '',
        timePerWork: data?.timePerWork || 0,
        email: data?.email || ''
      })
    }
  }, [data])

  if (isLoading) return <div>Carregando...</div>

  return (
    <>
      <RstHeaderBarber />
      <Flex flexDir="column" px={5} gap={4} mb={12}>
        <Text fontWeight={600} fontSize={18}>
          Editar Usuario
        </Text>
        <Grid gap={2} bg="gray.100" p={6} borderRadius={24}>
          <GridItem>
            <Flex p={4} alignItems="center">
              <Text fontWeight="600" fontSize={18}>
                Dados pessoais
              </Text>
            </Flex>
          </GridItem>

          <RstInput
            label="Nome*"
            placeholder="ex: Carlos"
            value={formValues.name}
            onChange={({ target }) => handleChangeValue('name', target.value)}
          />
          <RstInputPhone
            label="Celular*"
            placeholder="ex: (XX) XXXXX-XXXX"
            value={formValues.phoneNumber}
            onChange={({ target }) => handleChangeValue('phoneNumber', target.value)}
          />
          <RstInput
            label="E-mail*"
            placeholder="ex: joao@email.com"
            value={formValues.email}
            onChange={({ target }) => handleChangeValue('email', target.value)}
          />

          <GridItem mt={6}>
            <Flex p={6} alignItems="center">
              <Text fontWeight="600" fontSize={18}>
                Dados de agenda
              </Text>
            </Flex>
          </GridItem>

          <RstInput
            label="Abertura de agenda*"
            placeholder="ex: Corte de cabelo"
            value={formValues.startWork}
            onChange={({ target }) => handleChangeValue('startWork', target.value)}
            type="time"
          />
          <RstInput
            label="Encerramento da agenda*"
            placeholder="ex: R$ 25:00"
            value={formValues.endWork}
            onChange={({ target }) => handleChangeValue('endWork', target.value)}
            type="time"
          />
          <RstInput
            label="Tempo por serviço* (minutos)"
            placeholder="ex: 45"
            type="number"
            value={formValues.timePerWork}
            onChange={({ target }) => handleChangeValue('timePerWork', target.value)}
          />

          <GridItem mt={2}>
            <RstButton w="full" leftIcon={<FiEdit2 />} isLoading={loadingProfile} onClick={handleSubmit}>
              Editar perfil
            </RstButton>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}

export default BarberConfigProfile
