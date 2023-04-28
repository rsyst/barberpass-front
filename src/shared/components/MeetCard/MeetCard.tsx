import {
  Box,
  Divider,
  Grid,
  GridItem,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { FiTrash, FiMoreVertical, FiCalendar, FiSlash } from 'react-icons/fi'
import { iMeet } from 'shared/interface/public'
import {
  iMeetsControllerResponse,
  useMutationMeetsControllerCancel,
  useMutationMeetsControllerInterval
} from 'shared/service/MeetsController'
import MeetCardSchedule from './MeetCardSchedule'

interface iProps {
  item: iMeetsControllerResponse
}

const RstMeetCard = ({ item }: iProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenSchedule, onOpen: onOpenSchedule, onClose: onCloseSchedule } = useDisclosure()

  const { mutate: cancelTime } = useMutationMeetsControllerCancel({ meet_id: item.id })
  const { mutate: patchInterval } = useMutationMeetsControllerInterval({ meet_id: item.id })

  const toast = useToast()

  const handleOpenAndClose = () => {
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }

  const handleCancelTime = () => {
    cancelTime(undefined, {
      onSuccess: () => {
        toast({
          title: 'Horário cancelado',
          description: 'Este horário foi cancelado com sucesso',
          status: 'success'
        })
        onClose()
      },
      onError: () => {
        toast({
          title: 'Erro ao cancelar horário',
          description: 'Ocorreu um erro ao cancelar este horário',
          status: 'error'
        })
      }
    })
  }

  const handleIntervalTime = () => {
    patchInterval(undefined, {
      onSuccess: () => {
        toast({
          title: 'Intervalo agendado',
          description: 'Este horário foi agendado como intervalo'
        })
        onClose()
      },
      onError: () => {
        toast({
          title: 'Erro ao agendar intervalo',
          description: 'Ocorreu um erro ao agendar este horário como intervalo',
          status: 'error'
        })
      }
    })
  }

  const selectColor = (meet: iMeet) => {
    if (meet.title === 'Intervalo') {
      return 'break'
    } else if (meet.client_id) {
      return 'whatsapp'
    } else {
      return 'gray'
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors: any = {
    whatsapp: { bg: 'whatsapp.500', boxShadow: 'green' },
    instagram: { bg: 'instagram.500', boxShadow: 'green' },
    gray: { bg: 'gray.500', boxShadow: 'gray' },
    break: { bg: 'yellow.500', boxShadow: 'gray' }
  }

  return (
    <Grid w="100%" gap={2} onClick={handleOpenAndClose}>
      <GridItem p={4} {...colors[selectColor(item)]} borderRadius={16} display="flex">
        <Box>
          <Text color="white" fontSize="3xl" mb={-1} fontWeight="medium">
            {moment(item.start_meet).format('HH:mm')}
          </Text>
          <Text color="white" fontSize="md" fontWeight="light">
            {moment(item.end_meet).format('HH:mm')}
          </Text>
        </Box>
        <Divider orientation="vertical" mx={4} />
        <Box>
          <Text color="white" fontSize="lg" fontWeight="medium">
            {item.title}
          </Text>
          <Text color="white" fontSize="md" fontWeight="light">
            {item.client?.name}
          </Text>
        </Box>
        <Box ml="auto">
          <Menu>
            <MenuButton as={IconButton} icon={<FiMoreVertical />} colorScheme="blackAlpha" variant="ghost" h="100%" />
            <MenuList>
              <MenuItem
                icon={<FiCalendar />}
                onClick={onOpenSchedule}
                disabled={!item.client_id}
                isDisabled={!!item.client_id}
              >
                Agendar
              </MenuItem>
              <MenuItem
                icon={<FiSlash />}
                onClick={handleIntervalTime}
                disabled={!item.client_id}
                isDisabled={!!item.client_id}
              >
                Marcar como intervalo
              </MenuItem>
              <MenuItem
                icon={<FiTrash />}
                onClick={handleCancelTime}
                disabled={!item.client_id}
                isDisabled={!item.client_id}
              >
                Cancelar
              </MenuItem>
              {/* <MenuItem icon={<FiRepeat />}>Remarcar</MenuItem> */}
            </MenuList>
          </Menu>
        </Box>
      </GridItem>
      <MeetCardSchedule isOpen={isOpenSchedule} onClose={onCloseSchedule} item={item} />
    </Grid>
  )
}

export default RstMeetCard
