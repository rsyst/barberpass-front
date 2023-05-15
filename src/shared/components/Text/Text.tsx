import { Text, TextProps } from '@chakra-ui/react'
import React from 'react'

interface iRstTextProps extends TextProps {
  fontVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'input'
    | 'body1'
    | 'secondary1'
    | 'body2'
    | 'secondary2'
    | 'caption'
    | 'button'
}

export const RstText = ({ fontVariant = 'body1', ...props }: iRstTextProps) => {
  const fontVariantProps = {
    h1: { fontSize: '64px', fontWeight: '400' } as TextProps,
    h2: { fontSize: '48px', fontWeight: '400' } as TextProps,
    h3: { fontSize: '32px', fontWeight: '600' } as TextProps,
    h4: { fontSize: '20px', fontWeight: '500' } as TextProps,
    h5: { fontSize: '16px', fontWeight: '600' } as TextProps,
    input: { fontSize: '16px', fontWeight: '500' } as TextProps,
    body1: { fontSize: '16px', fontWeight: '400' } as TextProps,
    secondary1: { fontSize: '14px', fontWeight: '400' } as TextProps,
    body2: { fontSize: '14px', fontWeight: '400' } as TextProps,
    secondary2: { fontSize: '10px', fontWeight: '400' } as TextProps,
    caption: { fontSize: '8px', fontWeight: '400' } as TextProps,
    button: { fontSize: '16px', fontWeight: '500' } as TextProps
  }

  return <Text color="12000" {...fontVariantProps[fontVariant]} {...props} />
}
