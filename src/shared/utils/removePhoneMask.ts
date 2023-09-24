export const removePhoneMask = (phone: string) => {
  return phone.replace(/\D/g, '')
}
