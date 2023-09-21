import { Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react'
import RstAccordion from '@shared/components/Accordion'
import { RstHeaderClient } from '@shared/components/Header'
import { RstMeetCardClient } from '@shared/components/MeetCard'
import { iRstMeetCardClient } from '@shared/components/MeetCard/MeetCardClient'
import RstText from '@shared/components/Text'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { QUERY_KEYS } from '@shared/constants/query-keys'
import { iBarber } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'

import React from 'react'
import { FiFrown } from 'react-icons/fi'

const ClientDashboard = () => {
  const { data, isLoading } = useFetch<iBarber>(QUERY_KEYS.GET_CLIENT, ENDPOINTS.GET_CLIENT)

  if (isLoading) return <div>loading...</div>

  return (
    <>
      <RstHeaderClient />
      <Flex flexDir="column" px={5} gap={4}>
        <Flex>
          <RstText color="gray.1200" fontVariant="h5">
            Bom dia,
          </RstText>
          <RstText color="gray.1100" fontVariant="h5" ml={1} textTransform="capitalize">
            {data?.name}
          </RstText>
        </Flex>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <Flex flexDir="column" gap={2} bg="white" display="flex" borderRadius={16}>
              <Flex px={6} pt={6}>
                <Text fontWeight="600">Agendamentos</Text>
              </Flex>

              <Flex flexDir="column" overflowY="auto" p={2} h="30vh">
                {Appointments.length <= 0 ? (
                  <Flex flexDir="column" justifyContent="center" alignItems="center" gap={2} h="full" color="gray.1000">
                    <Icon as={FiFrown} fontSize="5xl" />
                    <Text w={60} textAlign="center">
                      Nenhum agendamento encontrado
                    </Text>
                  </Flex>
                ) : (
                  Appointments.map((appointment, index) => <RstMeetCardClient key={index} {...appointment} />)
                )}
              </Flex>
            </Flex>
          </GridItem>

          <GridItem colSpan={2}>
            <RstAccordion title="Barbearias">
              <Flex flexDir="column" overflowY="auto" h="30vh">
                {Appointments.map((appointment, index) => (
                  <RstMeetCardClient key={index} {...appointment} />
                ))}
              </Flex>
            </RstAccordion>
          </GridItem>

          <GridItem colSpan={1}>
            <Flex p={6} bg="white" display="flex" justifyContent="space-between" alignItems="center" borderRadius={16}>
              <Text fontWeight="600">Agenda da Semana</Text>
            </Flex>
          </GridItem>

          <GridItem colSpan={1}>
            <Flex p={6} bg="white" display="flex" justifyContent="space-between" alignItems="center" borderRadius={16}>
              <Text fontWeight="600">Agenda Completa</Text>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}

export default ClientDashboard

const Appointments: iRstMeetCardClient[] = [
  {
    start: '2023-09-20 06:00:00',
    end: '2023-09-20 06:00:00',
    status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '2023-09-20 06:00:00',
    end: '2023-09-20 06:00:00',
    status: { id: 'asd', key: 'OCCUPIED', pt: 'Pendente' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '2023-09-20 06:00:00',
    end: '2023-09-20 06:00:00',
    status: { id: 'asd', key: 'EMPTY', pt: 'Horario Vago' },
    service: {
      name: 'Corte de cabelo'
    }
  }
  // {
  //   start: '10:30',
  //   end: '10:30',
  //   status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
  //   service: {
  //     name: 'Corte de cabelo'
  //   }
  // },
  // {
  //   start: '10:30',
  //   end: '10:30',
  //   status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
  //   service: {
  //     name: 'Corte de cabelo'
  //   }
  // },
  // {
  //   start: '10:30',
  //   end: '10:30',
  //   status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
  //   service: {
  //     name: 'Corte de cabelo'
  //   }
  // },
  // {
  //   start: '10:30',
  //   end: '10:30',
  //   status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
  //   service: {
  //     name: 'Corte de cabelo'
  //   }
  // },
  // {
  //   start: '10:30',
  //   end: '10:30',
  //   status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
  //   service: {
  //     name: 'Corte de cabelo'
  //   }
  // },
  // {
  //   start: '10:30',
  //   end: '10:30',
  //   status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
  //   service: {
  //     name: 'Corte de cabelo'
  //   }
  // }
]
