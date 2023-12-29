import { RstHeaderBarbershop } from '@shared/components/Header/HeaderBarbershop'
import React from 'react'
import { Flex, Grid, GridItem, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { FiFrown, FiPlus } from 'react-icons/fi'
import RstButton from '@shared/components/Button'
import { iBarber } from '@shared/interface/public'
import { RstBarberInfosCard } from '@shared/components/BarberInfosCard/BarberInfosCard'
import RstFormBarber from '@shared/components/FormBarber'

const BarbershopDashboard = () => {
  // const { data, isLoading } = useFetch<iService[]>(QUERY_KEYS.GET_BARBER_SERVICES, ENDPOINTS.GET_BARBER_SERVICES)
  const data = [
    {
      id: '1',
      name: 'João Silva',
      phoneNumber: '+55 123456789',
      startWork: '2023-01-01T08:00:00Z',
      endWork: '2023-01-01T18:00:00Z',
      timePerWork: 30,
      email: 'joao.silva@example.com',
      password: 'hashed_password_123',
      barberShopId: 'A1'
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      phoneNumber: '+55 987654321',
      startWork: '2023-01-01T09:00:00Z',
      endWork: '2023-01-01T17:00:00Z',
      timePerWork: 45,
      email: 'maria.oliveira@example.com',
      password: 'hashed_password_456',
      barberShopId: 'B1'
    },
    {
      id: '3',
      name: 'Carlos Santos',
      phoneNumber: '+55 111223344',
      startWork: '2023-01-01T10:30:00Z',
      endWork: '2023-01-01T19:30:00Z',
      timePerWork: 60,
      email: 'carlos.santos@example.com',
      password: 'hashed_password_789',
      barberShopId: 'C1'
    }
  ] as iBarber[]

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <RstHeaderBarbershop />
      <Flex flexDir="column" px={5} gap={4} mb={12}>
        <Text fontWeight={600} fontSize={18}>
          Gerenciar barbeiros
        </Text>
        <Grid gap={2} bg="gray.100" p={4} borderRadius={24}>
          <GridItem>
            <Flex p={6} alignItems="center">
              <Text fontWeight="600" fontSize={18}>
                barbeiros
              </Text>
            </Flex>
          </GridItem>

          {data?.length === 0 ? (
            <Flex flexDir="column" justifyContent="center" alignItems="center" gap={2} h="full" color="gray.1000">
              <Icon as={FiFrown} fontSize="5xl" />
              <Text w={60} textAlign="center">
                Você ainda não possui barbeiros cadastrados
              </Text>
            </Flex>
          ) : (
            data?.map((barbershop, index) => <RstBarberInfosCard key={index} {...barbershop} />)
          )}

          <GridItem mt={2}>
            <RstButton w="full" leftIcon={<FiPlus />} onClick={onOpen}>
              Cadastrar barbeiro
            </RstButton>
          </GridItem>
        </Grid>
      </Flex>
      <RstFormBarber isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default BarbershopDashboard
