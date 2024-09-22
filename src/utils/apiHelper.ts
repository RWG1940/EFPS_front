import { MessagePlugin } from "tdesign-vue-next";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "vue-router";


export const handleRequest = async (requestFn: () => Promise<any>) => {
  try {
    const response = await requestFn();
    //console.log('响应数据:', response.data);
    return response.data;
  } catch (error) {
    console.error('出错:', error);
    return { code:'0', msg: '请求出错' };
  }
};