import { iAppointment, iBarber, iService, iUser } from '@shared/interfaces'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from './api'

export interface iGetAuthenticatesBarberProfileResponse {
  data: iBarber & {
    user: iUser
    userId: string
  }
}
export interface iGetAuthenticatedBarberDashboardResponse {
  data: {
    dailyAmount: number
    dailyAppointments: number
    dailyConfirmedAppointments: number
  }
}
export interface iGetAllAuthenticatedBarberAppointmentsResponse {
  data: iAppointment[]
}
export interface iGetAllAuthenticatedBarberTodayAppointmentsResponse {
  data: iAppointment[]
}
export interface iGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDayResponse {
  data: iAppointment[]
}
export interface iGetAllAuthenticatedBarberWeekAppointmentsResponse {
  data: iAppointment[]
}
export interface iGetAllAuthenticatedBarberMonthAppointmentsResponse {
  data: iAppointment[]
}
export interface iGetAllAuthenticatedBarberServicesResponse {
  data: iService[]
}

export interface iUpdateAuthenticadetBarberProfilePayload {
  name: string
  password: string
  phoneNumber: string
  timePerWork: number
  startWork: string
  endWork: string
}

export interface iUpdateAuthenticadetBarberProfileResponse {
  data: {
    name: string
    password: string
    phoneNumber: string
    timePerWork: number
    startWork: string
    endWork: string
  }
}

export interface iBarberScheduleAnAppointmentPayload {
  name: string
  phoneNumber: string
  price: number
  serviceId: string
}

export interface iBarberScheduleAnAppointmentResponse {
  data: iAppointment
}
type iBarberUnscheduleAnAppointmentPayload = null

export interface iBarberUnscheduleAnAppointmentResponse {
  data: iAppointment
}

type iBarberScheduleABreakAppointmentPayload = null

export interface iBarberScheduleABreakAppointmentResponse {
  data: iAppointment
}

export interface iBarberConfirmAnScheduleAppointmentPayload {
  price: number
}

export interface iBarberConfirmAnScheduleAppointmentResponse {
  data: iAppointment
}

export interface iBarberUpdateAServiceByIdPayload {
  name: string
  price: number
  workAmount: number
}

export interface iBarberUpdateAServiceByIdResponse {
  data: iService
}
//PUT /barbers/
const mutationUpdateAuthenticadetBarberProfile = (data: iUpdateAuthenticadetBarberProfilePayload) =>
  api.put<iUpdateAuthenticadetBarberProfilePayload, iUpdateAuthenticadetBarberProfileResponse>('barbers/', data)
export const useMutationUpdateAuthenticadetBarberProfile = () =>
  useMutation<iUpdateAuthenticadetBarberProfileResponse, any, iUpdateAuthenticadetBarberProfilePayload>({
    mutationFn: mutationUpdateAuthenticadetBarberProfile
  })

//PUT /barbers/appointments/{appointmentId}/schedule
const mutationBarberScheduleAnAppointment = (
  { appointmentId }: { appointmentId: string },
  data: iBarberScheduleAnAppointmentPayload
) =>
  api.put<iBarberScheduleAnAppointmentPayload, iBarberScheduleAnAppointmentResponse>(
    `barbers/appointments/${appointmentId}/schedule`,
    data
  )
export const useMutationBarberScheduleAnAppointment = ({ appointmentId }: { appointmentId: string }) =>
  useMutation<iBarberScheduleAnAppointmentResponse, any, iBarberScheduleAnAppointmentPayload>({
    mutationFn: (data) => mutationBarberScheduleAnAppointment({ appointmentId }, data)
  })

//PUT /barbers/appointments/{groupIndex}/unschedule
const mutationBarberUnscheduleAnAppointment = (
  { groupIndex }: { groupIndex: string },
  data: iBarberUnscheduleAnAppointmentPayload
) =>
  api.put<iBarberUnscheduleAnAppointmentPayload, iBarberUnscheduleAnAppointmentResponse>(
    `barbers/appointments/${groupIndex}/unschedule`,
    data
  )
export const useMutationBarberUnscheduleAnAppointment = ({ groupIndex }: { groupIndex: string }) =>
  useMutation<iBarberUnscheduleAnAppointmentResponse, any, iBarberUnscheduleAnAppointmentPayload>({
    mutationFn: (data) => mutationBarberUnscheduleAnAppointment({ groupIndex }, data)
  })

//PUT /barbers/appointments/{groupIndex}/break
const mutationBarberScheduleABreakAppointment = (
  { appointmentId }: { appointmentId: string },
  data: iBarberScheduleABreakAppointmentPayload
) =>
  api.put<iBarberScheduleABreakAppointmentPayload, iBarberScheduleABreakAppointmentResponse>(
    `barbers/appointments/${appointmentId}/break`,
    data
  )
export const useMutationBarberScheduleABreakAppointment = ({ appointmentId }: { appointmentId: string }) =>
  useMutation<iBarberScheduleABreakAppointmentResponse, any, iBarberScheduleABreakAppointmentPayload>({
    mutationFn: (data) => mutationBarberScheduleABreakAppointment({ appointmentId }, data)
  })

//PUT /barbers/appointments/{groupIndex}/confirm
const mutationBarberConfirmAnScheduleAppointment = (
  { appointmentId }: { appointmentId: string },
  data: iBarberConfirmAnScheduleAppointmentPayload
) =>
  api.put<iBarberConfirmAnScheduleAppointmentPayload, iBarberConfirmAnScheduleAppointmentResponse>(
    `barbers/appointments/${appointmentId}/confirm`,
    data
  )
export const useMutationBarberConfirmAnScheduleAppointment = ({ appointmentId }: { appointmentId: string }) =>
  useMutation<iBarberConfirmAnScheduleAppointmentResponse, any, iBarberConfirmAnScheduleAppointmentPayload>({
    mutationFn: (data) => mutationBarberConfirmAnScheduleAppointment({ appointmentId }, data)
  })

//PUT /barbers/services/{serviceId}
const mutationBarberUpdateAServiceById = (
  { serviceId }: { serviceId: string },
  data: iBarberUpdateAServiceByIdPayload
) => api.put<iBarberUpdateAServiceByIdPayload, iBarberUpdateAServiceByIdResponse>(`barbers/services/${serviceId}`, data)
export const useMutationBarberUpdateAServiceById = ({ serviceId }: { serviceId: string }) =>
  useMutation<iBarberUpdateAServiceByIdResponse, any, iBarberUpdateAServiceByIdPayload>({
    mutationFn: (data) => mutationBarberUpdateAServiceById({ serviceId }, data)
  })

//DELETE /barbers/services/{serviceId}
const mutationBarberDeleteAServiceById = ({ serviceId }: { serviceId: string }) =>
  api.delete(`barbers/services/${serviceId}`)
export const useMutationBarberDeleteAServiceById = () =>
  useMutation({
    mutationFn: mutationBarberDeleteAServiceById
  })

//-------GET---------//

export const queryGetAuthenticatesBarberProfile = () => api.get('barbers/')
export const queryGetAuthenticatesBarberProfileKey = 'barbers'
export const useQueryGetAuthenticatesBarberProfile = () =>
  useQuery({
    queryKey: [queryGetAuthenticatesBarberProfileKey],
    queryFn: queryGetAuthenticatesBarberProfile,
    select: (data: iGetAuthenticatesBarberProfileResponse) => data.data
  })

export const queryGetAuthenticatedBarberDashboard = () => api.get('barbers/dashboard')
export const queryGetAuthenticatedBarberDashboardKey = 'barbers-dashboard'
export const useQueryGetAuthenticatedBarberDashboard = () =>
  useQuery({
    queryKey: [queryGetAuthenticatedBarberDashboardKey],
    queryFn: queryGetAuthenticatedBarberDashboard,
    select: (data: iGetAuthenticatedBarberDashboardResponse) => data.data
  })

export const queryGetAllAuthenticatedBarberAppointments = () => api.get('barbers/appointments')
export const queryGetAllAuthenticatedBarberAppointmentsKey = 'barbers-appointments'
export const useQueryGetAllAuthenticatedBarberAppointments = () =>
  useQuery({
    queryKey: [queryGetAllAuthenticatedBarberAppointmentsKey],
    queryFn: queryGetAllAuthenticatedBarberAppointments,
    select: (data: iGetAllAuthenticatedBarberAppointmentsResponse) => data.data
  })

export const queryGetAllAuthenticatedBarberTodayAppointments = () => api.get('barbers/appointments/day')
export const queryGetAllAuthenticatedBarberTodayAppointmentsKey = 'barbers-appointments-day'
export const useQueryGetAllAuthenticatedBarberTodayAppointments = () =>
  useQuery({
    queryKey: [queryGetAllAuthenticatedBarberTodayAppointmentsKey],
    queryFn: queryGetAllAuthenticatedBarberTodayAppointments,
    select: (data: iGetAllAuthenticatedBarberTodayAppointmentsResponse) => data.data
  })

export const queryGetAllBarberTodayAppointmentsForASpecificDay = ({ id }: { id: string }) =>
  api.get(`barbers/appointments/day/${id}`)
export const queryGetAllBarberTodayAppointmentsForASpecificDayKey = 'barbers-appointments-day'
export const useQueryGetAllBarberTodayAppointmentsForASpecificDay = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [queryGetAllAuthenticatedBarberTodayAppointmentsKey, id],
    queryFn: queryGetAllAuthenticatedBarberTodayAppointments,
    select: (data: iGetAllAuthenticatedBarberTodayAppointmentsResponse) => data.data
  })

export const queryGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDay = () => api.get('barbers/appointments/next')
export const queryGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDayKey = 'barbers-appointments-next'
export const useQueryGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDay = () =>
  useQuery({
    queryKey: [queryGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDayKey],
    queryFn: queryGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDay,
    select: (data: iGetAllAuthenticatedBarberAppointmentsFromNowToEndOfTheDayResponse) => data.data
  })

export const queryGetAllAuthenticatedBarberWeekAppointments = () => api.get('barbers/appointments/week')
export const queryGetAllAuthenticatedBarberWeekAppointmentsKey = 'barbers-appointments-week'
export const useQueryGetAllAuthenticatedBarberWeekAppointments = () =>
  useQuery({
    queryKey: [queryGetAllAuthenticatedBarberWeekAppointmentsKey],
    queryFn: queryGetAllAuthenticatedBarberWeekAppointments,
    select: (data: iGetAllAuthenticatedBarberWeekAppointmentsResponse) => data.data
  })

export const queryGetAllAuthenticatedBarberMonthAppointments = () => api.get('barbers/appointments/month')
export const queryGetAllAuthenticatedBarberMonthAppointmentsKey = 'barbers-appointments-month'
export const useQueryGetAllAuthenticatedBarberMonthAppointments = () =>
  useQuery({
    queryKey: [queryGetAllAuthenticatedBarberMonthAppointmentsKey],
    queryFn: queryGetAllAuthenticatedBarberMonthAppointments,
    select: (data: iGetAllAuthenticatedBarberMonthAppointmentsResponse) => data.data
  })

export const queryGetAllAuthenticatedBarberServices = () => api.get('barbers/services')
export const queryGetAllAuthenticatedBarberServicesKey = 'barbers-services'
export const useQueryGetAllAuthenticatedBarberServices = () =>
  useQuery({
    queryKey: [queryGetAllAuthenticatedBarberServicesKey],
    queryFn: queryGetAllAuthenticatedBarberServices,
    select: (data: iGetAllAuthenticatedBarberServicesResponse) => data.data
  })
