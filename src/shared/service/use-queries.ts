import { paramsToQuery } from '@shared/utils/paramsToQuery'
import api from './api'
import { QueryKey, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type callbacksType = {
  onSuccess?: (res: unknown) => void
  onError?: (err: unknown) => void
  onSettled?: () => void
}

interface iQueryError {
  response: {
    data: {
      message: string
    }
  }
}

export const useFetch = <T>(
  queryKey: QueryKey,
  path: string,
  params?: Record<string, string | number | boolean> | null,
  options?: UseQueryOptions<T>
) => {
  return useQuery<T>(
    queryKey,
    async () => {
      const stringParams = params ? `&${paramsToQuery(params)}` : ''
      const url = `${path}${stringParams}`

      const { data } = await api.get(url)

      return data as T
    },
    options
  )
}

export const usePost = <T = unknown>(path: string, callbacks?: callbacksType) => {
  const mutation = useMutation<AxiosResponse<any, any>, iQueryError, T, unknown>((dataBody: T) => {
    return api.post(path, dataBody)
  }, callbacks)

  return mutation
}

export const usePatch = <T = unknown>(path: string, callbacks?: callbacksType) => {
  const mutation = useMutation<AxiosResponse<any, any>, iQueryError, T, unknown>((dataBody: T) => {
    return api.patch(path, dataBody)
  }, callbacks)

  return mutation
}

export const usePut = <T = unknown>(path: string, callbacks?: callbacksType) => {
  const mutation = useMutation<AxiosResponse<any, any>, iQueryError, T, unknown>((dataBody: T) => {
    return api.put(path, dataBody)
  }, callbacks)

  return mutation
}

export const useDelete = <T = unknown>(path: string, callbacks?: callbacksType) => {
  const mutation = useMutation<AxiosResponse<any, any>, iQueryError, T, unknown>((dataBody: T) => {
    return api.delete(path, {
      data: dataBody
    })
  }, callbacks)

  return mutation
}

export const usePutMulltipart = <T = unknown>(path: string, callbacks?: callbacksType) => {
  const mutation = useMutation((dataBody: T) => {
    return api.put(path, dataBody, { headers: { 'Content-type': 'multipart/form-data' } })
  }, callbacks)

  return mutation
}
