import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TableColumnCtx } from 'element-plus'
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { UploadInstanceFunctions, DropdownProps, UploadProps } from 'tdesign-vue-next';
import { BASE_URL } from "@/api/user-api";
import { fetchAircraftsTrendsData, fetchAircraftsTrendsDataPages, fetchAircraftsTrendsDataBySearch, deleteAircraftsTrends, updateAircraftsTrends, addAircraftsTrends } from '@/api/aircraftsTrends-api';

// 定义航班动态数据类型
export interface AircraftsTrendsData {
    id?: number;
    header?: string;
    content?: string;
    status?: number;
    theme?: string;
    author?: string;
    createtime?: string;
    updatetime?: string;
}
export const useAircraftsTrendsStore = defineStore('aircraftsTrends', () => {
    /*
    * 属性
    */
    // aircraftsTrends数据体
    const aircraftsTrendsData = ref<AircraftsTrendsData[]>([]);
    // aircraftsTrends单条数据
    const emptyAircraftsTrendsData = ref<AircraftsTrendsData>({});
    // aircraftsTrends分页数据体
    const aircraftsTrendsDataPages = ref<AircraftsTrendsData[]>([]);
    // aircraftsTrends分页数据总数
    const aircraftsTrendsDataPagesTotal = ref<number>(0);
    // aircraftsTrends分页数据当前页
    const aircraftsTrendsDataPagesCurrent = ref<number>(1);
    // aircraftsTrends分页数据每页数据条数
    const aircraftsTrendsDataPagesSize = ref<number>(10);
    
    /*
    * 方法
    */
    // 获取所有航班动态数据
    const fetchAllAircraftsTrendsData = async () => {
        const res = await fetchAircraftsTrendsData();
        if (res.code == 1) {
            aircraftsTrendsData.value = res.result;
        }else{
            MessagePlugin.error(res.message);
        }
    }
    // 获取航班动态数据分页数据
    const fetchAircraftsTrendsDataPagesData = async (page: number, pageSize: number) => {
        const res = await fetchAircraftsTrendsDataPages(page, pageSize);
        if (res.code === 200) {
            aircraftsTrendsDataPages.value = res.result.list;
            aircraftsTrendsDataPagesTotal.value = res.result.total;
            aircraftsTrendsDataPagesCurrent.value = res.result.page;
        }else{
            MessagePlugin.error(res.message);
        }
    }
    // 根据搜索条件获取航班动态数据
    const fetchAircraftsTrendsDataBySearchData = async (aircraftsTrends: any) => {
        const res = await fetchAircraftsTrendsDataBySearch(aircraftsTrends);
        if (res.code === 200) {
            aircraftsTrendsData.value = res.data;
        }else{
            MessagePlugin.error(res.message);
        }
    }
    // 删除航班动态数据
    const deleteAircraftsTrendsData = async (ids: number[]) => {
        const res = await deleteAircraftsTrends(ids);
        if (res.code === 200) {
            MessagePlugin.success("删除成功");
        }else{
            MessagePlugin.error(res.message);
        }
    }
    // 更新航班动态数据
    const updateAircraftsTrendsData = async (aircraftsTrends: any) => {
        const res = await updateAircraftsTrends(aircraftsTrends);
        if (res.code === 200) {
            MessagePlugin.success("更新成功");
        }else{
            MessagePlugin.error(res.message);
        }
    }
    // 添加航班动态数据
    const addAircraftsTrendsData = async (aircraftsTrends: any) => {
        const res = await addAircraftsTrends(aircraftsTrends);
        if (res.code === 200) {
            MessagePlugin.success("添加成功");
        }else{
            MessagePlugin.error(res.message);
        }
    }


    return {
        aircraftsTrendsData,
        emptyAircraftsTrendsData,
        aircraftsTrendsDataPages,
        aircraftsTrendsDataPagesTotal,
        aircraftsTrendsDataPagesCurrent,
        aircraftsTrendsDataPagesSize,


        fetchAllAircraftsTrendsData,
        fetchAircraftsTrendsDataPagesData,
        fetchAircraftsTrendsDataBySearchData,
        deleteAircraftsTrendsData,
        updateAircraftsTrendsData,
        addAircraftsTrendsData

    }
})