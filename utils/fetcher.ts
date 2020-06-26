import fetch from 'isomorphic-unfetch'
import logout from './auth/logout'

export default async function (
  url: RequestInfo,
  token: string = ''
): Promise<any> {
  const init: RequestInit = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      token: token 
    }),
    credentials: 'same-origin',
  }
  const response = await fetch(url, init)
  const data = await response.json()
  if (response?.status == 401 && data?.message?.match(/token has expired/)) {
    console.log('caught with expired token')
    logout()
  }
  return data
}
