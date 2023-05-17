import { Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import { useAuth } from '@shared/providers/auth'
import React from 'react'
import RstAvatar from '../Avatar'
import RstText from '../Text'

const user = {
  name: 'Johannes Justesen'
}

export const RstHeader = () => {
  const { handleLogout } = useAuth()
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
      <Menu>
        <MenuButton>
          <RstAvatar size="sm" name={user.name} color="gray.100" />
        </MenuButton>
        <MenuList color="gray.1100">
          <MenuItem>Perfil</MenuItem>
          <MenuItem>Configurações</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
