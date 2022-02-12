import axios from "axios"

const baseUrl = "http://localhost:4000"

const instance = axios.create({
  baseURL: baseUrl,
})

export const getApi = async () => {
  return await instance.get(`${baseUrl}/todo`)
}

export const addTodoAPI = async (content: string) => {
  return await instance.post(`${baseUrl}/todo`)
}

export const deleteApi = async (id: number) => {
  return await instance.delete(`${baseUrl}/todo`, {
    data: {
      id: id,
    },
  })
}

export const patchStatusApi = async (id: number) => {
  return await instance.patch(`${baseUrl}/todo`, {
    id: id,
  })
}

export const patchTextAPI = async ({ id, contents }: any) => {
  console.log(id, contents)
  return await instance.patch(`${baseUrl}/todo`, {
    id,
    contents,
  })
}

export const postLoginAPI = async ({ userId, password }: any) => {
  return await instance.post(`${baseUrl}/user`, {
    userId,
    password,
  })
}

export const loginCheckAPI = async (token: string) => {
  return await instance.post(`${baseUrl}/user`, {
    token: token,
  })
}
