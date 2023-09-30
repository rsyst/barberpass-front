import { Flex, FlexProps } from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'
import RstText from '../Text'

interface iRadioButtonProps extends FlexProps {
  name?: string
  options: Array<iRadioButtonPropsOptions>
  onChange: (item: iRadioButtonPropsOptions | FormEvent<HTMLDivElement>) => void
}
interface iRadioButtonPropsOptions {
  label: string
  value: string
  id: string | number
}

export const RstRadioButton = ({ options, onChange, ...props }: iRadioButtonProps) => {
  const [selected, setSelected] = useState<number>(0)

  const selectedRadio = (index: number) => {
    if (index === selected) {
      return { color: 'newBlue.1000', bg: 'newBlue.300' }
    }
  }

  const handleSelect = (index: number) => {
    setSelected(index)
    onChange(options[index])
  }

  return (
    <Flex bg={'newBlue.200'} p={2} gap={2} borderRadius={16} {...props}>
      {options.map((item, index) => (
        <Flex
          key={item.id}
          h={10}
          flex={1}
          justifyContent="center"
          alignItems="center"
          borderRadius={8}
          cursor="pointer"
          onClick={() => handleSelect(index)}
          {...selectedRadio(index)}
        >
          <RstText fontVariant="input">{item.label}</RstText>{' '}
        </Flex>
      ))}
    </Flex>
  )
}
