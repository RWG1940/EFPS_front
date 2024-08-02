import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
// 注册用户
export const regUser = async (user: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/reg`, user);
      return response.data
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };