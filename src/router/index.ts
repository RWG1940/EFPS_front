import { createRouter, createWebHistory } from 'vue-router'
import homePage from "@/views/homePage.vue"
import userManage from '@/views/userManage.vue'
import deptManage from '@/views/deptManage.vue'
import loginPage from '@/views/loginPage.vue'

const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: homePage,
      children: [
        {
          path: '/system-management/user-manage',
          name: 'userManage',
          component: userManage,
        },
        {
          path: '/system-management/dept-manage',
          name: 'deptManage',
          component: deptManage,
        },
        
        
      ],
    },
    {
      path:'/login',
      name:'login',
      component:loginPage,   
    }
  ]
})

export default router
