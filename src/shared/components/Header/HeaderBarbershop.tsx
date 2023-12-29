import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useAuth } from '@shared/providers/auth'
import { FiMenu } from 'react-icons/fi'

export const RstHeaderBarbershop = () => {
  const { handleLogout } = useAuth()
  // const { data } = useFetch<iBarber>(QUERY_KEYS.GET_CLIENT, ENDPOINTS.GET_CLIENT)

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
          {optionsUser.map((option, index) => (
            <MenuItem key={index} onClick={option.onClick}>
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton>{/* <RstAvatar name={data?.name} size="sm" color="gray.100" /> */}</MenuButton>
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
