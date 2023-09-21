import { COOKIES_NAMES } from '@shared/constants/cookie-names'
import { API_URL_BASE } from '@shared/constants/environment'
import axios from 'axios'
import Router from 'next/router'

import { destroyCookie, parseCookies } from 'nookies'

const URL_TYPES = {
  BARBER: 'barber',
  CLIENT: 'client'
}

const logout = (type: string) => {
  if (!Object.values(URL_TYPES).includes(type)) {
    return
  }

  const cookieName = URL_TYPES.BARBER === type ? COOKIES_NAMES.BARBER_TOKEN : COOKIES_NAMES.CLIENT_TOKEN
  const router = '/'

  destroyCookie(undefined, cookieName, {
    path: '/'
  })
  Router.push(router)
}

const getUrlType = (url: string) => {
  const urlIsBarber = url.startsWith('barber') || url.startsWith('barber')
  const urlIsClient = url.startsWith('client') || url.startsWith('client')

  if (urlIsBarber) {
    return URL_TYPES.BARBER
  }

  if (urlIsClient) {
    return URL_TYPES.CLIENT
  }
}

const api = axios.create({
  baseURL: API_URL_BASE,
  headers: { 'Content-type': 'application/json; charset=UTF-8' }
})

api.interceptors.request.use(
  (config: any) => {
    const { [COOKIES_NAMES.CLIENT_TOKEN]: clientToken, [COOKIES_NAMES.BARBER_TOKEN]: barberToken } = parseCookies()

    const type = getUrlType(config.url || '')

    if (URL_TYPES.CLIENT === type && clientToken) {
      config.headers.Authorization = `Bearer ${clientToken}`
    }
    if (URL_TYPES.BARBER === type && barberToken) {
      config.headers.Authorization = `Bearer ${barberToken}`
    }

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
    const urlComplete = error.request.responseURL

    const url = urlComplete.replace(API_URL_BASE, '')

    const type = getUrlType(url) || ''

    if (message === 'Unauthorized.' || statusCode === 401) {
      logout(type)
    }

    return Promise.reject(error)
  }
)

export default api
