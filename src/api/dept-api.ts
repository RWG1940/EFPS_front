import axios from 'axios';
import { handleRequest } from '@/utils/apiHelper';

export const BASE_URL = 'http://localhost:8080';
// 获取所有部门数据
export const fetchDeptData = async () => {
  return await handleRequest(() => axios.get(`${BASE_URL}/depts`));
};
// 获取分页后的dept数据 By Token
export const fetchDeptDataPages = async (page: number, pageSize: number,token:string) => {
  return await handleRequest(() =>
    axios.get(`${BASE_URL}/depts/pages`, {
      params: { page, pageSize, token },
    }),
  );
};
// 更新部门信息
export const updateDept = async (dept: any) => {
  return await handleRequest(() =>
  axios.put(`${BASE_URL}/depts/${dept.id}`, dept));
};
// 删除用户
export const deleteDept = async (id: number) => {
  return await handleRequest(() =>
  axios.delete(`${BASE_URL}/depts/${id}`));
};
// 添加用户
export const addDept = async(dept: any) => {
  return await handleRequest(() =>
  axios.post(`${BASE_URL}/depts`, dept));
};

// 查询部门
export const fetchDeptDataBySearch = async (params: { [key: string]: string }) => {
  return await handleRequest(() => 
  axios.post(`${BASE_URL}/depts/search`, params));
};
// 批量删除部门
export const deleteDepts = async (ids: number[]) => {
  return await handleRequest(() =>
  axios.delete(`${BASE_URL}/depts/batch`, {
    params: { ids: ids.join(',') }
  }),
);
};


