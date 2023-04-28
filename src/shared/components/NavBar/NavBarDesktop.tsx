import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import { iRoutes } from 'shared/interface/routes'
interface iProps {
  routes: iRoutes[]
}
const RstNavBarDesktop = ({ routes }: iProps) => {
  return (
    <Flex w={258} h="100vh" bg="white">
      <Grid h="min-content" w="100%">
        <GridItem fontSize={20}>Logo</GridItem>
        {routes.map((route, index) => (
          <GridItem key={index} _hover={{ bg: 'green.200' }} p={4} m={2} borderRadius={8} cursor="pointer">
            <Text> {route.name}</Text>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  )
}

export default RstNavBarDesktop
