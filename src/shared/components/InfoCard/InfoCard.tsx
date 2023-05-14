import { Flex } from '@chakra-ui/react'
import React from 'react'
import RstBadge from '../Badge'
import { iRstBadgeProps } from '../Badge/Badge'
import RstText from '../Text'

interface iRstInfoCardProps {
  title: string
  value: string
  badge: iRstBadgeProps
}

export const RstInfoCard = ({ title, value, badge }: iRstInfoCardProps) => {
  return (
    <Flex flexDir="column" p={4} bg="gray.100" borderRadius={16} gap={2}>
      <RstText fontVariant="body1" color="gray.1100">
        {title}
      </RstText>
      <RstText fontVariant="h3" color="gray.1200">
        {value}
      </RstText>
      <RstBadge {...badge} />
    </Flex>
  )
}
