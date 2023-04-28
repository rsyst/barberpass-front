/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios').default

interface iRstApi {
  url: string
  method?: string
  params?: Object
  /** Expected payload on requisition
   * ```
   * rstApi(...{payload: {name:"teste"})
   * ```
   */
  payload?: Object
  headers?: Object
  /** Rewrite all header information */
  newHeader?: Object
}

interface iResponse {
  data: Object
  status: number
  statusText: string
  headers: Object
  config: Object
}

interface iError {
  response: iResponse
}

export async function rstApi({ url, method, payload, params, headers, newHeader }: iRstApi) {
  return axios({
    url,
    method,
    params,
    data: payload,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: newHeader
      ? newHeader
      : {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          ...headers
        }
  })
    .then(function (response: iResponse) {
      if (response.status >= 200 && response.status < 300) return response.data
    })
    .catch(function (error: iError) {
      throw error.response.data
    })
}
