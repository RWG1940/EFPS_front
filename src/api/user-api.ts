import axios from 'axios';
import { handleRequest } from '@/utils/apiHelper';
import { URL } from '@/config/config'

export const BASE_URL = URL;

// 配置 Axios 拦截器
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 获取所有用户数据
export const fetchUserData = async () => {
  return await handleRequest(() => axios.get(`${BASE_URL}/emps`));
};

// 获取分页后的用户数据
export const fetchUserDataPages = async (page: number, pageSize: number) => {
  return await handleRequest(() =>
    axios.get(`${BASE_URL}/emps/pages`, {
      params: { page, pageSize }
    }),
  );
};

// 更新用户信息
export const updateUser = async (user: any) => {
  return await handleRequest(() =>
    axios.put(`${BASE_URL}/emps/${user.id}`, user));
};

// 删除用户
export const deleteUser = async (id: number) => {
  return await handleRequest(() =>
    axios.delete(`${BASE_URL}/emps/${id}`));
};

// 添加用户
export const addUser = async (user: any) => {
  return await handleRequest(() =>
    axios.post(`${BASE_URL}/emps`, user));
};

// 查询用户
export const fetchUserDataBySearch = async (params: { [key: string]: string }) => {
  return await handleRequest(() =>
    axios.post(`${BASE_URL}/emps/search`, params));
};

// 批量删除用户
export const deleteUsers = async (ids: number[]) => {
  return await handleRequest(() =>
    axios.delete(`${BASE_URL}/emps/batch`, {
      params: { ids: ids.join(',') }
    }));
};
