const ENDPOINTS_AUTH = {
  POST_AUTH: 'auth/'
}

const ENDPOINTS_CLIENT = {
  GET_CLIENT: 'client/',
  GET_CLIENT_APPOINTMENTS: 'client/appointments',
  GET_CLIENT_APPOINTMENTS_BY_ID: (id: string) => `client/appointments/${id}`
}

const ENDPOINTS_BARBER = {
  GET_BARBER: 'barber/',
  PUT_BARBER: 'barber/',
  GET_BARBER_APPOINTMENTS: 'barber/appointments',
  GET_BARBER_APPOINTMENTS_BY_ID: (id: string) => `barber/appointments/${id}`,
  PUT_BARBER_APPOINTMENTS_BY_ID_OCCUPIED: (id: string) => `barber/appointments/${id}/occupied`,
  PUT_BARBER_APPOINTMENTS_BY_ID_EMPTY: (id: string) => `barber/appointments/${id}/empty`,
  PATCH_BARBER_APPOINTMENTS_BY_ID_CONFIRMED: (id: string) => `barber/appointments/${id}/confirmed`,
  PATCH_BARBER_APPOINTMENTS_BY_ID_BREAK: (id: string) => `barber/appointments/${id}/break`,
  GET_BARBER_SERVICES: 'barber/services',
  POST_BARBER_SERVICE: 'barber/service',
  PUT_BARBER_SERVICES_BY_ID: (id: string) => `barber/services/${id}`,
  DELETE_BARBER_SERVICES_BY_ID: (id: string) => `barber/services/${id}`
}

const ENDPOINTS_BARBER_SHOP = {
  GET_BARBER_SHOP: 'barber-shop/',
  GET_BARBER_SHOP_BARBERS: 'barber-shop/barbers',
  GET_BARBER_SHOP_BARBERS_BY_ID: (id: string) => `barber-shop/barbers/${id}`
}

export const ENDPOINTS = {
  ...ENDPOINTS_AUTH,
  ...ENDPOINTS_BARBER_SHOP,
  ...ENDPOINTS_BARBER,
  ...ENDPOINTS_CLIENT
}