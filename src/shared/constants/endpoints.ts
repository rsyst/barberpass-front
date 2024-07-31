const ENDPOINTS_AUTH = {
  POST_AUTH: 'users/authenticate'
}

const ENDPOINTS_CLIENT = {
  GET_CLIENT: 'client/',
  GET_CLIENT_BARBERSHOPS: 'client/barbershops',
  GET_CLIENT_BARBERSHOPS_BY_ID_BARBERS: (id: string) => `client/barbershops/${id}/barbers`,
  GET_CLIENT_BARBERS_BY_ID_SERVICES: (id: string) => `client/barbers/${id}/services`,
  GET_CLIENT_BARBERS_BY_BARBERID_SERVICES_BY_SERVICEID_APPOINTMENTS_BY_DATE: (
    barberId: string,
    serviceId: string,
    date: string
  ) => `client/barbers/${barberId}/services/${serviceId}/appointments/${date}`,
  GET_CLIENT_APPOINTMENTS: 'client/appointments',
  GET_CLIENT_APPOINTMENTS_BY_ID: (id: string) => `client/appointments/${id}`,
  PUT_CLIENT_APPOINTMENTS_BY_ID_OCCUPIED: (id: string) => `client/appointments/${id}/occupied`,
  PUT_CLIENT_APPOINTMENTS_BY_GROUP_INDEX_EMPTY: (groupIndex: string) => `client/appointments/${groupIndex}/empty`
}

const ENDPOINTS_BARBER = {
  GET_BARBER: 'barbers/',
  PUT_BARBER: 'barbers/',
  GET_BARBER_DASHBOARD: 'barbers/dashboard',
  GET_BARBER_APPOINTMENTS: 'barbers/appointments',
  GET_BARBER_APPOINTMENTS_NEXT: 'barbers/appointments/next',
  GET_BARBER_APPOINTMENTS_DAY: 'barbers/appointments/day',
  GET_BARBER_APPOINTMENTS_DAY_BY_DATE: (date: string) => `barbers/appointments/day/${date}`,
  GET_BARBER_APPOINTMENTS_WEEK: 'barbers/appointments/week',
  GET_BARBER_APPOINTMENTS_BY_ID: (id: string) => `barbers/appointments/${id}`,
  PUT_BARBER_APPOINTMENTS_BY_ID_OCCUPIED: (id: string) => `barbers/appointments/${id}/occupied`,
  PUT_BARBER_APPOINTMENTS_BY_GROUP_INDEX_EMPTY: (groupIndex: string) => `barbers/appointments/${groupIndex}/empty`,
  PATCH_BARBER_APPOINTMENTS_BY_ID_CONFIRMED: (id: string) => `barbers/appointments/${id}/confirmed`,
  PUT_BARBER_APPOINTMENTS_BY_ID_BREAK: (id: string) => `barbers/appointments/${id}/break`,
  GET_BARBER_SERVICES: 'barbers/services',
  POST_BARBER_SERVICE: 'barbers/service',
  PUT_BARBER_SERVICES_BY_ID: (id: string) => `barbers/services/${id}`,
  DELETE_BARBER_SERVICES_BY_ID: (id: string) => `barbers/services/${id}`
}

const ENDPOINTS_BARBER_SHOP = {
  GET_BARBER_SHOP: 'barberShop/',
  GET_BARBER_SHOP_BARBERS: 'barberShop/barbers',
  POST_BARBER_SHOP_BARBERS: 'barberShop/createBarber',
  GET_BARBER_SHOP_BARBERS_BY_ID: (id: string) => `barberShop/barber/${id}`,
  DELETE_BARBER_SHOP_BARBERS_BY_ID: (id: string) => `barberShop/barber/${id}`
}

export const ENDPOINTS = {
  ...ENDPOINTS_AUTH,
  ...ENDPOINTS_BARBER_SHOP,
  ...ENDPOINTS_BARBER,
  ...ENDPOINTS_CLIENT
}
