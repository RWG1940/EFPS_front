import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { fetchAircraftsTrendsData, fetchAircraftsTrendsDataPages, fetchAircraftsTrendsDataBySearch, deleteAircraftsTrends, updateAircraftsTrends, addAircraftsTrends } from '@/api/services/aircraftsTrends-api';

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
    // aircraftsTrends分页数据体
    const aircraftsTrendsDataPages = ref<AircraftsTrendsData[]>([]);
    const pageSize = ref(10);
    const currentPage = ref(1);
    const aircraftsTrendAddFormData = ref<AircraftsTrendsData>({});
    const aircraftsTrendADD_FORM_RULES = {
        header: [{ required: true, message: '标题必填' }],
        content: [{ required: true, message: '内容必填' }],
        theme: [{ required: true, message: '请选择主题' }],
        author: [{ required: true, message: '请输入作者' }],
        status: [{ required: true, message: '请选择状态' }],
    }
    const aircraftsTrendEditFormData = ref<AircraftsTrendsData>({});
    const aircraftsTrendEDIT_FORM_RULES = {
        header: [{ required: true, message: '标题必填' }],
        content: [{ required: true, message: '内容必填' }],
        theme: [{ required: true, message: '请选择主题' }],
        author: [{ required: true, message: '请输入作者' }],
        status: [{ required: true, message: '请选择状态' }],
    }
    const aircraftsTrendThemeOptions = [
        { label: '严重', value: 'error' },
        { label: '通知', value: 'info' },
        { label: '警告', value: 'warning' },
        { label: '成功', value: 'success' },
    ]
    const aircraftsTrendStatusOptions = [
        { label: '已发布', value: 1 },
        { label: '审核中', value: 0 },
    ]
    const selectedIds = ref<number[]>([]);
    const search = ref('')
    // 过滤出已发布的航班动态数据
    const aircraftsTrendsDataPublished = computed(() => {
        return aircraftsTrendsData.value.filter(item => item.status == 1);
    })
    /*
    * 方法
    */
    // 获取所有航班动态数据
    const fetchAllAircraftsTrendsData = async () => {
        const res = await fetchAircraftsTrendsData();
        aircraftsTrendsData.value = res.data.result;
    }
    // 获取航班动态数据分页数据
    const getPage = async () => {
        const res = await fetchAircraftsTrendsDataPages(currentPage.value, pageSize.value);
        aircraftsTrendsDataPages.value = res.data.result.rows;
    }

    // 删除航班动态数据
    const deleteAircraftsTrendsData = async (ids: number[]) => {
        await deleteAircraftsTrends(ids).then(() => {
            getPage()
            MessagePlugin.success("删除成功");
        });
    }
    // 更新航班动态数据
    const updateAircraftsTrendData = async () => {
        await updateAircraftsTrends(aircraftsTrendEditFormData.value).then(() => {
            getPage()
            MessagePlugin.success("更新成功");
        })

    }
    // 添加航班动态数据
    const addAircraftsTrendData = async () => {
        await addAircraftsTrends(aircraftsTrendAddFormData.value).then(() => {
            fetchAllAircraftsTrendsData();
            MessagePlugin.success("添加成功");
            getPage()
        })
    }


    // 删除过期的航班动态数据
    const deleteExpiredAircraftsTrendsData = async () => {
        // 过期时间 当前时间减去24小时
        const expirationTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const expiredIds: number[] = [];
        aircraftsTrendsData.value.forEach((trend) => {
            const createTime = trend.createtime ? new Date(trend.createtime) : new Date();
            if (createTime < expirationTime) {
                expiredIds.push(trend.id!);
            }
        });
        // 如果有数据过期，则批量删除
        if (expiredIds.length > 0) {
            await deleteAircraftsTrendsData(expiredIds)
                .then(() => {
                    MessagePlugin.success(`成功删除 ${expiredIds.length} 条过期数据`);
                })
        } else {
            MessagePlugin.info('没有找到过期数据');
        }
    };
    const deleteSelectedAircraftsTrendsData = async () => {
        if (selectedIds.value.length === 0) {
            MessagePlugin.warning('请先选择要删除的数据');
        } else {
            await deleteAircraftsTrendsData(selectedIds.value);
        }
    };
    // 多选
    const handleSelectionChange = (selection: AircraftsTrendsData[]) => {
        selectedIds.value = selection.map(item => item.id!);
    };
    const filterTableData = computed(() =>
        aircraftsTrendsDataPages.value.filter(
            (data) =>
                !search.value ||
                data.header?.toLowerCase().includes(search.value.toLowerCase()) ||
                data.content?.toLowerCase().includes(search.value.toLowerCase()) ||
                data.theme?.toLowerCase().includes(search.value.toLowerCase())
        )
    )


    return {
        aircraftsTrendsData,
        aircraftsTrendsDataPages,
        aircraftsTrendAddFormData,
        aircraftsTrendADD_FORM_RULES,
        aircraftsTrendEditFormData,
        aircraftsTrendEDIT_FORM_RULES,
        aircraftsTrendStatusOptions,
        aircraftsTrendThemeOptions,
        search,
        aircraftsTrendsDataPublished,
        pageSize,
        currentPage,

        fetchAllAircraftsTrendsData,
        getPage,
        deleteAircraftsTrendsData,
        updateAircraftsTrendData,
        addAircraftsTrendData,
        deleteExpiredAircraftsTrendsData,
        handleSelectionChange,
        deleteSelectedAircraftsTrendsData,
        filterTableData,

    }
})