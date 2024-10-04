import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getRoutes, addRoute, updateRoute, deleteRoute } from '@/api/services/route-api';
import type { Route,rRoute } from "@/models/route";
import { staticRoutes } from "@/router/static-route";

export const useRouteStore = defineStore('routes', () => {
  
  const dynamicRoutes = reactive<Route[]>([]);

  const getDynamicRoutes = async () => {
    await getRoutes().then(res => {
      dynamicRoutes.splice(0, dynamicRoutes.length, ...res.data.result.map((route:rRoute) => {
        return {
            ...route,
            children: route.children ? JSON.parse(route.children) : [],
            meta: route.meta ? JSON.parse(route.meta) : {}
        };
    }));
});
}

  const addDynamicRoute = async (route: Route) => {
    await addRoute(route).then(res => {
      dynamicRoutes.push(res.data)
    })
  }

  const deleteDynamicRoute = async (id: number) => {
    await deleteRoute(id).then(res => {
      dynamicRoutes.splice(dynamicRoutes.findIndex(item => item.id === id), 1)
    })
  }

  const updateDynamicRoute = async (route: Route) => {
    await updateRoute(route).then(res => {
      dynamicRoutes.splice(dynamicRoutes.findIndex(item => item.id === route.id), 1, res.data)
    })
  }
  // 对路由的component解析
  const routerCom = (path: string) => {
    if (!path) {
    console.error('Invalid component path:', path);
    return () => import('@/views/notFound.vue');
  }
    return () => import(`@/views/${path}.vue`);
  }
  // 对子路由的component解析
  const routerChildren = (children: Route[]) => {
    children.forEach(v => {
      v.component = routerCom(v.component);
      if (v.children) {
        v.children = routerChildren(v.children)
      }
    })
    return children
  }
  return {
    staticRoutes,
    dynamicRoutes,

    routerCom,
    routerChildren,
    getDynamicRoutes,
    addDynamicRoute,
    deleteDynamicRoute,
    updateDynamicRoute
  }
})