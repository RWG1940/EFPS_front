import apiClient from '../index'

// 获取所有空域事件数据
export const fetchAirSpaceEventData = async () => {
  return apiClient.get('/airspaceEvent');
};
// 获取分页后的空域事件数据
export const fetchAirSpaceEventPages = async (page: number, pageSize: number) => {
  return apiClient.get('/airspaceEvent/pages', {
    params: {
      page,
      pageSize,
    },
  })
}
// 获取搜索后的空域事件数据
export const fetchAirSpaceEventBySearch = async (airspaceEvent: any) => {
  return apiClient.post('/airspaceEvent/search', airspaceEvent);
};
// 新增空域事件数据
export const addAirSpaceEvent = async (airspaceEvent: any) => {
  return apiClient.post('/airspaceEvent', airspaceEvent);
};
// 删除空域事件数据
export const deleteAirSpaceEvent = async (ids: number[]) => {
  return apiClient.delete('/airspaceEvent', {
      params: { ids: ids.join(',') }
    });
};
// 更新空域事件数据
export const updateAirSpaceEvent = async (airspaceEvent: any) => {
  return apiClient.put('/airspaceEvent', airspaceEvent);
};

