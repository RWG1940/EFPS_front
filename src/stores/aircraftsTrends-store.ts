import { ref, reactive } from 'vue';
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { createCRUDStore } from '@/stores/utils/createCRUDStore';
import { aircraftsTrendsApi } from '@/api/services/aircraftsTrends-api';
import type { AircraftsTrendsData} from '@/types/aircraftsTrendsTypes';


const useAircraftsTrendsStore = createCRUDStore('aircraftsTrends', aircraftsTrendsApi);

export const aircraftsTrendsStore = useAircraftsTrendsStore();

export const addFormData = ref<AircraftsTrendsData>({});
export const editFormData = ref<AircraftsTrendsData>({});
// 过滤出已发布的航班动态数据
export const aircraftsTrendsDataPublished = computed(() => {
    return aircraftsTrendsStore.data.filter((item:any) => item.status == 1)
    .sort((a:any, b:any) => {
        return new Date(b.createtime).getTime() - new Date(a.createtime).getTime();
}) as AircraftsTrendsData[];
});



// 删除过期的航班动态数据
export const deleteExpiredAircraftsTrendsData = async () => {
    const expirationTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const expiredIds: number[] = [];
    aircraftsTrendsStore.data.forEach((trend:any) => {
        const createTime = trend.createtime ? new Date(trend.createtime) : new Date();
        if (createTime < expirationTime) {
            expiredIds.push(trend.id!);
        }
    });
    if (expiredIds.length > 0) {
        await aircraftsTrendsStore.deleteData(expiredIds)
            .then(() => {
                MessagePlugin.success(`成功删除 ${expiredIds.length} 条过期数据`);
            })
    } else {
        MessagePlugin.info('没有找到过期数据');
    }
};

// el搜索框过滤器
export const filterTableData = computed(() =>
    aircraftsTrendsStore.dataPages.filter(
        (data:any) =>
            !aircraftsTrendsStore.search ||
            data.header?.toLowerCase().includes(aircraftsTrendsStore.search.toLowerCase()) ||
            data.content?.toLowerCase().includes(aircraftsTrendsStore.search.toLowerCase()) ||
            data.theme?.toLowerCase().includes(aircraftsTrendsStore.search.toLowerCase())
    )
);

