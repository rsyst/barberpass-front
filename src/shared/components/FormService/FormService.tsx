import React, { useMemo, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast
} from '@chakra-ui/react'
import { RstButton } from '../Button'
import { RstInput } from '../Input'
import { usePost, usePut } from '@shared/services/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iService } from '@shared/interfaces/public'
import { useQueryClient } from '@tanstack/react-query'
import { RstInputCurrency } from '../Input/InputCurrency'
import { currencyToNumber, floatToCurrency, removeCurrencyMask } from '@shared/utils/currencyMask'

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
    () => ({
      name: service?.name || '',
      price: service?.price ? floatToCurrency(service.price) : '',
      workAmount: service?.workAmount || ''
    }),
    [service]
  )

  const queryClient = useQueryClient()
  const toast = useToast()
  const [formValues, setFormValues] = useState(initialValues)

  const { mutate: createService, isLoading: loadingCreate } = usePost(ENDPOINTS.POST_BARBER_SERVICE)
  const { mutate: editService, isLoading: loadingEdit } = usePut(ENDPOINTS.PUT_BARBER_SERVICES_BY_ID(service?.id || ''))
  const isLoading = loadingCreate || loadingEdit
  const havePrevService = !!service

  const handleChangeValue = (fname: keyof iFormService, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  const handleCreateService = () => {
    createService(
      {
        name: formValues.name,
        price: currencyToNumber(formValues.price as string),
        workAmount: parseInt(formValues.workAmount as string)
      },
      {
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
      }
    )
  }

  const handleEditService = () => {
    const priceToFloat = parseInt(removeCurrencyMask(String(formValues.price))) / 100
    editService(
      {
        name: formValues.name,
        price: priceToFloat,
        workAmount: parseInt(formValues.workAmount as string)
      },
      {
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
      }
    )
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
          <RstInput
            label="Nome *"
            placeholder="ex: Corte de cabelo"
            value={formValues.name}
            onChange={({ target }) => handleChangeValue('name', target.value)}
          />
          <RstInputCurrency
            label="Preço *"
            placeholder="ex: R$ 25,00"
            value={formValues.price}
            onChange={({ target }) => handleChangeValue('price', target.value)}
          />
          <RstInput
            label="Quantidade de horário(s) *"
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

export default RstFormService
