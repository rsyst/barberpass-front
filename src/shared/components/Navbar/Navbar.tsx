import { Box, Divider, Flex, Icon, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiPower } from 'react-icons/fi'
import { HiOutlineChartBar } from 'react-icons/hi'
import { IoMdTimer } from 'react-icons/io'
// import { LiaUser } from 'react-icons/lia';
import { IconType } from 'react-icons/lib'
import { RiWaterPercentLine } from 'react-icons/ri'
import { useAuth } from '@shared/providers/auth'
import { useLayoutUserContext } from '../LayoutUser'

export interface iRoutes {
  name: string
  path: string
  icon: IconType
}
;[]

export const Navbar = () => {
  const routes = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: IoMdTimer
    },
    // {
    //   name: 'Team',
    //   path: '/team',
    //   icon: LiaUser,
    // },
    {
      name: 'Fermentation list',
      path: '/fermentation',
      icon: HiOutlineChartBar
    },
    {
      name: 'Quality',
      path: '/quality',
      icon: IoMdTimer
    },
    {
      name: 'Moisture',
      path: '/moisture',
      icon: RiWaterPercentLine
    }
  ]
  const router = useRouter()
  const { isOpenMenu } = useLayoutUserContext()
  const { handleLogout } = useAuth()
  const selectedRoute = routes.find((route) => route.path === router.pathname) as (typeof routes)[0]

  const isSelected = (route: (typeof routes)[0]) => route.name === selectedRoute?.name
  return (
    <Flex
      transition="width 0.1s ease-in-out"
      flexDir="column"
      justifyContent="space-between"
      w={isOpenMenu ? 240 : 16}
      gap={2}
      bg="white"
      h="100vh"
      borderRight="2px solid"
      borderColor="gray.200"
    >
      <Flex flexDir="column">
        <Flex p={isOpenMenu ? 6 : 2}>
          <Image h={isOpenMenu ? 30 : 10} src={isOpenMenu ? '/Logo.png' : '/Logo-mini.png'} />
        </Flex>
        <Flex flexDir="column" gap={1}>
          {routes.map((route, index) => (
            <NavbarButton key={index} route={route} isSelected={isSelected(route)} />
          ))}
        </Flex>
      </Flex>
      <Flex flexDir="column" gap={2} w="full" pb={4}>
        <Divider borderColor="gray.300" />
        {/* <Box >
          <NavbarButton
            route={{
              name: 'Settings',
              path: '/',
              icon: FiSettings,
            }}
            isSelected={false}
          />
        </Box> */}
        <Box onClick={handleLogout}>
          <NavbarButton
            route={{
              name: 'Logout',
              path: '/',
              icon: FiPower
            }}
            isSelected={false}
          />
        </Box>
      </Flex>
    </Flex>
  )
}

const NavbarButton = ({ route, isSelected }: { isSelected: boolean; route: iRoutes }) => {
  const { isOpenMenu } = useLayoutUserContext()

  if (!isOpenMenu && isSelected) {
    return (
      <Flex key={route.path} gap={1} pr={2} cursor="pointer">
        <Box bg="brand.500" borderEndRadius={6} w={1} />

        <Flex py={3} px={4} bg="brand.500" color="white" borderRadius={6} alignItems="center" gap={4} w="full">
          <Icon as={route.icon} />
        </Flex>
      </Flex>
    )
  }

  if (!isOpenMenu && !isSelected) {
    return (
      <Flex as={Link} href={route.path} key={route.path} gap={1} pr={2} cursor="pointer">
        <Box borderEndRadius={6} w={1} />

        <Flex
          py={3}
          px={4}
          color="black"
          borderRadius={6}
          alignItems="center"
          gap={4}
          w="full"
          _hover={{ bg: 'gray.100' }}
          _active={{ bg: 'gray.200' }}
        >
          <Icon as={route.icon} />
        </Flex>
      </Flex>
    )
  }

  if (isSelected) {
    return (
      <Flex key={route.path} gap={4} pr={5} cursor="pointer">
        <Box bg="brand.500" borderEndRadius={6} w={1} />
        <Flex py={3} px={4} bg="brand.500" color="white" borderRadius={6} alignItems="center" gap={4} w="full">
          <Icon as={route.icon} />
          <Text fontSize={14}>{route.name}</Text>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex key={route.path} as="a" href={route.path} gap={4} pr={5} cursor="pointer">
      <Box borderEndRadius={6} w={1} />
      <Flex
        py={3}
        px={4}
        color="black"
        borderRadius={6}
        alignItems="center"
        gap={4}
        w="full"
        _hover={{ bg: 'gray.100' }}
        _active={{ bg: 'gray.200' }}
      >
        <Icon as={route.icon} />
        <Text fontSize={14}>{route.name}</Text>
      </Flex>
    </Flex>
  )
}
