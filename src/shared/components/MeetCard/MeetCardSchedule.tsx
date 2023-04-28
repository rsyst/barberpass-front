import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react'
import React, { useState, useMemo } from 'react'
import { iMeet } from 'shared/interface/public'
import { useMutationMeetsControllerUpdate } from 'shared/service/MeetsController'
import RstInput from '../Input'

interface iProps {
  isOpen: boolean
  onClose: () => void
  item: iMeet
}

interface iForm {
  phone_number: string
  name: string
}

const MeetCardSchedule = ({ isOpen, onClose, item }: iProps) => {
  const initialValues: iForm = useMemo(() => {
    return {
      phone_number: '',
      name: ''
    }
  }, [])

  const [formValues, setFormValues] = useState<iForm>(initialValues)

  const { mutate: editTime } = useMutationMeetsControllerUpdate({ meet_id: item.id })

  const toast = useToast()

  const handleChangeValue = (fname: keyof iForm, value: unknown) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      [fname]: value
    }))
  }

  const handleSubmit = () => {
    editTime(
      { phone_number: formValues.phone_number },
      {
        onSuccess: () => {
          toast({
            title: 'Horário alterado com sucesso',
            status: 'success'
          })
          onClose()
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m={2}>
        <ModalHeader>Agendar cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RstInput
            label="Numero de telefone"
            value={formValues.phone_number}
            onChange={({ target }) => handleChangeValue('phone_number', target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="whatsapp" onClick={handleSubmit}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default MeetCardSchedule
