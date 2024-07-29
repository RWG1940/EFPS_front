import { createRouter, createWebHistory } from 'vue-router'
import homePage from "@/views/homePage.vue"
import userManage from '@/views/userManage.vue'
const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
      children: [
        {
          path: 'system-management/user-manage',
          name: 'userManage',
          component: userManage,
        },
        {
          path: 'system-management/dept-manage',
          name: 'deptManage',
          component: userManage,
        },
        
      ],
    },
  ]
})

export default router
