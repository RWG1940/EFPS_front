import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
// 获取所有部门数据
export const fetchDeptData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/depts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dept data:', error);
    throw error;
  }
};
// 获取分页后的dept数据
export const fetchDeptDataPages = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/depts/pages`, {
      params: { page, pageSize }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dept data pages:', error);
    throw error;
  }
};
// 更新部门信息
export const updateDept = (dept: any) => {
  return axios.put(`${BASE_URL}/depts/${dept.id}`, dept);
};
// 删除用户
export const deleteDept = (id: number) => {
  return axios.delete(`${BASE_URL}/depts/${id}`);
};
// 添加用户
export const addDept = (dept: any) => {
  return axios.post(`${BASE_URL}/depts`, dept);
};

// 查询用户
export const fetchDeptDataBySearch = async (params: { [key: string]: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/depts/search`, params);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching dept data by search:', error);
    throw error;
  }
};
// 批量删除部门
export const deleteDepts = async (ids: number[]) => {
  try {
      const response = await axios.delete(`${BASE_URL}/depts/batch`, {
        params: { ids: ids.join(',') }
      });
      return response.data;
  } catch (error) {
    console.error('fail to delete Depts:', error);
    throw error;
  }
};
// 自动获取部门数据
export const getDpetDataBytoken = async( token: string ) =>{
    try {
        const response = await axios.post(`${BASE_URL}/depts/auto-depts`,token,{params: { token }});
        return response.data;
      } catch (error) {
        console.error('Error fetching dept data:', error);
        throw error;
      }
}


