import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { iService } from '@shared/interface/public'
import { FiMoreVertical } from 'react-icons/fi'
import RstFormService from '../FormService'
import { RstAlertDelete } from '../AlertDelete'
import { useDelete } from '@shared/service/use-queries'
import { ENDPOINTS, QUERY_KEYS } from '@shared/constants'
import { useQueryClient } from '@tanstack/react-query'

export type iRstServiceCardBarber = iService

export const RstServiceCardBarber = ({ ...service }: iRstServiceCardBarber) => {
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()

  const { mutate, isLoading } = useDelete(ENDPOINTS.DELETE_BARBER_SERVICE_BY_ID(service.id))

  const queryClient = useQueryClient()

  const handleDelete = () => {
    mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.GET_BARBER_SERVICES)
      }
    })
    onCloseDelete()
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
          <Text fontWeight="600">{service.name}</Text>
          <Text fontSize={14}>{service.price},00 Reais</Text>
          <Text fontSize={14}>{service.workAmount} horario(s)</Text>
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
      {isOpenEdit && <RstFormService isOpen={isOpenEdit} onClose={onCloseEdit} service={service} />}
    </>
  )
}
