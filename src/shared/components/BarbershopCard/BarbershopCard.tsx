import { Flex, Icon, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { iBarberShop } from '@shared/interface/public'
import RstBarbershopCardModalBarber from './BarbershopCardModalBarber'

export type iRstBarbershopCard = iBarberShop

export const RstBarbershopCard = ({ ...barbershop }: iRstBarbershopCard) => {
  const { isOpen: isOpenBarberCard, onOpen: onOpenBarberCard, onClose: onCloseBarberCard } = useDisclosure()
  return (
    <>
      <Flex
        p={4}
        bg="gray.100"
        shadow="md"
        borderRadius={16}
        gap={4}
        justifyContent="space-between"
        minW={150}
        m={2}
        cursor="pointer"
        _hover={{ bg: 'gray.300' }}
        onClick={onOpenBarberCard}
      >
        <Flex gap={4}>
          <Flex w={16} h={16} bg="gray.500" justifyContent="center" alignItems="center" borderRadius={12}>
            <Icon />
          </Flex>
          <Flex flexDir="column">
            <Text color="gray.1200" fontWeight={500} fontSize={20}>
              {barbershop?.name}
            </Text>

            <Text color="gray.1200" fontWeight={500} fontSize={14}>
              {/* //! TODO: Change to address */}
              {/* {barbershop?.address} */}
              Endereço teste, n: 102
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {isOpenBarberCard && (
        <RstBarbershopCardModalBarber isOpen={isOpenBarberCard} onClose={onCloseBarberCard} barbershop={barbershop} />
      )}
    </>
  )
}
