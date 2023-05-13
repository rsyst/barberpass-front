import { Flex, FlexProps } from '@chakra-ui/react'
import React, { useState } from 'react'
import RstText from '../Text'

interface iRadioButtonProps extends FlexProps {
  name?: string
  options: Array<iRadioButtonPropsOptions>
}
interface iRadioButtonPropsOptions {
  label: string
  value: string
  id: string | number
}

export const RstRadioButton = ({ options, ...props }: iRadioButtonProps) => {
  const [selected, setSelected] = useState<string | number>(0)

  const selectedRadio = (item: iRadioButtonPropsOptions) => {
    if (item.id === selected) {
      return { color: 'blue.1000', bg: 'blue.300' }
    }
  }

  const handleSelect = (item: iRadioButtonPropsOptions) => {
    setSelected(item.id)
  }

  return (
    <Flex bg={'blue.200'} p={2} gap={2} borderRadius={16} {...props}>
      {options.map((item) => (
        <Flex
          key={item.id}
          h={10}
          flex={1}
          justifyContent="center"
          alignItems="center"
          borderRadius={8}
          cursor="pointer"
          onClick={() => handleSelect(item)}
          {...selectedRadio(item)}
        >
          <RstText fontVariant="input">{item.label}</RstText>{' '}
        </Flex>
      ))}
    </Flex>
  )
}
