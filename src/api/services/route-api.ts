import apiClient from '../index'

export const getRoutes = async () => {
  return apiClient.get('/dynamic-route')
};
export const addRoute = async (route: any) => {
  return apiClient.post('/dynamic-route', route)
};
export const updateRoute = async (route: any) => {
  return apiClient.put('/dynamic-route', route)
};
export const deleteRoute = async (id: number) => {
  return apiClient.delete('/dynamic-route/' + id)
};