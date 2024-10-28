import apiClient from '../index'

// 获取所有公告数据
export const fetchNoticesData = async () => {
  return apiClient.get('/notices');
};

// 获取分页后的公告数据
export const fetchNoticesDataPages = async (page: number, pageSize: number) => {
  return apiClient.get('/notices/pages', {
    params: {
      page: page,
      pageSize: pageSize
    }
  });
}

// 获取搜索后的公告数据
export const fetchNoticesDataBySearch = async (notices: any) => {
  return apiClient.post('/notices/search', notices)
};

// 新增公告数据
export const addNotice = async (notice: any) => {
  return apiClient.post('/notices', notice)
};

// 删除公告数据
export const deleteNotices = async (ids: number[]) => {
  return apiClient.delete('/notices', {
    params: { ids: ids.join(',') }
  })
};

// 更新公告数据
export const updateNotices = async (notice: any) => {
  return apiClient.put('/notices', notice)
};