import { Flex } from '@chakra-ui/react'
import React from 'react'
import RstAvatar from '../Avatar'
import RstText from '../Text'

const user = {
  name: 'Johannes Justesen'
}

export const RstHeader = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center" p={4}>
      <Flex>
        <RstText color="gray.1200" fontVariant="h5">
          Bom dia,
        </RstText>
        <RstText color="gray.1100" fontVariant="h5" ml={1}>
          {user.name}
        </RstText>
      </Flex>
      <RstAvatar size="sm" name={user.name} color="gray.100" />
    </Flex>
  )
}
