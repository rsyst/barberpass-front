export const paramsToQuery = (params: { [x: string]: string | number | boolean }) => {
  return Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}
