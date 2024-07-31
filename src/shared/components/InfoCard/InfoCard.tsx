import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'
import RstBadge from '../Badge'
import { iRstBadgeProps } from '../Badge/Badge'
import RstText from '../Text'

interface iRstInfoCardProps extends FlexProps {
  title: string
  value: string | number
  badge: iRstBadgeProps
}

export const RstInfoCard = ({ title, value, badge, ...props }: iRstInfoCardProps) => {
  return (
    <Flex flexDir="column" p={4} bg="gray.100" borderRadius={16} gap={2} {...props}>
      <RstText fontVariant="body1" color="gray.1100" w="max-content">
        {title}
      </RstText>
      <RstText fontVariant="h3" color="gray.1200">
        {value}
      </RstText>
      <RstBadge {...badge} />
    </Flex>
  )
}
