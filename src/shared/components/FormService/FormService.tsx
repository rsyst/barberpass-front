import React, { useMemo, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import RstButton from '../Button'
import RstInput from '../Input'
import { usePost, usePut } from '@shared/service/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iService } from '@shared/interface/public'
import { useQueryClient } from '@tanstack/react-query'

interface iProps {
  service?: iService
  isOpen: boolean
  onClose: () => void
}

interface iFormService {
  name: string
  price: number | string
  workAmount: number | string
}

const RstFormService = ({ isOpen, onClose, service }: iProps) => {
  const initialValues: iFormService = useMemo(
    () => ({ name: service?.name || '', price: service?.price || '', workAmount: service?.workAmount || '' }),
    [service]
  )

  const queryClient = useQueryClient()
  const [formValues, setFormValues] = useState(initialValues)

  const { mutate: createService, isLoading: loadingCreate } = usePost(ENDPOINTS.POST_BARBER_SERVICE)
  const { mutate: editService, isLoading: loadingEdit } = usePut(ENDPOINTS.PUT_BARBER_SERVICE_BY_ID(service?.id || ''))
  const isLoading = loadingCreate || loadingEdit

  const handleChangeValue = (fname: keyof iFormService, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  const handleSubmit = () => {
    const havePrevService = !!service

    if (havePrevService) {
      editService(
        {
          name: formValues.name,
          price: parseFloat(formValues.price as string),
          workAmount: parseInt(formValues.workAmount as string)
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_SERVICES)
            handleClose()
          }
        }
      )
    } else {
      createService(
        {
          name: formValues.name,
          price: parseFloat(formValues.price as string),
          workAmount: parseInt(formValues.workAmount as string)
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_SERVICES)
            handleClose()
          }
        }
      )
    }
  }

  const handleClose = () => {
    setFormValues(initialValues)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent m={4}>
        <ModalHeader>Cadastrar serviço</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RstInput
            label="Nome *"
            placeholder="ex: Corte de cabelo"
            value={formValues.name}
            onChange={({ target }) => handleChangeValue('name', target.value)}
          />
          <RstInput
            label="Preço *"
            placeholder="ex: R$ 25:00"
            value={formValues.price}
            onChange={({ target }) => handleChangeValue('price', target.value)}
          />
          <RstInput
            label="Quantidade de horario(s) *"
            placeholder="ex: 2"
            type="number"
            value={formValues.workAmount}
            onChange={({ target }) => handleChangeValue('workAmount', target.value)}
          />
        </ModalBody>

        <ModalFooter p={6} justifyContent="space-between">
          <RstButton variant="ghost" colorScheme="gray" isLoading={isLoading}>
            Cancelar
          </RstButton>
          <RstButton colorScheme="blue" onClick={handleSubmit} isLoading={isLoading}>
            Cadastrar
          </RstButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RstFormService
