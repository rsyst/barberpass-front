import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react'
import React from 'react'

interface iProps extends InputProps {
  label?: string
  helperText?: string
  errorMessage?: string
  isError?: boolean
}

const RstInput = ({ label, helperText, errorMessage, isError, ...props }: iProps) => {
  return (
    <FormControl isInvalid={isError}>
      <FormLabel>{label}</FormLabel>
      <Input {...props} />
      {!isError ? (
        <FormHelperText fontSize="xs">{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage fontSize="xs">{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default RstInput
