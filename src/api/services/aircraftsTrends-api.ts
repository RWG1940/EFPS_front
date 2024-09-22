import apiClient from '../index'

// 获取所有航班动态数据
export const fetchAircraftsTrendsData = async () => {
  return apiClient.get('/aircraftsTrends');
};
// 获取分页后的航班动态数据
export const fetchAircraftsTrendsDataPages = async (page: number, pageSize: number) => {
  return apiClient.get(`/aircraftsTrends/pages?page=${page}&pageSize=${pageSize}`);
};
// 获取搜索后的航班动态数据
export const fetchAircraftsTrendsDataBySearch = async (aircraftsTrends: any) => {
  return apiClient.post('/aircraftsTrends/search', aircraftsTrends);
};
// 新增航班动态数据
export const addAircraftsTrends = async (aircraftsTrends: any) => {
  return apiClient.post('/aircraftsTrends', aircraftsTrends);
};
// 删除航班动态数据
export const deleteAircraftsTrends = async (ids: number[]) => {
  return apiClient.delete('/aircraftsTrends', {
      params: { ids: ids.join(',') }
    });
};
// 更新航班动态数据
export const updateAircraftsTrends = async (aircraftsTrends: any) => {
  return apiClient.put('/aircraftsTrends', aircraftsTrends);
};

