import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/emps`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
export const updateUser = (user: any) => {
  return axios.put(`${BASE_URL}/emps/${user.id}`, user);
};

export const deleteUser = (id: number) => {
  return axios.delete(`${BASE_URL}/emps/${id}`);
};
export const addUser = (user: any) => {
  return axios.post(`${BASE_URL}/emps`, user);
};

