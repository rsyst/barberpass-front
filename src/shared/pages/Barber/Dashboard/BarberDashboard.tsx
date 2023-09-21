import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import RstAccordion from '@shared/components/Accordion'
import { RstHeaderBarber } from '@shared/components/Header'
import RstInfoCard from '@shared/components/InfoCard'
import { RstMeetCardBarber, iRstMeetCardBarber } from '@shared/components/MeetCard/MeetCardBarber'
import RstText from '@shared/components/Text'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { QUERY_KEYS } from '@shared/constants/query-keys'
import { iBarber } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import React from 'react'

const BarberDashboard = () => {
  const { data, isLoading } = useFetch<iBarber>(QUERY_KEYS.GET_BARBER, ENDPOINTS.GET_BARBER)

  if (isLoading) return <div>loading...</div>

  return (
    <>
      <RstHeaderBarber />
      <Flex flexDir="column" px={5} gap={4}>
        <Flex>
          <RstText color="gray.1200" fontVariant="h5">
            Bom dia,
          </RstText>
          <RstText color="gray.1100" fontVariant="h5" ml={1} textTransform="capitalize">
            {data?.name}
          </RstText>
        </Flex>

        <Grid templateColumns="repeat(3, 1fr)" gap={3} overflowX="scroll">
          <RstInfoCard
            title="Faturamento do dia"
            value="$120,80"
            badge={{ colorScheme: 'green', children: '+5,6% maior (ultima semana)' }}
          />
          <RstInfoCard title="Atendimentos" value="23" badge={{ colorScheme: 'red', children: '-3 essa semana' }} />
          <RstInfoCard title="Clientes" value="63" badge={{ colorScheme: 'green', children: '2 novos cliente' }} />
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <RstAccordion title="Agendamentos Seguintes">
              <Flex flexDir="column" overflowY="auto" h="30vh">
                {Appointments.map((appointment, index) => (
                  <RstMeetCardBarber key={index} {...appointment} />
                ))}
              </Flex>
            </RstAccordion>
          </GridItem>

          <GridItem colSpan={2}>
            <RstAccordion title="Agenda do Dia">
              <Flex flexDir="column" overflowY="auto" h="30vh">
                {Appointments.map((appointment, index) => (
                  <RstMeetCardBarber key={index} {...appointment} />
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

export default BarberDashboard

const Appointments: iRstMeetCardBarber[] = [
  {
    start: '10:30',
    end: '10:30',
    status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '11:30',
    end: '10:30',
    status: { id: 'asd', key: 'BREAK', pt: 'Intervalo' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { id: 'asd', key: 'OCCUPIED', pt: 'Pendente' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { id: 'asd', key: 'EMPTY', pt: 'Horario Vago' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  },
  {
    start: '10:30',
    end: '10:30',
    status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
    service: {
      name: 'Corte de cabelo'
    }
  }
]
