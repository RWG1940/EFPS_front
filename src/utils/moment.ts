import moment from 'moment';

// 格式化日期函数
export const formatDate = (date: string | Date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};