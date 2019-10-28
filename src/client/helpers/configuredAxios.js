import axios from 'axios'
import { getCookie } from 'client/helpers/cookies'

export default (baseURL, type = 'public') => {
  let url = ''
  let headers = {}

  switch (baseURL) {
    case 'user':
      url = 'http://react-ssr-api.herokuapp.com'
      break
    default:
      break
  }

  if (type === 'protected' && getCookie('accessToken')) {
    headers = {
      Authorization: `Bearer ${getCookie('accessToken')}`
    }
  }

  const configuredAxios = axios.create({
    baseURL: url,
    headers: headers
  })

  return configuredAxios
}
