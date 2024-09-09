import axios from 'axios';
import { handleRequest } from '@/utils/apiHelper';
import { URL } from '@/config/config';

export const BASE_URL = URL;

// 获取所有公告数据
export const fetchNoticesData = async () => {
  return await handleRequest(() => axios.get(`${BASE_URL}/notices`));
};

// 获取分页后的公告数据
export const fetchNoticesDataPages = async (page: number, pageSize: number) => {
  return await handleRequest(() =>
    axios.get(`${BASE_URL}/notices/pages?page=${page}&pageSize=${pageSize}`)
  );
};

// 获取搜索后的公告数据
export const fetchNoticesDataBySearch = async (notices: any) => {
  return await handleRequest(() =>
    axios.post(`${BASE_URL}/notices/search`, notices)
  );
};

// 新增公告数据
export const addNotice = async (notice: any) => {
  return await handleRequest(() =>
    axios.post(`${BASE_URL}/notices`, notice)
  );
};

// 删除公告数据
export const deleteNotices = async (ids: number[]) => {
  return await handleRequest(() =>
    axios.delete(`${BASE_URL}/notices`, {
      params: { ids: ids.join(',') }
    })
  );
};

// 更新公告数据
export const updateNotices = async (notice: any) => {
  return await handleRequest(() =>
    axios.put(`${BASE_URL}/notices`, notice)
  );
};