import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
// 手动登录
export const userLogin = async (user: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`,user);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
// token登录
export const userLoginBytoken = async (token: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/login/auto-login`,token,{params: { token }});
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };