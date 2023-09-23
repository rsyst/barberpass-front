import { Flex, Grid, GridItem, Icon, Text, useDisclosure } from '@chakra-ui/react'
import RstButton from '@shared/components/Button'
import RstFormService from '@shared/components/FormService'
import { RstHeaderBarber } from '@shared/components/Header'
import { RstServiceCardBarber } from '@shared/components/ServiceCard'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { iService } from '@shared/interface/public'
import { useFetch } from '@shared/service/use-queries'
import React from 'react'
import { FiFrown, FiPlus } from 'react-icons/fi'

const BarberConfigServices = () => {
  const { data, isLoading } = useFetch<iService[]>(QUERY_KEYS.GET_BARBER_SERVICES, ENDPOINTS.GET_BARBER_SERVICES)
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (isLoading) return <div>Carregando...</div>

  return (
    <>
      <RstHeaderBarber />
      <Flex flexDir="column" px={5} gap={4} mb={12}>
        <Text fontWeight={600} fontSize={18}>
          Gerenciar Serviços
        </Text>
        <Grid gap={2} bg="gray.100" p={4} borderRadius={24}>
          <GridItem>
            <Flex p={6} alignItems="center">
              <Text fontWeight="600" fontSize={18}>
                Serviços
              </Text>
            </Flex>
          </GridItem>

          {data?.length === 0 ? (
            <Flex flexDir="column" justifyContent="center" alignItems="center" gap={2} h="full" color="gray.1000">
              <Icon as={FiFrown} fontSize="5xl" />
              <Text w={60} textAlign="center">
                Nenhum serviço cadastrado ainda
              </Text>
            </Flex>
          ) : (
            data?.map((service, index) => <RstServiceCardBarber key={index} {...service} />)
          )}

          <GridItem mt={2}>
            <RstButton w="full" leftIcon={<FiPlus />} onClick={onOpen}>
              Cadastrar Serviço
            </RstButton>
          </GridItem>
        </Grid>
      </Flex>
      <RstFormService isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default BarberConfigServices
