import { Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react'
import RstAccordion from '@shared/components/Accordion'
import RstBarbershopCard from '@shared/components/BarbershopCard'
import { RstHeaderClient } from '@shared/components/Header'
import { RstLoading } from '@shared/components/Loading'
import { RstMeetCardClient } from '@shared/components/MeetCard'
import { iRstMeetCardClient } from '@shared/components/MeetCard/MeetCardClient'
import RstText from '@shared/components/Text'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { QUERY_KEYS } from '@shared/constants/query-keys'
import { iBarber, iBarberShop } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'

import React from 'react'
import { FiFrown } from 'react-icons/fi'

const ClientDashboard = () => {
  const { data: client, isLoading: loadingClient } = useFetch<iBarber>(QUERY_KEYS.GET_CLIENT, ENDPOINTS.GET_CLIENT)
  const { data: barbershops, isLoading: loadingBarbershops } = useFetch<iBarberShop[]>(
    QUERY_KEYS.GET_CLIENT_BARBERSHOPS,
    ENDPOINTS.GET_CLIENT_BARBERSHOPS
  )

  if (loadingClient || loadingBarbershops) return <RstLoading />

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
                <Text fontWeight="600">Meus agendamentos</Text>
              </Flex>

              <Flex flexDir="column" overflowY="auto" p={2} maxH="30vh">
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

const Appointments: iRstMeetCardClient[] = [
  // {
  //   start: '2023-09-20 06:00:00',
  //   end: '2023-09-20 06:00:00',
  //   status: { id: 'asd', key: 'CONFIRMED', pt: 'confirmado' },
  //   service: {
  //     name: 'Corte de cabelo',
  //     id: '',
  //     price: '',
  //     workAmount: ''
  //   }
  // } as iRstMeetCardClient
]
