import axios from 'axios';
import { handleRequest } from '../utils/apiHelper';
import {URL} from '@/config/config'

export const BASE_URL = URL;
// 手动登录
export const userLogin = async (user: any) => {
  return await handleRequest(() =>
    axios.post(`${BASE_URL}/login`, user));
};
// token登录
export const userLoginBytoken = async (token: string) => {
  return await handleRequest(() => 
    axios.post(`${BASE_URL}/login/auto-login`, null, {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    })
  );
};



