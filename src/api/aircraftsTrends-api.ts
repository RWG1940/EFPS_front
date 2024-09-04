import axios from 'axios';
import { handleRequest } from '@/utils/apiHelper';
import {URL} from '@/config/config'

export const BASE_URL = URL;
// 获取所有航班动态数据
export const fetchAircraftsTrendsData = async () => {
  return await handleRequest(() => axios.get(`${BASE_URL}/aircraftsTrends`));
};
// 获取分页后的航班动态数据
export const fetchAircraftsTrendsDataPages = async (page: number, pageSize: number) => {
  return await handleRequest(() =>
axios.get(`${BASE_URL}/aircraftsTrends/pages?page=${page}&pageSize=${pageSize}`));
};
// 获取搜索后的航班动态数据
export const fetchAircraftsTrendsDataBySearch = async (aircraftsTrends: any) => {
  return await handleRequest(() =>
axios.post(`${BASE_URL}/aircraftsTrends/search`, aircraftsTrends));
};
// 新增航班动态数据
export const addAircraftsTrends = async (aircraftsTrends: any) => {
  return await handleRequest(() =>
axios.post(`${BASE_URL}/aircraftsTrends`, aircraftsTrends));
};
// 删除航班动态数据
export const deleteAircraftsTrends = async (ids: number[]) => {
  return await handleRequest(() =>
axios.delete(`${BASE_URL}/aircraftsTrends`, {
    params: { ids: ids.join(',') }
}));
};
// 更新航班动态数据
export const updateAircraftsTrends = async (aircraftsTrends: any) => {
  return await handleRequest(() =>
axios.put(`${BASE_URL}/aircraftsTrends`, aircraftsTrends));
};

