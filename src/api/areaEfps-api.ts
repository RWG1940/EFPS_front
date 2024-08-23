import axios from 'axios';
import { handleRequest } from '@/utils/apiHelper';
import {URL} from '@/config/config'

export const BASE_URL = URL;
// 获取所有区域飞行进程单数据
export const fetchAreaEfpsData = async () => {
  return await handleRequest(() => axios.get(`${BASE_URL}/areaEfps`));
};
// 获取分页后的areaEfps数据
export const fetchAreaEfpsDataPages = async (page: number, pageSize: number) => {
  return await handleRequest(() =>
    axios.get(`${BASE_URL}/areaEfps/pages`, {
      params: {
        page,
        pageSize,
      },
    }),
  );
};
// 增加areaEfps数据
export const addAreaEfps = async (areaEfps: any) => {
  return await handleRequest(() =>
    axios.post(`${BASE_URL}/areaEfps`, areaEfps),
  );
};
// 删除areaEfps数据
export const deleteAreaEfps = async (ids: number[]) => {
  return await handleRequest(() =>
    axios.delete(`${BASE_URL}/areaEfps`, {
        params: { ids: ids.join(',') }
    }),
  );
};
// 更新areaEfps数据
export const updateAreaEfps = async (areaEfps: any) => {
  return await handleRequest(() =>
    axios.put(`${BASE_URL}/areaEfps`, areaEfps),
  );
};
// 通过构建areaEfps来查询areaEfps数据
export const fetchAreaEfpsDataBySearch = async (areaEfps: any) => {
  return await handleRequest(() =>
    axios.post(`${BASE_URL}/areaEfps/search`),
  );
};
