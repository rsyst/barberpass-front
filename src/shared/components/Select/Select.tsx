import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Select, SelectProps } from '@chakra-ui/react'
import React from 'react'

interface iProps extends SelectProps {
  label?: string
  helperText?: string | JSX.Element
  errorMessage?: string
  isError?: boolean
}

const RstSelect = ({ label, helperText, errorMessage, isError, ...props }: iProps) => {
  return (
    <FormControl isInvalid={isError} isRequired={props.isRequired}>
      <FormLabel>{label}</FormLabel>
      <Select
        {...props}
        h="54px"
        color="gray.1100"
        borderColor="gray.600"
        fontSize="16px"
        fontWeight="500"
        borderRadius={16}
        _hover={{ borderColor: 'gray.700' }}
        _focus={{ borderColor: 'newBlue.800', borderWidth: '2px' }}
        _placeholder={{ color: 'gray.700' }}
      />
      {!isError ? (
        <FormHelperText fontSize="md">{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage fontSize="md">{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default RstSelect
