import { rstApi } from './api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { iClient, iEmploye, iMeet } from 'shared/interface/public'

export interface iMeetsControllerResponse extends iMeet {
  client: iClient
  employe: iEmploye
}

interface iMeetsControllerShowParams {
  date?: string
  employe?: string
}

export const useQueryMeetsControllerShow = (params: iMeetsControllerShowParams) =>
  useQuery<iMeetsControllerResponse[]>([`MeetsController-${params.date}-${params.employe}`], () =>
    rstApi({
      url: 'https://agendamentos2.herokuapp.com/meets/',
      method: 'GET',
      params: params
    })
  )

useQueryMeetsControllerShow.queryKey = (params: iMeetsControllerShowParams) => [
  `MeetsController-${params.date}-${params.employe}`
]

export const useMutationMeetsControllerCancel = ({ meet_id }: { meet_id: string }) =>
  useMutation(() => {
    return rstApi({
      url: 'https://agendamentos2.herokuapp.com/meets/' + meet_id + '/cancel/',
      method: 'PATCH'
    })
  })

interface iMeetsControllerUpdatePayload {
  phone_number: string
}

export const useMutationMeetsControllerUpdate = ({ meet_id }: { meet_id: string }) =>
  useMutation((payload: iMeetsControllerUpdatePayload) => {
    return rstApi({
      url: 'https://agendamentos2.herokuapp.com/meets/' + meet_id + '/',
      method: 'PATCH',
      payload: payload
    })
  })

export const useMutationMeetsControllerInterval = ({ meet_id }: { meet_id: string }) =>
  useMutation(() => {
    return rstApi({
      url: 'https://agendamentos2.herokuapp.com/meets/' + meet_id + '/interval/',
      method: 'PATCH'
    })
  })
