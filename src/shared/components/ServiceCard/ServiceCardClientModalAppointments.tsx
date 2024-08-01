import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { iAppointment, iBarber, iService } from '@shared/interfaces/public'
import { useFetch } from '@shared/services/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import moment from 'moment'
import RstInput from '../Input'
import { RstMeetCardClient } from '../MeetCard'

interface iProps {
  isOpen: boolean
  onClose: () => void
  barber: iBarber
  service: iService
}

export const RstServiceCardClientModalAppointments = ({ isOpen, onClose, barber, service }: iProps) => {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD') as string)

  const { data: appointments, isLoading: loadingAppointments } = useFetch<iAppointment[]>(
    QUERY_KEYS.GET_CLIENT_BARBERS_BY_BARBERID_SERVICES_BY_SERVICEID_APPOINTMENTS_BY_DATE(barber.id, service.id, date),
    ENDPOINTS.GET_CLIENT_BARBERS_BY_BARBERID_SERVICES_BY_SERVICEID_APPOINTMENTS_BY_DATE(barber.id, service.id, date)
  )

  if (loadingAppointments) return <></>

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={4} h="90vh">
          <ModalHeader>Horários disponíveis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex p={2} alignItems="center">
              <RstInput type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Flex>
            <Flex flexDir="column" overflowY="auto" h="calc(100vh - 260px)">
              {appointments?.map((appointment, index) => (
                <RstMeetCardClient key={index} {...appointment} service={service} />
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RstServiceCardClientModalAppointments
