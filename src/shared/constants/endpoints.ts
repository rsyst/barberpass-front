const ENDPOINTS_AUTH = {
  POST_AUTH: 'auth/'
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
  PUT_CLIENT_APPOINTMENTS_BY_ID_OCCUPIED: (id: string) => `client/appointments/${id}/occupied`
}

const ENDPOINTS_BARBER = {
  GET_BARBER: 'barber/',
  PUT_BARBER: 'barber/',
  GET_BARBER_DASHBOARD: 'barber/dashboard',
  GET_BARBER_APPOINTMENTS: 'barber/appointments',
  GET_BARBER_APPOINTMENTS_NEXT: 'barber/appointments/next',
  GET_BARBER_APPOINTMENTS_DAY: 'barber/appointments/day',
  GET_BARBER_APPOINTMENTS_DAY_BY_DATE: (date: string) => `barber/appointments/day/${date}`,
  GET_BARBER_APPOINTMENTS_WEEK: 'barber/appointments/week',
  GET_BARBER_APPOINTMENTS_BY_ID: (id: string) => `barber/appointments/${id}`,
  PUT_BARBER_APPOINTMENTS_BY_ID_OCCUPIED: (id: string) => `barber/appointments/${id}/occupied`,
  PUT_BARBER_APPOINTMENTS_BY_GROUP_INDEX_EMPTY: (groupIndex: string) => `barber/appointments/${groupIndex}/empty`,
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
