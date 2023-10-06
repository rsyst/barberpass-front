import { Flex, FlexProps } from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'
import RstText from '../Text'

interface iRadioButtonProps extends FlexProps {
  name?: string
  colorScheme?: string
  options: Array<iRadioButtonPropsOptions>
  onChange: (item: iRadioButtonPropsOptions | FormEvent<HTMLDivElement>) => void
}
interface iRadioButtonPropsOptions {
  label: string
  value: string
  id: string | number
}

export const RstRadioButton = ({ options, onChange, colorScheme = 'newBlue', ...props }: iRadioButtonProps) => {
  const [selected, setSelected] = useState<number>(0)

  const selectedRadio = (index: number) => {
    if (index === selected) {
      return { color: `${colorScheme}.100`, bg: `${colorScheme}.1100` }
    } else {
      return { color: `${colorScheme}.1100`, bg: `${colorScheme}.300` }
    }
  }

  const handleSelect = (index: number) => {
    setSelected(index)
    onChange(options[index])
  }

  return (
    <Flex
      bg={`${colorScheme}.300`}
      p={2}
      gap={2}
      borderRadius={16}
      border="1px solid"
      borderColor="gray.500"
      {...props}
    >
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
