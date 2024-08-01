import { ROLE_TYPES } from '@shared/interfaces'
import { usePost } from './use-queries'

export interface iAuthenticatesBarbersOwnersAndClientsPayload {
  phoneNumber: string
  password: string
}

export interface iAuthenticatesBarbersOwnersAndClientsResponse {
  token: string
  role: ROLE_TYPES
}

export const useMutationAuthenticatesBarbersOwnersAndClients = () =>
  usePost<iAuthenticatesBarbersOwnersAndClientsPayload, iAuthenticatesBarbersOwnersAndClientsResponse>(
    'users/authenticate'
  )
