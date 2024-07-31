import { Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react'
import RstAccordion from '@shared/components/Accordion'
import RstBarbershopCard from '@shared/components/BarbershopCard'
import { RstHeaderClient } from '@shared/components/Header'
import { RstLoading } from '@shared/components/Loading'
import { RstMeetCardClient } from '@shared/components/MeetCard'
import RstText from '@shared/components/Text'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { QUERY_KEYS } from '@shared/constants/query-keys'
import { iAppointment, iBarber, iBarberShop } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'

import { FiFrown } from 'react-icons/fi'

const ClientDashboard = () => {
  // const { data: client, isLoading: loadingClient } = useFetch<iBarber>(QUERY_KEYS.GET_CLIENT, ENDPOINTS.GET_CLIENT)
  const client = {} as iBarber
  const { data: appointments, isLoading: loadingAppointments } = useFetch<iAppointment[]>(
    QUERY_KEYS.GET_CLIENT_APPOINTMENTS,
    ENDPOINTS.GET_CLIENT_APPOINTMENTS
  )
  const { data: barbershops, isLoading: loadingBarbershops } = useFetch<iBarberShop[]>(
    QUERY_KEYS.GET_CLIENT_BARBERSHOPS,
    ENDPOINTS.GET_CLIENT_BARBERSHOPS
  )

  if (loadingBarbershops || loadingAppointments) return <RstLoading />

  return (
    <>
      <RstHeaderClient />
      <Flex flexDir="column" px={5} gap={4}>
        <Flex>
          <RstText color="gray.1200" fontVariant="h5">
            Bom dia,
          </RstText>
          <RstText color="gray.1100" fontVariant="h5" ml={1} textTransform="capitalize">
            {client?.name}
          </RstText>
        </Flex>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <Flex flexDir="column" gap={2} bg="white" display="flex" borderRadius={16}>
              <Flex px={6} pt={6}>
                <Text fontWeight="600">Meus agendamentos do mês</Text>
              </Flex>

              <Flex flexDir="column" overflowY="auto" p={2} maxH="30vh">
                {!appointments || appointments.length <= 0 ? (
                  <Flex flexDir="column" justifyContent="center" alignItems="center" gap={2} h="full" color="gray.1000">
                    <Icon as={FiFrown} fontSize="5xl" />
                    <Text w={60} textAlign="center">
                      Nenhum agendamento encontrado
                    </Text>
                  </Flex>
                ) : (
                  appointments.map((appointment, index) => <RstMeetCardClient key={index} {...appointment} />)
                )}
              </Flex>
            </Flex>
          </GridItem>

          <GridItem colSpan={2}>
            <RstAccordion title="Barbearias">
              <Flex flexDir="column" overflowY="auto" maxH="30vh">
                {barbershops?.map((barbershop) => (
                  <RstBarbershopCard key={barbershop.id} {...barbershop} />
                ))}
              </Flex>
            </RstAccordion>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}

export default ClientDashboard
