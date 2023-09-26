export const currencyMask = (value: string) => {
  value = value.replace(/\D/g, '') // Remove tudo o que não é dígito
  //Adiciona R$ no começo
  value = value.replace(/^/, 'R$ ')
  value = value.replace(/(\d)(\d{2})$/, '$1,$2') // Coloca vírgula entre o penúltimo e o último dígitos
  return value
}

export const removeCurrencyMask = (value: string) => {
  return value.replace(/\D/g, '')
}

export const currencyToNumber = (value: string) => {
  return Number(value.replace(/\D/g, '')) / 100
}

export const floatToCurrency = (value: number) => {
  return currencyMask(value.toFixed(2))
}
