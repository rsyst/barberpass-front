import { COOKIES_NAMES } from '@shared/constants/cookie-names'
import { API_URL_BASE } from '@shared/constants/environment'
import axios from 'axios'
import Router from 'next/router'

import { destroyCookie, parseCookies } from 'nookies'

const logout = () => {
  const router = '/'

  destroyCookie(undefined, COOKIES_NAMES.USER_TOKEN, {
    path: '/'
  })
  Router.push(router)
}

const api = axios.create({
  baseURL: API_URL_BASE,
  headers: { 'Content-type': 'application/json; charset=UTF-8' }
})

api.interceptors.request.use(
  (config: any) => {
    const { [COOKIES_NAMES.USER_TOKEN]: userToken } = parseCookies()

    config.headers.Authorization = `Bearer ${userToken}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    const { message, statusCode } = error.response.data

    if (message === 'Unauthorized.' || statusCode === 401) {
      logout()
    }

    return Promise.reject(error)
  }
)

export default api
