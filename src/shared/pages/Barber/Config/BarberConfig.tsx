import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { RstHeaderBarber } from '@shared/components/Header'
import React from 'react'

export const BarberConfig = () => {
  return (
    <>
      <RstHeaderBarber />
      <Flex flexDir="column" px={5} gap={4}>
        <Text fontWeight={600} fontSize={18}>
          Configurações
        </Text>
        <Grid gap={2}>
          <GridItem as="a" href="/barber/config/services" color="newBlue.1000">
            <Flex p={6} bg="white" display="flex" justifyContent="space-between" alignItems="center" borderRadius={16}>
              <Text fontWeight="600">Gerenciar Serviços</Text>
            </Flex>
          </GridItem>

          <GridItem as="a" href="/barber/config/profile" color="newBlue.1000">
            <Flex p={6} bg="white" display="flex" justifyContent="space-between" alignItems="center" borderRadius={16}>
              <Text fontWeight="600">Editar usuário</Text>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}
