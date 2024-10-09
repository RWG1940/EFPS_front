import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from "@/stores/user-store";
import { MessagePlugin } from 'tdesign-vue-next';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { content } from "@/utils/stateVariables";
import { useTagsStore } from '@/stores/tags-store';
import { useRouteStore } from '@/stores/routes-store';
import { staticRoutes } from './static-route';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes
});
NProgress.configure({ showSpinner: false, speed: 300 })
let isToken = true
// 路由守卫
router.beforeEach(async (to, from, next) => {
  const routeStore = useRouteStore();
  const userStore = useUserStore();
  const tagsStore = useTagsStore();
  
  NProgress.start();
  content.value = true;
  //定义isToken为true时添加路由
  if (isToken) {
    await routeStore.getDynamicRoutes().then(() => {
      routeStore.dynamicRoutes.forEach(v => {
        if (Array.isArray(v.children)) {
          v.children = routeStore.routerChildren(v.children);
        }
        v.component = routeStore.routerCom(v.component);
        router.addRoute(v);
      })
    })
    isToken = false
    next({
      ...to,
      replace: true,
    });
    return;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (userStore.token) {
      // 添加当前路由到标签列表
      tagsStore.addRoute({
        name: to.name! as string,
        path: to.fullPath,
        meta: to.meta,
        isActive: true,
      });
      userStore.updateLoginUserDataNoInfo()
      if (to.name == '区域飞行进程单管理' && parseInt(sessionStorage.getItem('userDeptid') as string) != 47) {
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


