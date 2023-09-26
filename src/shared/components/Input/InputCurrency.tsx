import React from 'react'
import RstInput, { iInputProps } from './Input'
import { currencyMask } from '@shared/utils/currencyMask'

const RstInputCurrency = ({ onChange, ...props }: iInputProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // Remove all non-numeric characters
    value = value.replace(/\D/g, '')

    // Apply currency mask
    value = currencyMask(value)

    onChange &&
      onChange({
        ...e,
        target: {
          ...e.target,
          value: value
        }
      } as React.ChangeEvent<HTMLInputElement>)
  }

  return <RstInput {...props} onChange={handlePhoneChange} />
}

export default RstInputCurrency
