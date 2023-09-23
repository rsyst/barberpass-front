import React from 'react'
import RstInput, { iInputProps } from './Input'

const RstInputPhone = ({ onChange, ...props }: iInputProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // Remove all non-numeric characters
    value = value.replace(/\D/g, '')

    if (value.length > 11) return

    // Apply the mask
    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{0,4})(\d{0,4})$/, '($1) $2-$3')
    } else {
      value = value.replace(/^(\d{2})(\d{0,5})(\d{0,4})$/, '($1) $2-$3')
    }

    console.log(value)

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

export default RstInputPhone
