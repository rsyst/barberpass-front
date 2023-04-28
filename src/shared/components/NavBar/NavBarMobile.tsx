import { Avatar, Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import Router from 'next/router'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { useAuth } from 'shared/providers/auth'
import { useUserContext } from 'shared/providers/user'
import { iEmployesControllerResponse, useQueryEmployesController } from 'shared/service/EmployesController'
import { iRoutes } from './NavBar'

interface iProps {
  routes: iRoutes[]
}
const RstNavBarMobile = ({ routes }: iProps) => {
  const { data: users = [] } = useQueryEmployesController()

  const { handleLogout } = useAuth()

  const { user, handleSetUser } = useUserContext()

  const handleRedirect = (path: string) => {
    Router.push(path)
  }

  return (
    <>
      <Box h={16} />
      <Flex
        position="fixed"
        w="100vw"
        bg="white"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        py={2}
        zIndex={9}
      >
        <Menu>
          <MenuButton>
            <Avatar name={user?.name} size="md" />
          </MenuButton>
          <MenuList>
            {users?.map((user: iEmployesControllerResponse) => (
              <MenuItem key={user.name} onClick={() => handleSetUser(user)}>
                <Avatar name={user.name} size="sm" mr={2} />
                <Text textTransform="capitalize">{user.name}</Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Text fontWeight="bold" fontSize="lg">
          Agendaê
        </Text>

        <Menu>
          <MenuButton>
            <IconButton colorScheme="blue" size="lg" variant="ghost" aria-label="Menu" icon={<FiMenu />} />
          </MenuButton>
          <MenuList>
            {routes.map((route) => (
              <MenuItem key={route.path} onClick={() => handleRedirect(route.path)}>
                {route.name}
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  )
}

export default RstNavBarMobile
