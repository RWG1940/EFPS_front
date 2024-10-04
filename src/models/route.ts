export interface Route {
    id?: number;
    path: string;
    name: string;
    component: any;
    redirect?: string;
    children: Route[];
    meta?: {
        title?: string;
        requiresAuth?: boolean;
    };
}
// 后端返回的route 格式
export interface rRoute {
    id?: number;
    path: string;
    name: string;
    component: any;
    redirect?: string;
    children: string;
    meta?: string;
}