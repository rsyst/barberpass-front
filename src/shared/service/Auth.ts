import { rstApi } from './api'
import { useMutation } from '@tanstack/react-query'
import { iAuthRequest, iAuthResponse } from '@pages/api/auth'

export const useMutationAuthPost = () =>
  useMutation<iAuthResponse, unknown, iAuthRequest>((payload: iAuthRequest) => mutationAuthPost(payload))

export const mutationAuthPost = (payload: iAuthRequest) =>
  rstApi({
    url: '/auth',
    method: 'post',
    payload: payload
  })
