import { Badge, BadgeProps } from '@chakra-ui/react'
import React from 'react'

export type iRstBadgeProps = BadgeProps

export const RstBadge = ({ ...props }: iRstBadgeProps) => {
  const defaultStyle: iRstBadgeProps = {
    borderRadius: 8,
    bg: `${props?.colorScheme}.300`,
    w: 'max-content',
    fontWeight: 'regular',
    py: 1,
    px: 2,
    textTransform: 'initial'
  }
  return <Badge {...defaultStyle} {...props} />
}
