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
import { floatToCurrency } from '@shared/utils/currencyMask'
import React from 'react'

interface GetBarberDashboard {
  dailyAmount: number
  dailyAppointments: number
  dailyTime: number
  weeklyAmount: number
  weeklyAppointments: number
  weeklyTime: number
  monthlyAmount: number
  monthlyAppointments: number
  monthlyTime: number
  yearlyAmount: number
  yearlyAppointments: number
  yearlyTime: number
}

const BarberDashboard = () => {
  const { data: barber, isLoading: loadingBarber } = useFetch<iBarber>(QUERY_KEYS.GET_BARBER, ENDPOINTS.GET_BARBER)
  const { data: dashboard, isLoading: loadingDashboard } = useFetch<GetBarberDashboard>(
    QUERY_KEYS.GET_BARBER_DASHBOARD,
    ENDPOINTS.GET_BARBER_DASHBOARD
  )
  const { data: nextAppointments, isLoading: loadingNextAppointments } = useFetch<iAppointment[]>(
    QUERY_KEYS.GET_BARBER_APPOINTMENTS_NEXT,
    ENDPOINTS.GET_BARBER_APPOINTMENTS_NEXT
  )
  const { data: dailyAppointments, isLoading: loadingDailyAppointments } = useFetch<iAppointment[]>(
    QUERY_KEYS.GET_BARBER_APPOINTMENTS_DAY,
    ENDPOINTS.GET_BARBER_APPOINTMENTS_DAY
  )
  if (loadingBarber || loadingNextAppointments || loadingDailyAppointments || loadingDashboard)
    return <div>loading...</div>

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
            value={floatToCurrency(dashboard?.dailyAmount as number)}
            badge={{ colorScheme: 'newGreen', children: '+5,6% maior (ultima semana)' }}
          />
          <RstInfoCard
            title="Atendimentos"
            value={dashboard?.dailyAppointments as number}
            badge={{ colorScheme: 'newRed', children: '-3 essa semana' }}
          />
          <RstInfoCard
            title="Clientes"
            value={dashboard?.dailyTime as number}
            badge={{ colorScheme: 'newGreen', children: '2 novos cliente' }}
          />
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
