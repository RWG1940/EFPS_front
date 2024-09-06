import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import type { TableColumnCtx } from 'element-plus'
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { UploadInstanceFunctions, DropdownProps, UploadProps, FormProps } from 'tdesign-vue-next';
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
    const aircraftsTrendData = ref<AircraftsTrendsData>({});
    // aircraftsTrends单条空数据
    const emptyAircraftsTrendData = ref<AircraftsTrendsData>({});
    // aircraftsTrends分页数据体
    const aircraftsTrendsDataPages = ref<AircraftsTrendsData[]>([]);
    // aircraftsTrends分页数据总数
    const aircraftsTrendsDataPagesTotal = ref<number>(0);
    // aircraftsTrends分页数据当前页
    const aircraftsTrendsDataPagesCurrent = ref<number>(1);
    // aircraftsTrends分页数据每页数据条数
    const aircraftsTrendsDataPagesSize = ref<number>(10);
    // 添加、修改航班动态表单数据
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
        if (res.code == 1) {
            aircraftsTrendsData.value = res.result;
        } else {
            MessagePlugin.error(res.message);
        }
    }
    // 获取航班动态数据分页数据
    const fetchAircraftsTrendsDataPagesData = async (page: number, pageSize: number) => {
        const res = await fetchAircraftsTrendsDataPages(page, pageSize);
        if (res.code == 1) {
            aircraftsTrendsDataPages.value = res.result.list;
            aircraftsTrendsDataPagesTotal.value = res.result.total;
            aircraftsTrendsDataPagesCurrent.value = res.result.page;
        } else {
            MessagePlugin.error(res.message);
        }
    }
    // 根据搜索条件获取航班动态数据
    const fetchAircraftsTrendsDataBySearchData = async (aircraftsTrends: any) => {
        const res = await fetchAircraftsTrendsDataBySearch(aircraftsTrends);
        if (res.code == 1) {
            aircraftsTrendsData.value = res.data;
        } else {
            MessagePlugin.error(res.message);
        }
    }
    // 删除航班动态数据
    const deleteAircraftsTrendsData = async (ids: number[]) => {
        console.log(ids)
        const res = await deleteAircraftsTrends(ids);
        if (res.code == 1) {
            MessagePlugin.success("删除成功");
            fetchAllAircraftsTrendsData();
        } else {
            MessagePlugin.error(res.message);
        }
    }
    // 更新航班动态数据
    const updateAircraftsTrendData = async (aircraftsTrends: AircraftsTrendsData) => {
        const res = await updateAircraftsTrends(aircraftsTrends);
        if (res.code == 1) {
            MessagePlugin.success("更新成功");
            fetchAllAircraftsTrendsData();
        } else {
            MessagePlugin.error(res.message);
        }
    }
    // 添加航班动态数据
    const addAircraftsTrendData = async (aircraftsTrendData: AircraftsTrendsData) => {
        const res = await addAircraftsTrends(aircraftsTrendData);
        if (res.code == 1) {
            MessagePlugin.success("添加成功");
            fetchAllAircraftsTrendsData();
        } else {
            MessagePlugin.error(res.message);
        }
    }
    // 添加航班动态数据提交添加 验证
    const addAircraftsTrendSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
        if (validateResult === true) {
            await addAircraftsTrendData(aircraftsTrendAddFormData.value);
        } else {
            console.log('Validate Errors: ', firstError, validateResult);
            if (firstError) {
                MessagePlugin.warning(firstError);
            } else {
                MessagePlugin.warning('验证失败');
            }
        }
    };
    // 更新航班动态数据提交修改 验证
    const editAircraftsTrendSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
        if (validateResult === true) {
            await updateAircraftsTrendData(aircraftsTrendEditFormData.value);
        } else {
            console.log('Validate Errors: ', firstError, validateResult);
            if (firstError) {
                MessagePlugin.warning(firstError);
            }
        }
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
            try {
                await deleteAircraftsTrendsData(expiredIds);
                MessagePlugin.success(`成功删除 ${expiredIds.length} 条过期数据`);
            } catch (error) {
                MessagePlugin.error('删除过期数据时发生错误');
            }
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
        aircraftsTrendsData.value.filter(
            (data) =>
                !search.value ||
                data.header?.toLowerCase().includes(search.value.toLowerCase()) ||
                data.content?.toLowerCase().includes(search.value.toLowerCase()) ||
                data.theme?.toLowerCase().includes(search.value.toLowerCase())
              

        )
    )


    return {
        aircraftsTrendsData,
        emptyAircraftsTrendData,
        aircraftsTrendsDataPages,
        aircraftsTrendsDataPagesTotal,
        aircraftsTrendsDataPagesCurrent,
        aircraftsTrendsDataPagesSize,
        aircraftsTrendData,
        aircraftsTrendAddFormData,
        aircraftsTrendADD_FORM_RULES,
        aircraftsTrendEditFormData,
        aircraftsTrendEDIT_FORM_RULES,
        aircraftsTrendStatusOptions,
        aircraftsTrendThemeOptions,
        search,
        aircraftsTrendsDataPublished,

        fetchAllAircraftsTrendsData,
        fetchAircraftsTrendsDataPagesData,
        fetchAircraftsTrendsDataBySearchData,
        deleteAircraftsTrendsData,
        updateAircraftsTrendData,
        addAircraftsTrendData,
        addAircraftsTrendSubmit,
        deleteExpiredAircraftsTrendsData,
        handleSelectionChange,
        deleteSelectedAircraftsTrendsData,
        editAircraftsTrendSubmit,
        filterTableData,
        
    }
})