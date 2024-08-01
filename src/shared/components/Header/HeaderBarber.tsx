import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import RstAvatar from '../Avatar'
import { FiMenu } from 'react-icons/fi'
import { useAuth } from '@shared/providers/auth'
import { useFetch } from '@shared/services/use-queries'
import { iBarber } from '@shared/interfaces/public'
import { QUERY_KEYS, ENDPOINTS } from '@shared/constants'
import { useRouter } from 'next/router'

export const RstHeaderBarber = () => {
  const { data } = useFetch<iBarber>(QUERY_KEYS.GET_BARBER, ENDPOINTS.GET_BARBER)
  const { handleLogout } = useAuth()
  const router = useRouter()
  const optionsMenu = [
    { label: 'Home', onClick: () => router.push('/barber/dashboard') },
    { label: 'Configurações', onClick: () => router.push('/barber/config') },
    { label: 'Agenda da semana', onClick: () => router.push('/barber/appointments/weekly') },
    { label: 'Agenda completa', onClick: () => router.push('/barber/appointments/all') }
  ]
  const optionsUser = [{ label: 'Sair', onClick: handleLogout }]

  return (
    <Flex justifyContent="space-between" alignItems="center" px={4} py={2} shadow="md" mb={6} bg="white">
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
