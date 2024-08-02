import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
// 获取所有用户数据
export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/emps`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
// 获取分页后的用户数据
export const fetchUserDataPages = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/emps/pages`, {
      params: { page, pageSize }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data pages:', error);
    throw error;
  }
};
// 更新用户信息
export const updateUser = (user: any) => {
  return axios.put(`${BASE_URL}/emps/${user.id}`, user);
};
// 删除用户
export const deleteUser = (id: number) => {
  return axios.delete(`${BASE_URL}/emps/${id}`);
};
// 添加用户
export const addUser = (user: any) => {
  return axios.post(`${BASE_URL}/emps`, user);
};

// 查询用户
export const fetchUserDataBySearch = async (params: { [key: string]: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/emps/search`, params);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching user data by search:', error);
    throw error;
  }
};
// 批量删除用户
export const deleteUsers = async (ids: number[]) => {
  try {
      const response = await axios.delete(`${BASE_URL}/emps/batch`, {
        params: { ids: ids.join(',') }
      });
      return response.data;
  } catch (error) {
    console.error('fail to delete Users:', error);
    throw error;
  }
};

