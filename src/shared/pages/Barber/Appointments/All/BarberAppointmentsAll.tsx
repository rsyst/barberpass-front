import { Flex, Grid, GridItem, Input, Text } from '@chakra-ui/react'
import { RstHeaderBarber } from '@shared/components/Header'
import { RstMeetCardBarber } from '@shared/components/MeetCard'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iAppointment } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import moment from 'moment'
import React from 'react'

const BarberAppointmentsAll = () => {
  const { data: appointments } = useFetch<iAppointment[]>(
    QUERY_KEYS.GET_BARBER_APPOINTMENTS,
    ENDPOINTS.GET_BARBER_APPOINTMENTS
  )

  const [date, setDate] = React.useState(moment().format('YYYY-MM-DD') as string)

  return (
    <>
      <RstHeaderBarber />
      <Flex flexDir="column" px={5} gap={4} mb={12}>
        <Text fontWeight={600} fontSize={18}>
          Agenda Completa
        </Text>

        <Grid gap={2} bg="gray.100" p={4} borderRadius={24}>
          <GridItem>
            <Flex p={6} alignItems="center">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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

export default BarberAppointmentsAll
