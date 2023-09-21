import { rstApi } from './api'
import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query'

export type iEmployesControllerResponse = any

export const useQueryEmployesController = (config?: QueryOptions<iEmployesControllerResponse[]>) =>
  useQuery<iEmployesControllerResponse[]>(
    ['EmployesController'],
    () =>
      rstApi({
        url: 'https://agendamentos2.herokuapp.com/employes/',
        method: 'GET'
      }),
    config
  )

useQueryEmployesController.querykey = ['EmployesController']

export const useQueryEmployesControllerShow = ({ employe_id }: { employe_id: string }) =>
  useQuery<iEmployesControllerResponse>(['EmployesController'], () =>
    rstApi({
      url: 'https://agendamentos2.herokuapp.com/employes/' + employe_id + '/',
      method: 'GET'
    })
  )

useQueryEmployesControllerShow.querykey = ({ employe_id }: { employe_id: string }) => [
  'EmployesControllerShow' + employe_id
]

interface iEmployesControllerUpdatePayload {
  name: string
  email: string
  start_time: string
  end_time: string
  time_per_work: string
}

export const useMutationEmployesControllerUpdate = ({ employe_id }: { employe_id: string }) =>
  useMutation((payload: iEmployesControllerUpdatePayload) => {
    return rstApi({
      url: 'https://agendamentos2.herokuapp.com/employes/' + employe_id + '/',
      method: 'PUT',
      payload: payload
    })
  })
