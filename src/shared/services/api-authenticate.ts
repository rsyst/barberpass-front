import { ROLE_TYPES } from '@shared/interfaces'
import { useMutation } from '@tanstack/react-query'
import api from './api'

export interface iAuthenticatesBarbersOwnersAndClientsPayload {
  phoneNumber: string
  password: string
}

export interface iAuthenticatesBarbersOwnersAndClientsResponse {
  data: { token: string; role: ROLE_TYPES }
}

const mutationAuthenticatesBarbersOwnersAndClients = (data: iAuthenticatesBarbersOwnersAndClientsPayload) =>
  api.post<iAuthenticatesBarbersOwnersAndClientsPayload, iAuthenticatesBarbersOwnersAndClientsResponse>(
    'users/authenticate',
    data
  )

export const useMutationAuthenticatesBarbersOwnersAndClients = () =>
  useMutation<iAuthenticatesBarbersOwnersAndClientsResponse, any, iAuthenticatesBarbersOwnersAndClientsPayload>({
    mutationFn: mutationAuthenticatesBarbersOwnersAndClients
  })
