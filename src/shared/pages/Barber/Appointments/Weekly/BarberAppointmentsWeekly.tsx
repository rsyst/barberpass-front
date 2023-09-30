import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { RstHeaderBarber } from '@shared/components/Header'
import { RstMeetCardBarber } from '@shared/components/MeetCard'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iAppointment } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import moment from 'moment'
import React from 'react'
import { getWeekDays } from './utils'
import RstSelect from '@shared/components/Select'

interface FetchAppointment {
  [key: string]: iAppointment[]
}

const BarberAppointmentsWeekly = () => {
  const { data: appointments, isLoading: loadingAppointments } = useFetch<FetchAppointment>(
    QUERY_KEYS.GET_BARBER_APPOINTMENTS_WEEK,
    ENDPOINTS.GET_BARBER_APPOINTMENTS_WEEK
  )
  const [date, setDate] = React.useState(moment().format('YYYY-MM-DD') as string)

  const weekDays = getWeekDays()

  if (loadingAppointments) {
    return <div>loading...</div>
  }
  return (
    <>
      <RstHeaderBarber />
      <Flex flexDir="column" px={5} gap={4} mb={12}>
        <Text fontWeight={600} fontSize={18}>
          Agenda da semana
        </Text>

        <Grid gap={2} p={6} bg="gray.100" borderRadius={24}>
          <GridItem>
            <Flex alignItems="center">
              <RstSelect placeholder="Selecione o dia da semana" value={date} onChange={(e) => setDate(e.target.value)}>
                {weekDays?.map((day) => (
                  <option key={day.date} value={day.date}>
                    {day.name}
                  </option>
                ))}
              </RstSelect>
            </Flex>
          </GridItem>

          <Flex flexDir="column" overflowY="auto" h="calc(100vh - 300px)">
            {appointments?.[date]?.map((appointment, index) => (
              <RstMeetCardBarber key={index} {...appointment} />
            ))}
          </Flex>
        </Grid>
      </Flex>
    </>
  )
}

export default BarberAppointmentsWeekly
