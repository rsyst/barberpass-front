import { ROLE_TYPES, STATUS_TYPES } from './enuns'

export interface iUser {
  id: string
  name: string
  phoneNumber: string
  passwordHash: string
  role: ROLE_TYPES
  createdAt: Date
  updatedAt?: Date

  barberShops: iBarberShop[]
  barbers: iBarber[]
  clients: iClient[]
}

export interface iBarberShop {
  id: string
  name: string
  email: string
  document: string
  phoneNumber: string
  address: string
  logo?: string
  userId: string
  user: iUser
  createdAt: Date
  updatedAt?: Date
  barbers: iBarber[]
  products: iProduct[]
}

export interface iBarber {
  id: string
  startWork: Date
  endWork: Date
  timePerWork: number
  barberShopId: string
  userId: string
  createdAt: Date
  updatedAt?: Date
  barberShop: iBarberShop
  user: iUser
  appointments: iAppointment[]
  services: iService[]
}

export interface iAppointment {
  id: string
  start: Date
  end: Date
  serviceId?: string
  barberId: string
  clientId?: string
  statusId: string
  name?: string
  phoneNumber?: string
  price?: number
  index: number
  groupIndex?: string
  createdAt: Date
  updatedAt?: Date
  service?: iService
  barber: iBarber
  client?: iClient
  status: iStatus
}

export interface iClient {
  id: string
  userId: string
  user: iUser
  createdAt: Date
  updatedAt?: Date
  appointments: iAppointment[]
}

export interface iService {
  id: string
  name: string
  price: number
  workAmount: number
  barberId: string
  barber: iBarber
  appointments: iAppointment[]
}

export interface iStatus {
  id: string
  key: STATUS_TYPES
  pt: string
  appointments: iAppointment[]
}

export interface iProduct {
  id: string
  name: string
  price: number
  quantity: number
  barberShopId: string
  barberShop: iBarberShop
  createdAt: Date
  updatedAt?: Date
}
