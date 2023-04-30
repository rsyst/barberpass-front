import { Button } from '@chakra-ui/react'
import React from 'react'

export const RstButton = ({ colorScheme = 'blue', ...props }) => {
  return (
    <Button
      {...props}
      color={`${colorScheme}.1100`}
      bg={`${colorScheme}.300`}
      _hover={{ bg: `${colorScheme}.400` }}
      _active={{ bg: `${colorScheme}.500` }}
      borderRadius={16}
      h="54px"
    />
  )
}
