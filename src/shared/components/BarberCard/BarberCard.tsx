import { Avatar, Flex, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { iBarber } from '@shared/interface/public'
import RstBarberCardModalServices from './BarberCardModalServices'
import { phoneMask } from '@shared/utils/phoneMask'

export type iRstBarberCard = iBarber

export const RstBarberCard = ({ ...barber }: iRstBarberCard) => {
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
          <Avatar
            w={16}
            h={16}
            bg="gray.500"
            justifyContent="center"
            alignItems="center"
            borderRadius={12}
            name={barber.name}
          />
          <Flex flexDir="column">
            <Text color="gray.1200" fontWeight={500} fontSize={20} textTransform="capitalize">
              {barber?.name}
            </Text>

            <Text color="gray.1200" fontWeight={500} fontSize={14}>
              {phoneMask(barber?.phoneNumber)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {isOpenBarberCard && (
        <RstBarberCardModalServices isOpen={isOpenBarberCard} onClose={onCloseBarberCard} barber={barber} />
      )}
    </>
  )
}
