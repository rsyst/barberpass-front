import { Flex, Grid, GridItem, IconButton, Text } from '@chakra-ui/react'
import RstButton from '@shared/components/Button'
import { RstHeaderBarber } from '@shared/components/Header'
import { RstServiceCardBarber } from '@shared/components/ServiceCard'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iService } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import React from 'react'
import { FiPlus } from 'react-icons/fi'

const BarberConfigServices = () => {
  const { data, isLoading } = useFetch<iService[]>(QUERY_KEYS.GET_BARBER_SERVICES, ENDPOINTS.GET_BARBER_SERVICES)

  return (
    <>
      <RstHeaderBarber />
      <Flex flexDir="column" px={5} gap={4}>
        <Text fontWeight={600} fontSize={18}>
          Gerenciar Serviços
        </Text>
        <Grid gap={2} bg="gray.100" p={4} borderRadius={24}>
          <GridItem>
            <Flex p={6} bg="white" alignItems="center">
              <Text fontWeight="600">Serviços</Text>
            </Flex>
          </GridItem>

          <RstServiceCardBarber />
          <RstServiceCardBarber />

          <GridItem mt={2}>
            <RstButton w="full" leftIcon={<FiPlus />}>
              Criar Serviço
            </RstButton>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}

export default BarberConfigServices
