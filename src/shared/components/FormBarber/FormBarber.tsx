import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast
} from '@chakra-ui/react'

import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iBarber } from '@shared/interfaces/public'
import { usePost } from '@shared/services/use-queries'
import { useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import RstButton from '../Button'
import RstInput from '../Input'
import RstInputPhone from '../Input/InputPhone'

interface iProps {
  barber?: iBarber
  isOpen: boolean
  onClose: () => void
}

interface iFormBarber {
  name: string
  phoneNumber: string
  startWork: string
  endWork: string
  timePerWork: number
  email: string
  password: string
}

const RstFormBarber = ({ isOpen, onClose, barber }: iProps) => {
  const initialValues: iFormBarber = useMemo(
    () => ({
      name: barber?.name || '',
      phoneNumber: barber?.phoneNumber || '',
      startWork: moment(barber?.startWork).format('HH:mm') || '',
      endWork: moment(barber?.endWork).format('HH:mm') || '',
      timePerWork: barber?.timePerWork || 30,
      email: barber?.email || '',
      password: barber?.password || ''
    }),
    [barber]
  )

  const queryClient = useQueryClient()
  const toast = useToast()
  const [formValues, setFormValues] = useState(initialValues)

  const { mutate: createBarber, isLoading: loadingCreate } = usePost(ENDPOINTS.POST_BARBER_SHOP_BARBERS)
  const isLoading = loadingCreate

  const handleChangeValue = (fname: keyof iFormBarber, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  const handleCreateBarber = () => {
    const payload = {
      ...formValues,
      startWork: moment(formValues.startWork, 'HH:mm').format(),
      endWork: moment(formValues.endWork, 'HH:mm').format()
    }
    createBarber(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_SERVICES)
        toast({
          title: 'Barbeiro criado com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        handleClose()
      }
    })
  }

  const handleClose = () => {
    setFormValues(initialValues)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent
        mx={4}
        as="form"
        onSubmit={(e: React.FormEvent<HTMLDivElement>) => {
          e.preventDefault()
        }}
      >
        <ModalHeader>Cadastrar Barbeiro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex py={4} alignItems="center">
            <Text fontWeight="600" fontSize={18}>
              Dados pessoais
            </Text>
          </Flex>

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
          <RstInput
            label="Senha*"
            placeholder="Senha"
            onChange={({ target }) => handleChangeValue('password', target.value)}
            type="password"
            value={formValues.password}
          />

          <Flex py={6} alignItems="center">
            <Text fontWeight="600" fontSize={18}>
              Dados de agenda
            </Text>
          </Flex>

          <RstInput
            label="Abertura de agenda*"
            placeholder="ex: 08:00"
            value={formValues.startWork}
            onChange={({ target }) => handleChangeValue('startWork', target.value)}
            type="time"
          />
          <RstInput
            label="Encerramento da agenda*"
            placeholder="ex: 20:00"
            value={formValues.endWork}
            onChange={({ target }) => handleChangeValue('endWork', target.value)}
            type="time"
          />
          <RstInput
            label="Tempo por serviço* (minutos)"
            placeholder="ex: 45"
            type="number"
            isDisabled
            value={formValues.timePerWork}
            onChange={({ target }) => handleChangeValue('timePerWork', target.value)}
          />
        </ModalBody>

        <ModalFooter p={6} justifyContent="space-between">
          <RstButton variant="ghost" colorScheme="gray" isLoading={isLoading}>
            Cancelar
          </RstButton>
          <RstButton onClick={handleCreateBarber} isLoading={isLoading} minW={120} type="submit">
            Cadastrar
          </RstButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RstFormBarber
