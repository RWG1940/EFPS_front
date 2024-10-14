import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import { getRoutes } from '@/api/services/route-api';
import type { RouteEntity, Route } from "@/models/route";
import router from '@/router';

export const useRouteStore = defineStore('routes', () => {

  // 动态路由
  const dynamicRoutes = ref<Route[]>([]);
  const aimRoutePath = ref('no aim path');

  // 递归解析子路由并动态加载组件
  const routerChildren = (children: RouteEntity[]): Route[] => {
    const parsedRoutes = children.map(route => {
      return {
        path: route.value,
        name: route.alias,
        component: routerCom(route.name),
        redirect: route.redirect,
        meta: {
          id: route.id,
          icon: route.icon,
          state: route.state,
          sort: route.sort,
          type: route.type,
          description: route.discription,
          createUserId: route.createuserid
        },
        children: route.children ? routerChildren(route.children) : []
      } as Route;
    });
    return sortRoutes(parsedRoutes); 
  };

  // 动态解析组件
  const routerCom = (name: string) => {
    if (!name) {
      return () => import('@/views/notFound.vue');
    }
    return () => import(`@/views/${name}.vue`);
  };

  // 路由排序函数，根据 meta.sort 排序
  const sortRoutes = (routes: Route[]): Route[] => {
    return routes.sort((a, b) => {
      const sortA = a.meta.sort || 0;
      const sortB = b.meta.sort || 0;
      return sortA - sortB;
    });
  };

  // 获取动态路由并添加到路由中
  const getDynamicRoutes = async () => {
    await getRoutes().then(res => {
      const parsedRoutes = res.data.result.map((route: RouteEntity) => ({
        path: route.value,
        name: route.alias,
        component: routerCom(route.name),
        redirect: route.redirect,
        meta: {
          id: route.id,
          icon: route.icon,
          state: route.state,
          sort: route.sort,
          type: route.type,
          description: route.discription,
          createUserId: route.createuserid,
          parentRouteId: route.parentrouteid
        },
        children: route.children ? routerChildren(route.children) : []
      } as Route));

      // 对顶级路由进行排序
      dynamicRoutes.value = sortRoutes(parsedRoutes);
      // 添加 404 路由到最后
      dynamicRoutes.value.push({
        path: '/:pathMatch(.*)*',
        name: '找不到页面',
        component: () => import('../views/notFound.vue'),
        redirect: '',
        meta: {
          id: 404, 
          icon: '',  
          state: 0,  
          sort: 999, 
          type: 'error', 
          description: '找不到页面',
          createUserId: 404,
        },
        children: [] 
      });
      const routes = toRaw(dynamicRoutes.value);
      routes.forEach((route: Route) => {
        router.addRoute(route);
      });
    });
  };

  

  return {
    dynamicRoutes,
    aimRoutePath,
    getDynamicRoutes,
    routerCom,
    routerChildren,
  };
});
