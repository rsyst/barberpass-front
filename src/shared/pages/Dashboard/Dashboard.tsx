import { Flex } from '@chakra-ui/react'
import React from 'react'
import RstNavBar from 'shared/components/NavBar'
import { useMobileContext } from 'shared/providers/isMobile'

import DashboardDesktop from './DashboardDesktop'
import DashboardMobile from './DashboardMobile'

const Dashboard = () => {
  const { isMobile } = useMobileContext()

  return (
    <Flex flexDir={{ base: 'column', md: 'row' }}>
      <RstNavBar />
      {isMobile ? <DashboardMobile /> : <DashboardDesktop />}
    </Flex>
  )
}

export default Dashboard
