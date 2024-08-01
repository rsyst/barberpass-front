import React from 'react'
import { RstInput, iInputProps } from './Input'
import { phoneMask } from '@shared/utils/phoneMask'

export const RstInputPhone = ({ onChange, ...props }: iInputProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // Remove all non-numeric characters
    value = value.replace(/\D/g, '')

    if (value.length > 11) return

    value = phoneMask(value)

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
