const ENDPOINTS_AUTH = {
  POST_AUTH: 'auth/'
}

const ENDPOINTS_BARBER = {
  GET_BARBER: 'barber/',
  GET_BARBER_APPOINTMENTS: 'barber/appointments/',
  GET_BARBER_APPOINTMENTS_BY_ID: (id: string) => `barber/appointments/${id}`
}

const ENDPOINTS_BARBER_SHOP = {
  GET_BARBER_SHOP: 'barber-shop/',
  GET_BARBER_SHOP_BARBERS: 'barber-shop/barbers/',
  GET_BARBER_SHOP_BARBERS_BY_ID: (id: string) => `barber-shop/barbers/${id}`
}

const ENDPOINTS_CLIENT = {
  GET_CLIENT: 'client/',
  GET_CLIENT_APPOINTMENTS: 'client/appointments/',
  GET_CLIENT_APPOINTMENTS_BY_ID: (id: string) => `client/appointments/${id}`
}

export const ENDPOINTS = {
  ...ENDPOINTS_AUTH,
  ...ENDPOINTS_BARBER_SHOP,
  ...ENDPOINTS_BARBER,
  ...ENDPOINTS_CLIENT
}
