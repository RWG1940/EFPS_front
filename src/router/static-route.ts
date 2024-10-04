import { reactive } from 'vue' 
import loginPage from "@/views/loginPage.vue";

export const staticRoutes = reactive([
    {
      path: '/login',
      name: '登录',
      component: loginPage,
      
    },
    {
      path: '/',
      redirect: '/home',
    },
  ]);