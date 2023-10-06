const QUERY_KEYS_CLIENT = {
  GET_CLIENT: ['get_client'],
  GET_CLIENT_BARBERSHOPS: ['get_client_barbershop'],
  GET_CLIENT_BARBERSHOPS_BY_ID_BARBERS: (id: string) => ['get_client_by_barbershop_id_barbers', id],
  GET_CLIENT_BARBERS_BY_ID_SERVICES: (id: string) => ['get_client_barbers_by_id_services', id],
  GET_CLIENT_BARBERS_BY_BARBERID_SERVICES_BY_SERVICEID_APPOINTMENTS_BY_DATE: (
    barberId: string,
    serviceId: string,
    date: string
  ) => ['get_client_barbers_by_barberid_services_by_serviceid_appointments', barberId, serviceId, date],
  GET_CLIENT_APPOINTMENTS: ['get_client_appointments'],
  GET_CLIENT_APPOINTMENTS_BY_ID: (id: string) => ['get_client_appointments_by_id', id]
}
const QUERY_KEYS_BARBER = {
  GET_BARBER: ['get_barber'],
  GET_BARBER_DASHBOARD: ['get_barber_dashboard'],
  GET_BARBER_APPOINTMENTS: ['get_barber_appointments'],
  GET_BARBER_APPOINTMENTS_NEXT: ['get_barber_appointments_next'],
  GET_BARBER_APPOINTMENTS_DAY: ['get_barber_appointments_day'],
  GET_BARBER_APPOINTMENTS_DAY_BY_DATE: (date: string) => ['get_barber_appointments_day', date],
  GET_BARBER_APPOINTMENTS_WEEK: ['get_barber_appointments_week'],
  GET_BARBER_APPOINTMENTS_BY_ID: (id: string) => ['get_barber_appointments_by_id', id],
  GET_BARBER_SERVICES: ['get_barber_services']
}
const QUERY_KEYS_BARBER_SHOP = {
  GET_BARBER_SHOP: ['get_barber_shop'],
  GET_BARBER_SHOP_BARBERS: ['get_barber_shop_barbers'],
  GET_BARBER_SHOP_BARBERS_BY_ID: (id: string) => ['get_barber_shop_barbers_by_id', id]
}

export const QUERY_KEYS = { ...QUERY_KEYS_CLIENT, ...QUERY_KEYS_BARBER_SHOP, ...QUERY_KEYS_BARBER }
