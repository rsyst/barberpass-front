import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import RstAvatar from '../Avatar'
import { FiMenu } from 'react-icons/fi'
import { useAuth } from '@shared/providers/auth'
import { iBarber } from '@shared/interface/public'
import { QUERY_KEYS, ENDPOINTS } from '@shared/constants'
import { useFetch } from '@shared/service/use-queries'

export const RstHeaderClient = () => {
  const { handleLogout } = useAuth()
  const { data } = useFetch<iBarber>(QUERY_KEYS.GET_CLIENT, ENDPOINTS.GET_CLIENT)

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
          <RstAvatar name={data?.name} size="sm" color="gray.100" />
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
