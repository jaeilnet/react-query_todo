import axios, { AxiosResponse } from "axios";

const baseUrl = "http://localhost:4000";

const instance = axios.create({
  baseURL: baseUrl,
});

export const getApi = async (): Promise<AxiosResponse> => {
  return await instance.get(`${baseUrl}/todo`);
};

export const addTodoAPI = async (contents: string): Promise<AxiosResponse> => {
  return await instance.post(`${baseUrl}/todo`, {
    contents: contents,
    status: false,
  });
};
export const deleteAPI = async (id: number): Promise<AxiosResponse> => {
  return await instance.delete(`${baseUrl}/todo/${id}`, {
    data: {
      id: id,
    },
  });
};

export const patchStatusApi = async (id: number): Promise<AxiosResponse> => {
  return await instance.patch(`${baseUrl}/todo`, {
    id: id,
  });
};

export const patchTextAPI = async ({
  id,
  contents,
}: any): Promise<AxiosResponse> => {
  return await instance.patch(`${baseUrl}/todo/${id}`, {
    contents,
  });
};

export const postLoginAPI = async ({
  userId,
  password,
}: any): Promise<AxiosResponse> => {
  return await instance.post(`${baseUrl}/user`, {
    userId,
    password,
  });
};

export const loginCheckAPI = async (token: string): Promise<AxiosResponse> => {
  return await instance.post(`${baseUrl}/user`, {
    token: token,
  });
};
