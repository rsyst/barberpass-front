import React, { useMemo, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Flex,
  Text
} from '@chakra-ui/react'
import RstButton from '../Button'
import RstInput from '../Input'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iBarber } from '@shared/interface/public'
import { useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { usePost, usePut } from '@shared/service/use-queries'
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
}

const RstFormBarber = ({ isOpen, onClose, barber }: iProps) => {
  const initialValues: iFormBarber = useMemo(
    () => ({
      name: barber?.name || '',
      phoneNumber: barber?.phoneNumber || '',
      startWork: moment(barber?.startWork).format('HH:mm') || '',
      endWork: moment(barber?.endWork).format('HH:mm') || '',
      timePerWork: barber?.timePerWork || 0,
      email: barber?.email || ''
    }),
    [barber]
  )

  const queryClient = useQueryClient()
  const toast = useToast()
  const [formValues, setFormValues] = useState(initialValues)

  const { mutate: createService, isLoading: loadingCreate } = usePost(ENDPOINTS.POST_BARBER_SERVICE)
  const { mutate: editService, isLoading: loadingEdit } = usePut(ENDPOINTS.PUT_BARBER_SERVICES_BY_ID(barber?.id || ''))
  const isLoading = loadingCreate || loadingEdit
  const havePrevService = !!barber

  const handleChangeValue = (fname: keyof iFormBarber, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  const handleCreateService = () => {
    createService(formValues, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_SERVICES)
        toast({
          title: 'Serviço criado com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        handleClose()
      }
    })
  }

  const handleEditService = () => {
    editService(formValues, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_SERVICES)
        toast({
          title: 'Serviço editado com sucesso',
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
        <ModalHeader>Cadastrar serviço</ModalHeader>
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

          <Flex py={6} alignItems="center">
            <Text fontWeight="600" fontSize={18}>
              Dados de agenda
            </Text>
          </Flex>

          <RstInput
            label="Abertura de agenda*"
            placeholder="ex: Corte de cabelo"
            isDisabled
            value={formValues.startWork}
            onChange={({ target }) => handleChangeValue('startWork', target.value)}
            type="time"
          />
          <RstInput
            label="Encerramento da agenda*"
            placeholder="ex: R$ 25:00"
            isDisabled
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
          {havePrevService ? (
            <RstButton onClick={handleEditService} isLoading={isLoading} minW={120}>
              Editar
            </RstButton>
          ) : (
            <RstButton onClick={handleCreateService} isLoading={isLoading} minW={120} type="submit">
              Cadastrar
            </RstButton>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RstFormBarber
