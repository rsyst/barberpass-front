import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Navbar } from '../Navbar'
import { LayoutUserProvider, useLayoutUserContext } from './LayoutUser.Context'

interface iProps {
  children: React.ReactElement | React.ReactElement[]
}

export const LayoutUser = ({ children }: iProps) => {
  return (
    <LayoutUserProvider>
      <LayoutUserWithouProvider>{children}</LayoutUserWithouProvider>
    </LayoutUserProvider>
  )
}

export const LayoutUserWithouProvider = ({ children }: iProps) => {
  const { isOpenMenu } = useLayoutUserContext()

  return (
    <Flex flexDir="column">
      <Box position="fixed" zIndex={999}>
        <Navbar />
      </Box>

      <Box
        ml={{ base: 0, lg: isOpenMenu ? 260 : 0 }}
        w={{
          base: `calc(100vw - 0px)`,
          lg: `calc(100vw - ${isOpenMenu ? '260px' : '0px'})`
        }}
        overflowY="auto"
      >
        <Box h={16} display={{ base: 'block', lg: 'none' }} />
        <Flex flexDir="column" pt={4} px={{ base: 5, lg: 8 }} w="full" h="calc(100dvh - 64px)">
          {children}
        </Flex>
      </Box>
    </Flex>
  )
}
