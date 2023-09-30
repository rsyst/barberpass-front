import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import RstAccordion from '@shared/components/Accordion'
import { RstHeaderBarber } from '@shared/components/Header'
import RstInfoCard from '@shared/components/InfoCard'
import { RstMeetCardBarber } from '@shared/components/MeetCard/MeetCardBarber'
import RstText from '@shared/components/Text'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { QUERY_KEYS } from '@shared/constants/query-keys'
import { iAppointment, iBarber } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import React from 'react'

const BarberDashboard = () => {
  const { data: barber, isLoading: loadingBarber } = useFetch<iBarber>(QUERY_KEYS.GET_BARBER, ENDPOINTS.GET_BARBER)
  const { data: nextAppointments, isLoading: loadingNextAppointments } = useFetch<iAppointment[]>(
    QUERY_KEYS.GET_BARBER_APPOINTMENTS,
    ENDPOINTS.GET_BARBER_APPOINTMENTS
  )
  const { data: dailyAppointments, isLoading: loadingDailyAppointments } = useFetch<iAppointment[]>(
    QUERY_KEYS.GET_BARBER_APPOINTMENTS_DAY,
    ENDPOINTS.GET_BARBER_APPOINTMENTS_DAY
  )
  if (loadingBarber || loadingNextAppointments || loadingDailyAppointments) return <div>loading...</div>

  return (
    <>
      <RstHeaderBarber />
      <Flex flexDir="column" px={5} gap={4}>
        <Flex>
          <RstText color="gray.1200" fontVariant="h5">
            Bom dia,
          </RstText>
          <RstText color="gray.1100" fontVariant="h5" ml={1} textTransform="capitalize">
            {barber?.name}
          </RstText>
        </Flex>

        <Grid templateColumns="repeat(3, 1fr)" gap={3} overflowX="auto">
          <RstInfoCard
            title="Faturamento do dia"
            value="$120,80"
            badge={{ colorScheme: 'newGreen', children: '+5,6% maior (ultima semana)' }}
          />
          <RstInfoCard title="Atendimentos" value="23" badge={{ colorScheme: 'newRed', children: '-3 essa semana' }} />
          <RstInfoCard title="Clientes" value="63" badge={{ colorScheme: 'newGreen', children: '2 novos cliente' }} />
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <RstAccordion title="Agendamentos Seguintes">
              <Flex flexDir="column" overflowY="auto" h="30vh">
                {nextAppointments?.map((appointment, index) => (
                  <RstMeetCardBarber key={index} {...appointment} />
                ))}
              </Flex>
            </RstAccordion>
          </GridItem>

          <GridItem colSpan={2}>
            <RstAccordion title="Agenda do Dia">
              <Flex flexDir="column" overflowY="auto" h="30vh">
                {dailyAppointments?.map((appointment, index) => (
                  <RstMeetCardBarber key={index} {...appointment} />
                ))}
              </Flex>
            </RstAccordion>
          </GridItem>

          <GridItem colSpan={1} as="a" href="/barber/appointments/weekly">
            <Flex p={6} bg="white" display="flex" justifyContent="space-between" alignItems="center" borderRadius={16}>
              <Text color="black" fontWeight="600">
                Agenda da Semana
              </Text>
            </Flex>
          </GridItem>

          <GridItem colSpan={1} as="a" href="/barber/appointments/all">
            <Flex p={6} bg="white" display="flex" justifyContent="space-between" alignItems="center" borderRadius={16}>
              <Text color="black" fontWeight="600">
                Agenda Completa
              </Text>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}

export default BarberDashboard
