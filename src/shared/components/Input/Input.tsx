import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react'
import React from 'react'

export interface iInputProps extends InputProps {
  label?: string
  helperText?: string | JSX.Element
  errorMessage?: string
  isError?: boolean
}

const RstInput = ({ label, helperText, errorMessage, isError, ...props }: iInputProps) => {
  return (
    <FormControl isInvalid={isError} isRequired={props.isRequired}>
      <FormLabel>{label}</FormLabel>

      <Input
        {...props}
        h="54px"
        color="gray.1100"
        borderColor="gray.700"
        fontSize="16px"
        fontWeight="500"
        borderRadius={16}
        _hover={{ borderColor: 'gray.800' }}
        _focus={{ borderColor: 'newBlue.800', borderWidth: '2px' }}
        _placeholder={{ color: 'gray.800' }}
      />
      {!isError ? (
        <FormHelperText fontSize={12} color="gray.1000">
          {helperText}
        </FormHelperText>
      ) : (
        <FormErrorMessage fontSize={12}>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default RstInput
