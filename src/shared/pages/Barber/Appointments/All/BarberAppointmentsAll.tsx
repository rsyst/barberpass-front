import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { RstHeaderBarber } from '@shared/components/Header'
import { RstInput } from '@shared/components/Input'
import { RstLoading } from '@shared/components/Loading'
import { RstMeetCardBarber } from '@shared/components/MeetCard'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iAppointment } from '@shared/interfaces/public'
import { useFetch } from '@shared/services/use-queries'
import moment from 'moment'
import React from 'react'

export const BarberAppointmentsAll = () => {
  const [date, setDate] = React.useState(moment().format('YYYY-MM-DD') as string)

  const { data: appointments, isLoading } = useFetch<iAppointment[]>(
    QUERY_KEYS.GET_BARBER_APPOINTMENTS_DAY_BY_DATE(date),
    ENDPOINTS.GET_BARBER_APPOINTMENTS_DAY_BY_DATE(date)
  )

  if (isLoading) {
    return <RstLoading />
  }

  return (
    <>
      <RstHeaderBarber />
      <Flex flexDir="column" px={5} gap={4} mb={12}>
        <Text fontWeight={600} fontSize={18}>
          Agenda Completa
        </Text>

        <Grid gap={2} bg="gray.100" p={4} borderRadius={24}>
          <GridItem>
            <Flex p={2} alignItems="center">
              <RstInput type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Flex>
          </GridItem>

          <Flex flexDir="column" overflowY="auto" h="calc(100vh - 300px)">
            {appointments?.map((appointment, index) => (
              <RstMeetCardBarber key={index} {...appointment} />
            ))}
          </Flex>
        </Grid>
      </Flex>
    </>
  )
}
