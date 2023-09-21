import { Box, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface iProps {
  title: string
  children: React.ReactNode
}

export const RstAccordion = ({ title, children }: iProps) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Flex flexDir="column" gap={2}>
      <Box
        p={6}
        bg="white"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderRadius={16}
        onClick={onToggle}
      >
        <Text fontWeight="600">{title}</Text>
        {isOpen ? (
          <Icon as={FiChevronUp} color="gray" fontSize={20} />
        ) : (
          <Icon as={FiChevronDown} color="gray" fontSize={20} />
        )}
      </Box>
      {isOpen && (
        <Box p={2} bg="white" borderRadius={16} overflow="visible">
          {children}
        </Box>
      )}
    </Flex>
  )
}
