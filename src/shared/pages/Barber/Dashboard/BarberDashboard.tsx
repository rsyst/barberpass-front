import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import RstAccordion from '@shared/components/Accordion'
import RstInfoCard from '@shared/components/InfoCard'
import { RstLoading } from '@shared/components/Loading'
import { RstMeetCardBarber } from '@shared/components/MeetCard/MeetCardBarber'
import RstText from '@shared/components/Text'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { QUERY_KEYS } from '@shared/constants/query-keys'
import { iAppointment, iBarber } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import { floatToCurrency } from '@shared/utils/currencyMask'

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

const BarberDashboard = () => {
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
          <RstText color="gray.1200" fontSize="lg" fontWeight="bold">
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
            <RstAccordion title="Agendamentos Seguintes" isLoading={refetchingNextAppointments}>
              <Flex flexDir="column" overflowY="auto" h="30vh">
                {nextAppointments?.map((appointment, index) => (
                  <RstMeetCardBarber key={index} {...appointment} />
                ))}
              </Flex>
            </RstAccordion>
          </GridItem>

          <GridItem colSpan={2}>
            <RstAccordion title="Agenda do Dia" isLoading={refetchingDailyAppointments}>
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
