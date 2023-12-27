import axios, { AxiosResponse } from 'axios'

export const api = 'http://localhost:3001/api'
export const apiPost = async (path: string, body: any) => {
  try {
    const response = await axios.post(api + path, body)

    return response
  } catch (err: any) {
    console.log(err.response)
    return err
  }
}
export const secureApiPost = async (path: string, body: any, token: string) => {
  const response = await axios.post(api + path, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response
}
export const secureApiGet = async (path: string, token: string) => {
  const response = await axios.get(api + path, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response
}
