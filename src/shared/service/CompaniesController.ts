import { rstApi } from './api'
import { useQuery } from '@tanstack/react-query'

type ICompaniesControllerShowResponse = any

export const useQueryCompaniesControllerShow = ({ company_id }: { company_id: string }) =>
  useQuery<ICompaniesControllerShowResponse>(['companiesControllerShow'], () =>
    rstApi({
      url: 'https://agendamentos2.herokuapp.com/companies/' + company_id + '/',
      method: 'GET'
    })
  )

useQueryCompaniesControllerShow.queryKey = ['companiesControllerShow']
