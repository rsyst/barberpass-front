/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */

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
  headers?: HeadersInit
  /** Rewrite all header information */
  newHeader?: HeadersInit
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

export async function rstApi({ url, method, payload, headers, newHeader }: iRstApi) {
  const convertedUrl = 'api/' + url
  return (
    fetch(convertedUrl, {
      method,
      // params,
      body: JSON.stringify(payload),
      // baseURL: 'http://' + process.env.NEXT_PUBLIC_VERCEL_URL + '/api',
      headers: newHeader
        ? newHeader
        : {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            ...headers
          }
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(function (response: any) {
        if (response.status >= 200 && response.status < 300) return response.body
        else throw response
      })
      .catch(function (error: iError) {
        console.log({ error })
        throw error
      })
  )
}
