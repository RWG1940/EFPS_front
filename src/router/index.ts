import { createRouter, createWebHistory } from 'vue-router';
import homePage from "@/views/homePage.vue";
import userManage from '@/views/userManage.vue';
import deptManage from '@/views/deptManage.vue';
import loginPage from '@/views/loginPage.vue';
import settingsPage from '@/views/settingsPage.vue';
import areaControlPage from '@/views/areaControlPage.vue';
import { useUserStore } from "@/stores/user-store";
import { userLoginBytoken} from "@/api/login-api";
import axios from 'axios';
import { MessagePlugin } from 'tdesign-vue-next';
import flightTrendsPage from '@/views/aircraftsTrendsPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: homePage,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/system-management/user-manage',
          name: 'userManage',
          component: userManage,
          meta: { requiresAuth: true },
        },
        {
          path: '/system-management/dept-manage',
          name: 'deptManage',
          component: deptManage,
          meta: { requiresAuth: true }, 
        },
        {
          path: '/system-management/system-settings',
          name: 'settingsPage',
          component: settingsPage,
          meta: { requiresAuth: true }, 
        },
        {
          path: '/flight-status',
          name: 'flightTrendsPage',
          component: flightTrendsPage,
          meta: { requiresAuth: true }, 
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: loginPage,
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/command-control/area-management',
      name: 'areaControlPage',
      component: areaControlPage,
      meta: { requiresAuth: true }, 
    },
  ]
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = userStore.token;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token) {
      try {
        const response = await userLoginBytoken(token);
        if (response.code == 1) {
          if (to.name === 'areaControlPage' && response.result.dept.id !== 47) {
            MessagePlugin.error('您无权访问此页面');
            next('/home'); 
          } else {
            userStore.myData = response.result
            next();
          }
        } else {
          MessagePlugin.error('您无权访问');
          userStore.logout();
          next('/login');
        }
      } catch (error) {
        userStore.logout();
        next('/login');
      }
    } else {
      MessagePlugin.error('您还未登录');
      next('/login');
    }
  } else {
    next(); 
  }
});

export default router;
