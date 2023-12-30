import { Flex, Grid, GridItem, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { RstBarberInfosCard } from '@shared/components/BarberInfosCard/BarberInfosCard'
import RstButton from '@shared/components/Button'
import RstFormBarber from '@shared/components/FormBarber'
import { RstHeaderBarbershop } from '@shared/components/Header/HeaderBarbershop'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iBarber } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import { FiFrown, FiPlus } from 'react-icons/fi'

const BarbershopDashboard = () => {
  const { data, isLoading } = useFetch<iBarber[]>(QUERY_KEYS.GET_BARBER_SHOP_BARBERS, ENDPOINTS.GET_BARBER_SHOP_BARBERS)

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
                Barbeiros
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
