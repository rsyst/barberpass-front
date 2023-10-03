import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

export const RstLoading = () => {
  return (
    <Flex justifyContent="center" alignItems="center" h="100vh">
      <Spinner size="xl" color="newBlue.1000" />
    </Flex>
  )
}
