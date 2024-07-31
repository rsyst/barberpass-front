import {
  Box,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
  useMediaQuery
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaBars, FaCalendarWeek } from 'react-icons/fa'
import { FaCalendarDays } from 'react-icons/fa6'
import { FiLogOut } from 'react-icons/fi'
import { IoSettingsSharp } from 'react-icons/io5'
import { IconType } from 'react-icons/lib'
import { MdSpaceDashboard } from 'react-icons/md'
import { useLayoutUserContext } from '../LayoutUser'

export interface iRoutes {
  name: string
  path: string
  icon: IconType
}
;[]

const routes = [
  {
    name: 'Home',
    path: '/barber/dashboard',
    icon: MdSpaceDashboard
  },
  {
    name: 'Agenda da semana',
    path: '/barber/appointments/weekly',
    icon: FaCalendarWeek
  },
  {
    name: 'Agenda completa',
    path: '/barber/appointments/all',
    icon: FaCalendarDays
  },
  {
    name: 'Configurações',
    path: '/barber/config',
    icon: IoSettingsSharp
  }
]

export const Navbar = () => {
  const router = useRouter()
  const { isOpenMenu, toggleMenu } = useLayoutUserContext()

  const [isDesktop] = useMediaQuery('(min-width: 800px)', {
    ssr: true,
    fallback: false
  })

  const handleLogout = async (event: any) => {
    event.preventDefault()
  }
  const selectedRoute = routes.find((route) => route.path === router.pathname) as iRoutes
  const isSelected = (route: iRoutes) => route.name === selectedRoute?.name

  return (
    <>
      {!isDesktop && (
        <IconButton
          right={-14}
          top={3}
          position={'absolute'}
          aria-label="menu"
          icon={<FaBars />}
          colorScheme="gray"
          onClick={toggleMenu}
        />
      )}

      {isDesktop ? (
        <Flex p={4}>
          <NavBarContent isSelected={isSelected} handleLogout={handleLogout} />
        </Flex>
      ) : (
        <Drawer onClose={toggleMenu} isOpen={isOpenMenu} size="xs" placement="left">
          <DrawerOverlay />
          <DrawerContent w="fit-content">
            <NavBarContent isSelected={isSelected} handleLogout={handleLogout} />
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}

const NavBarContent = ({
  isSelected,
  handleLogout
}: {
  isSelected: (route: iRoutes) => boolean
  handleLogout: any
}) => {
  const { isOpenMenu } = useLayoutUserContext()

  return (
    <Flex
      transition="width 0.1s ease-in-out"
      flexDir="column"
      justifyContent="space-between"
      w={{ base: 'full', lg: isOpenMenu ? 260 : 0 }}
      gap={2}
      bg="blackAlpha.50"
      h="calc(100dvh - 32px)"
      p={isOpenMenu ? 2 : 0}
      border="2px solid"
      borderColor="gray.200"
      borderRadius={16}
    >
      <Flex flexDir="column" position="relative">
        <Flex pb={2} display={isOpenMenu ? 'flex' : 'none'} justifyContent="center" p={4}>
          <Image h={8} src={'/logo.png'} objectFit="contain" alt="logo" />
        </Flex>
        <Flex flexDir="column" gap={1}>
          {routes.map((route, index) => (
            <NavbarButton key={index} route={route} isSelected={isSelected(route)} />
          ))}
        </Flex>
      </Flex>

      <Flex flexDir="column" gap={2} w="full" pb={{ base: 16, lg: 4 }}>
        <Divider borderColor="gray.900" />
        <Box onClick={handleLogout}>
          <NavbarButton
            route={{
              name: 'Sair',
              path: '/',
              icon: FiLogOut
            }}
            isSelected={false}
          />
        </Box>
      </Flex>
    </Flex>
  )
}

const NavbarButton = ({ route, isSelected }: { isSelected: boolean; route: iRoutes }) => {
  const { isOpenMenu, setIsOpenMenu } = useLayoutUserContext()
  const [isDesktop] = useMediaQuery('(min-width: 800px)', {
    ssr: true,
    fallback: false
  })

  if (!isOpenMenu && isSelected) {
    return null
  }

  if (!isOpenMenu && !isSelected) {
    return null
  }

  if (isSelected) {
    return (
      <Flex key={route.path} cursor="pointer">
        <Flex
          py={2}
          px={2}
          bg="blue.100"
          color="gray.900"
          borderRadius={8}
          alignItems="center"
          gap={2.5}
          w="full"
          borderRight="4px solid"
          borderColor={'blue.500'}
        >
          <Flex p={0.5}>
            <Icon as={route.icon} fontSize={20} />
          </Flex>
          <Text fontSize={14}>{route.name}</Text>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex
      key={route.path}
      as={Link}
      href={route.path}
      cursor="pointer"
      onClick={() => (isDesktop ? () => null : setIsOpenMenu(false))}
    >
      <Flex
        py={2}
        px={2}
        color="gray.900"
        borderRadius={8}
        alignItems="center"
        gap={2.5}
        w="full"
        _hover={{ bg: 'blue.50' }}
        _active={{ bg: 'gray.50' }}
      >
        <Flex p={0.5}>
          <Icon as={route.icon} fontSize={20} />
        </Flex>
        <Text fontSize={14}>{route.name}</Text>
      </Flex>
    </Flex>
  )
}
