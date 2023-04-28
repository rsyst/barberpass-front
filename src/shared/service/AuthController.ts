import { rstApi } from './api'
import { useMutation } from '@tanstack/react-query'
import { iCompany } from 'shared/providers/auth'

export interface IAuthControllerCreatePayload {
  email: string
  password: string
}

export interface iAuthControllerCreateResponse {
  token: string
  company: iCompany
}

export const useMutationAuthControllerCreate = () =>
  useMutation<iAuthControllerCreateResponse, unknown, IAuthControllerCreatePayload>(
    (e: IAuthControllerCreatePayload) => {
      return rstApi({
        url: 'https://agendamentos2.herokuapp.com/auth',
        method: 'post',
        payload: e
      })
    }
  )
