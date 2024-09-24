import { createRouter, createWebHistory } from 'vue-router';
import homePage from "@/views/homePage.vue";
import userManage from '@/views/userManage.vue';
import deptManage from '@/views/deptManage.vue';
import loginPage from '@/views/loginPage.vue';
import settingsPage from '@/views/settingsPage.vue';
import areaControlPage from '@/views/areaControlPage.vue';
import { useUserStore } from "@/stores/user-store";
import { userLoginBytoken } from "@/api/services/login-api";
import { MessagePlugin } from 'tdesign-vue-next';
import flightTrendsPage from '@/views/aircraftsTrendsPage.vue';
import airSpaceTrendsPage from '@/views/airSpaceTrendsPage.vue';
import dashboard from '@/views/dashboard.vue';
import noticesPage from '@/views/noticesPage.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { content } from "@/utils/stateVariables";
import { useTagsStore } from '@/stores/tags-store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: '主页',
      component: homePage,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/system-management/user-manage',
          name: '用户管理',
          component: userManage,
          meta: { requiresAuth: true },
        },
        {
          path: '/system-management/dept-manage',
          name: '部门管理',
          component: deptManage,
          meta: { requiresAuth: true },
        },
        {
          path: '/system-management/system-settings',
          name: '设置',
          component: settingsPage,
          meta: { requiresAuth: true },
        },
        {
          path: '/flight-status',
          name: '航班动态',
          component: flightTrendsPage,
          meta: { requiresAuth: true },
        },
        {
          path: '/airspace-status',
          name: '空域动态',
          component: airSpaceTrendsPage,
          meta: { requiresAuth: true },
        },
        {
          path: '/dashboard',
          name: '仪表盘',
          component: dashboard,
          meta: { requiresAuth: true },
        },
        {
          path: '/notices',
          name: '公告通知',
          component: noticesPage,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/login',
      name: '登录',
      component: loginPage,
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/command-control/area-management',
      name: '区域飞行进程单管理',
      component: areaControlPage,
      meta: { requiresAuth: true },
    },
  ]
});
NProgress.configure({ showSpinner: false, speed: 300 })

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const tagsStore = useTagsStore();
  NProgress.start();
  content.value = true;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (userStore.token) {
      // 添加当前路由到标签列表
      tagsStore.addRoute({
        name: to.name! as string,
        path: to.fullPath,
        meta: to.meta,
        isActive: true,
      });
      
      if (to.name == '区域飞行进程单管理' && userStore.myData.dept.id !== 47) {
        MessagePlugin.error('您无权访问此页面');
        next('/home');
      } else {
        next();
      }
    } else {
      MessagePlugin.error('您还未登录');
      next('/login');
    }
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  // 完成进度条
  NProgress.done();
  const timer = setTimeout(() => {
    content.value = false;
    clearTimeout(timer);
  }, 500);
});

export default router;
