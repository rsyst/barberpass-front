import { Box, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface iProps {
  title: string
  isOpen: boolean
  onToggle: () => void
}

export const RstAccordion = ({ title, isOpen, onToggle }: iProps) => {
  return (
    <Box
      p={6}
      bg="white"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius={16}
      onClick={onToggle}
    >
      <Text fontWeight="bold" color="gray.700" fontSize="lg">
        {title}
      </Text>
      {isOpen ? (
        <Icon as={FiChevronUp} color="gray" fontSize={20} />
      ) : (
        <Icon as={FiChevronDown} color="gray" fontSize={20} />
      )}
    </Box>
  )
}
