import apiClient from '../index'

export const getRoutes = async () => {
  return apiClient.get('/route')
};
export const addRoute = async (route: any) => {
  return apiClient.post('/route', route)
};
export const updateRoute = async (route: any) => {
  return apiClient.put('/route', route)
};
export const deleteRoute = async (id: number) => {
  return apiClient.delete('/route/' + id)
};