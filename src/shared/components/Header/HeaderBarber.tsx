import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import RstAvatar from '../Avatar'
import { FiMenu } from 'react-icons/fi'
import { useAuth } from '@shared/providers/auth'

const user = {
  name: 'Johannes Justesen'
}

export const RstHeaderBarber = () => {
  const { handleLogout } = useAuth()

  const optionsMenu = [{ label: 'Configurações', onClick: () => console.log('sair') }]
  const optionsUser = [{ label: 'Sair', onClick: handleLogout }]

  return (
    <Flex justifyContent="space-between" alignItems="center" p={4}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FiMenu />}
          variant="ghost"
          color="black"
          colorScheme="gray"
        />
        <MenuList>
          {optionsMenu.map((option, index) => (
            <MenuItem key={index} onClick={option.onClick}>
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton>
          <RstAvatar name={user.name} size="sm" color="gray.100" />
        </MenuButton>
        <MenuList>
          {optionsUser.map((option, index) => (
            <MenuItem key={index} onClick={option.onClick}>
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  )
}
