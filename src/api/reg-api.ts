import axios from 'axios';
import { handleRequest } from '../utils/apiHelper';
import {URL} from '@/config/config'

export const BASE_URL = URL;
// 注册用户
export const regUser = async (user: any) => {
  return await handleRequest(() => 
    axios.post(`${BASE_URL}/reg`, user)
  );
};