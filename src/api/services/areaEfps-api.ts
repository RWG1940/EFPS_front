import apiClient from '../index';

// 获取所有区域飞行进程单数据
export const fetchAreaEfpsData = async () => {
  return apiClient.get('/areaEfps');
};
// 获取分页后的areaEfps数据
export const fetchAreaEfpsDataPages = async (page: number, pageSize: number) => {
  return apiClient.get('/areaEfps/pages', {
      params: {
        page,
        pageSize,
      },
    })
};
// 增加areaEfps数据
export const addAreaEfps = async (areaEfps: any) => {
  return apiClient.post('/areaEfps', areaEfps)
};
// 删除areaEfps数据
export const deleteAreaEfps = async (ids: number[]) => {
  return apiClient.delete('/areaEfps', {
        params: { ids: ids.join(',') }
    })
};
// 更新areaEfps数据
export const updateAreaEfps = async (areaEfps: any) => {
  return apiClient.put('/areaEfps', areaEfps)
};
// 通过构建areaEfps来查询areaEfps数据
export const fetchAreaEfpsDataBySearch = async (areaEfps: any) => {
  return apiClient.post('/areaEfps/search', areaEfps)
};
