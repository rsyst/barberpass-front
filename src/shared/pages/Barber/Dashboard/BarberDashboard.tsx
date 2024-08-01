import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { RstAccordion, RstLoading, RstInfoCard, RstMeetCardBarber } from '@shared/components'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iAppointment, iBarber } from '@shared/interfaces'
import { useFetch } from '@shared/services'
import { floatToCurrency } from '@shared/utils'

interface GetBarberDashboard {
  dailyAmount: number
  dailyAppointments: number
  dailyConfirmedAppointments: number
  weeklyAmount: number
  weeklyAppointments: number
  weeklyConfirmedAppointments: number
  monthlyAmount: number
  monthlyAppointments: number
  monthlyConfirmedAppointments: number
  yearlyAmount: number
  yearlyAppointments: number
  yearlyConfirmedAppointments: number
}

export const BarberDashboard = () => {
  const { data: barber, isLoading: loadingBarber } = useFetch<iBarber>(QUERY_KEYS.GET_BARBER, ENDPOINTS.GET_BARBER)
  const { data: dashboard, isLoading: loadingDashboard } = useFetch<GetBarberDashboard>(
    QUERY_KEYS.GET_BARBER_DASHBOARD,
    ENDPOINTS.GET_BARBER_DASHBOARD
  )
  const {
    data: nextAppointments,
    isLoading: loadingNextAppointments,
    isRefetching: refetchingNextAppointments
  } = useFetch<iAppointment[]>(QUERY_KEYS.GET_BARBER_APPOINTMENTS_NEXT, ENDPOINTS.GET_BARBER_APPOINTMENTS_NEXT)
  const {
    data: dailyAppointments,
    isLoading: loadingDailyAppointments,
    isRefetching: refetchingDailyAppointments
  } = useFetch<iAppointment[]>(QUERY_KEYS.GET_BARBER_APPOINTMENTS_DAY, ENDPOINTS.GET_BARBER_APPOINTMENTS_DAY)

  if (loadingBarber || loadingNextAppointments || loadingDailyAppointments || loadingDashboard) return <RstLoading />

  return (
    <>
      <Flex
        flexDir="column"
        px={5}
        gap={4}
        p={4}
        bg="blackAlpha.50"
        border="2px solid"
        borderColor="gray.200"
        borderRadius={16}
      >
        <Flex>
          <Text color="gray.1200" fontSize="lg" fontWeight="bold">
            Bom dia,
          </Text>
          <Text color="gray.1100" fontSize="lg" ml={1} textTransform="capitalize">
            {barber?.name}
          </Text>
        </Flex>

        <Grid templateColumns="repeat(3, 1fr)" gap={3} overflowX="auto">
          <RstInfoCard
            title="Faturamento do dia"
            value={floatToCurrency(dashboard?.dailyAmount as number)}
            badge={{ colorScheme: 'whiteAlpha', children: 'Sem dados anteriores' }}
            bg="yellow.400"
            color="white"
          />
          <RstInfoCard
            title="Atendimentos"
            value={dashboard?.dailyAppointments as number}
            badge={{ colorScheme: 'whiteAlpha', children: 'Sem dados anteriores' }}
            bg="teal.400"
            color="white"
          />
          <RstInfoCard
            title="Horários concluidos"
            value={dashboard?.dailyConfirmedAppointments as number}
            badge={{ colorScheme: 'whiteAlpha', children: 'Sem dados anteriores' }}
            bg="blue.500"
            color="white"
          />
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <RstAccordion title="Agendamentos Seguintes" isLoading={refetchingNextAppointments} defaultIsOpen>
              <Flex flexDir="column" overflowY="auto" maxH="30vh">
                {nextAppointments?.map((appointment, index) => (
                  <RstMeetCardBarber key={index} {...appointment} />
                ))}
              </Flex>
            </RstAccordion>
          </GridItem>

          <GridItem colSpan={2}>
            <RstAccordion title="Agenda do Dia" isLoading={refetchingDailyAppointments} defaultIsOpen>
              <Flex flexDir="column" overflowY="auto" maxH="40dvh">
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
