import { Button, ButtonProps } from '@chakra-ui/react'
import React, { useMemo } from 'react'

interface iRstButtonProps extends ButtonProps {
  href?: string
}

export const RstButton = ({ colorScheme = 'blue', variant = 'solid', ...props }: iRstButtonProps) => {
  const variantStyle = useMemo(() => {
    if (variant === 'solid') {
      return {
        color: `${colorScheme}.1100`,
        bg: `${colorScheme}.500`,
        _hover: { bg: `${colorScheme}.600` },
        _active: { bg: `${colorScheme}.00` }
      }
    } else if (variant === 'link') {
      return { color: `${colorScheme}.1000` }
    }
  }, [colorScheme, variant])

  return <Button borderRadius={16} {...variantStyle} variant={variant} colorScheme={colorScheme} {...props} />
}
