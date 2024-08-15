import { createRouter, createWebHistory } from 'vue-router'
import homePage from "@/views/homePage.vue"
import userManage from '@/views/userManage.vue'
import deptManage from '@/views/deptManage.vue'
import loginPage from '@/views/loginPage.vue'
import settingsPage from '@/views/settingsPage.vue'
import areaControlPage from '@/views/areaControlPage.vue'
import { useUserStore } from "@/stores/user-store";

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
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = !!userStore.token;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router
