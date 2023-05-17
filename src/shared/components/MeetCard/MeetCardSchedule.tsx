import {
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
import { useMutationMeetsControllerUpdate } from '@shared/service/MeetsController'
import RstInput from '../Input'
import { iRstMeetCard } from './MeetCard'
import RstButton from '../Button'

interface iProps {
  isOpen: boolean
  onClose: () => void
  item: iRstMeetCard
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
        <ModalHeader color="gray.1200">Agendar cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RstInput
            label="Numero de telefone"
            value={formValues.phone_number}
            onChange={({ target }) => handleChangeValue('phone_number', target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <RstButton variant="ghost" colorScheme="gray" mr={3} onClick={onClose}>
            Fechar
          </RstButton>
          <RstButton onClick={handleSubmit}>Confirmar</RstButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default MeetCardSchedule
