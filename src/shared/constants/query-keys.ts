const QUERY_KEYS_CLIENT = {
  GET_CLIENT: ['get_client'],
  GET_CLIENT_APPOINTMENTS: ['get_client_appointments'],
  GET_CLIENT_APPOINTMENTS_BY_ID: (id: string) => ['get_client_appointments_by_id', id]
}
const QUERY_KEYS_BARBER = {
  GET_BARBER: ['get_barber'],
  GET_BARBER_APPOINTMENTS: ['get_barber_appointments'],
  GET_BARBER_APPOINTMENTS_BY_ID: (id: string) => ['get_barber_appointments_by_id', id],
  GET_BARBER_SERVICES: ['get_barber_services']
}
const QUERY_KEYS_BARBER_SHOP = {
  GET_BARBER_SHOP: ['get_barber_shop'],
  GET_BARBER_SHOP_BARBERS: ['get_barber_shop_barbers'],
  GET_BARBER_SHOP_BARBERS_BY_ID: (id: string) => ['get_barber_shop_barbers_by_id', id]
}

export const QUERY_KEYS = { ...QUERY_KEYS_CLIENT, ...QUERY_KEYS_BARBER_SHOP, ...QUERY_KEYS_BARBER }
