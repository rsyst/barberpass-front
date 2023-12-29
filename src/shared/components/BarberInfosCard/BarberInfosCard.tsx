import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'
import { iBarber } from '@shared/interface/public'
import { FiMoreVertical } from 'react-icons/fi'
import { RstAlertDelete } from '../AlertDelete'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { useQueryClient } from '@tanstack/react-query'
import RstFormBarber from '../FormBarber'
import { useDelete } from '@shared/service/use-queries'

export type iRstBarberInfosCard = iBarber

export const RstBarberInfosCard = ({ ...barber }: iRstBarberInfosCard) => {
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()

  const { mutate, isLoading } = useDelete(ENDPOINTS.DELETE_BARBER_SERVICES_BY_ID(barber.id))

  const queryClient = useQueryClient()
  const toast = useToast()

  const handleDelete = () => {
    mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_SERVICES)
        toast({
          title: 'Serviço deletado com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        onCloseDelete()
      }
    })
  }

  const options = [
    {
      label: 'Editar',
      value: 'EDIT',
      onClick: onOpenEdit
    },
    {
      label: 'Deletar',
      value: 'DELETE',
      onClick: onOpenDelete
    }
  ]

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" p={6} bg="gray.200" borderRadius={16} shadow="md">
        <Flex flexDir="column">
          <Text fontWeight="600">{barber.name}</Text>
          <Text fontSize={14}>{barber.email}</Text>
        </Flex>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FiMoreVertical />}
            variant="ghost"
            color="black"
            colorScheme="gray"
          />
          <MenuList>
            {options.map((option, index) => (
              <MenuItem key={index} onClick={option.onClick}>
                {option.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      {isOpenDelete && (
        <RstAlertDelete
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          onSubmit={handleDelete}
          isLoading={isLoading}
          title="Deletar serviço"
          label="Você tem certeza que deseja deletar este serviço?"
        />
      )}
      {isOpenEdit && <RstFormBarber isOpen={isOpenEdit} onClose={onCloseEdit} barber={barber} />}
    </>
  )
}
