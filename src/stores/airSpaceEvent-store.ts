import { defineStore } from 'pinia';
import { MessagePlugin } from 'tdesign-vue-next';
import type { FormProps } from 'tdesign-vue-next';
import { ref, reactive } from 'vue';
import { fetchAirSpaceEventData, fetchAirSpaceEventPages, fetchAirSpaceEventBySearch, addAirSpaceEvent, deleteAirSpaceEvent, updateAirSpaceEvent } from '@/api/services/airSpaceEvent-api';


export interface AirSpaceEventData {
    id: number;
    name: string;
    theme: string;
    level: number;
    type:number;
    title: string;
    starttime: string;
    endtime: string;
    status: string;
    detail: string;
    createtime: string;
    updatetime: string;
}
export const useAirSpaceEventStore = defineStore('airSpaceEvent', () => {

    /**
     * 状态
     */
    // 所有的空域事件数据
    const airSpaceEventList = ref<AirSpaceEventData[]>([]);
    // 分页数据
    const airSpaceEventPage = ref<AirSpaceEventData[]>([])
    // 当前页
    const currentPage = ref(1);
    // 页面大小
    const pageSize = ref(10);
    // 数据总数
    const total = ref(0);
    // 选中的ids
    const selectedIds = ref<number[]>([]);
    // 添加表单
    const addAirSpaceEventForm: FormProps['data'] = reactive({
        name: '',
        theme: '',
        level: 0,
        type: 0,
        title: '',
        starttime: '',
        endtime: '',
        status: '',
        detail: ''
    });
    // 添加表单规则
    const addAirSpaceEventFormRules = reactive({
        name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
        ],
    })
    // 修改表单
    const updateAirSpaceEventForm: FormProps['data'] = reactive({
        id: 0,
        name: '',
        theme: '',
        type:0,
        level: 0,
        title: '',
        starttime: '',
        endtime: '',
        status: '',
        detail: ''
    });
    // 修改表单规则
    const updateAirSpaceEventFormRules = reactive({
        name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
        ],
    })
    // 操作表单
    const operateAirSpace: FormProps['data'] = reactive({
        name: '',
        theme: 'primary',
        level: 2,
        type: 1,
        title: '',
        starttime: '',
        endtime: '',
        status: '进行中',
        detail: '请各个管制席、航班机长做好准备，该空域目前正在实施管制'
    });
    const airSpaceNameOptions = [
        { label: '东高空', value: '东高空' },
        { label: '西高空', value: '西高空' },
        { label: '南高空', value: '南高空' },
        { label: '北高空', value: '北高空' },
        { label: '东低空', value: '东低空' },
        { label: '西低空', value: '西低空' },
        { label: '南低空', value: '南低空' },
        { label: '北低空', value: '北低空' }
    ];
    const eventTypeOptions = [
        { label: '空域管制', value: '1' },
        { label: '空域通知', value: '2' },
    ];
    const eventLevelOptions = [
        { label: '一级', value: '1' },
        { label: '二级', value: '2' },
        { label: '三级', value: '3' }
    ];
    const eventStatusOptions = [
        { label: '待发布', value: '待发布' },
        { label: '进行中', value: '进行中' },
        { label: '已完成', value: '已完成' }
    ];
    const eventThemeOptions = [
        { label: '警告', value: 'warning' },
        { label: '通知', value: 'primary' },
        { label: '危险', value: 'danger' }
    ];
    const operationOptions = [
        { label: '空域关闭', value: 'close' },
        { label: '空域限流', value: 'limit' },
        { label: '空域限速', value: 'speed' },
        { label: '空域禁飞', value: 'forbid' },
        { label: '空域禁航', value: 'ban' },
        { label: '其他', value: 'other' }
    ];
    const startTime = ref('');
    const endTime = ref('');
    const createTime1 = ref('');
    const createTime2 = ref('');
    const updateTime1 = ref('');
    const updateTime2 = ref('');

    const operationPanelVisible = ref(false);
    /**
     * 方法
     */
    // 获取所有的空域事件数据
    const getAllAirSpaceEventList = async () => {
        await fetchAirSpaceEventData().then((res: any) => {
            airSpaceEventList.value = res.data;
        })
    };

    // 获取分页数据
    const getAirSpaceEventPage = async () => {
        await fetchAirSpaceEventPages(currentPage.value, pageSize.value).then((res: any) => {
            airSpaceEventPage.value = res.data.result.rows;
            total.value = res.total;
        })
    };

    // 添加
    const addAirSpaceEventData = async (data: any) => {
        await addAirSpaceEvent(data).then((res: any) => {
            MessagePlugin.success('添加成功');
            getAirSpaceEventPage()
        })
    };

    // 删除
    const deleteAirSpaceEventById = async (ids: number[]) => {
        await deleteAirSpaceEvent(ids).then((res: any) => {
            MessagePlugin.success('删除成功');
            getAirSpaceEventPage()
        })
    };

    // 更新
    const updateAirSpaceEventData = async (data: any) => {
        await updateAirSpaceEvent(data).then((res: any) => {
            MessagePlugin.success('更新成功');
            getAirSpaceEventPage()
        })
    };

    // 查询
    const searchAirSpaceEvent = async (data: any) => {
        await fetchAirSpaceEventBySearch(data).then((res: any) => {
            airSpaceEventPage.value = res.data.result;
            // 按照创建时间过滤
            if (createTime1.value != '' && createTime2.value != '') {
                const startDate = new Date(createTime1.value).getTime();
                const endDate = new Date(createTime2.value).getTime();
                const filteredItems = airSpaceEventPage.value.filter(item => {
                  const createTime = new Date(item.createtime!).getTime();
                  return createTime >= startDate && createTime <= endDate;
                });
                airSpaceEventPage.value = filteredItems;
              }
            // 按照更新时间过滤
            if (updateTime1.value != '' && updateTime2.value != '') {
              const startDate = new Date(updateTime1.value).getTime();
              const endDate = new Date(updateTime2.value).getTime();
              const filteredItems = airSpaceEventPage.value.filter(item => {
                const updateTime = new Date(item.updatetime!).getTime();
                return updateTime >= startDate &&updateTime <= endDate;
              });
              airSpaceEventPage.value = filteredItems;
            }
            
            // 按照开始日期startTime过滤
            if (startTime.value != '' && endTime.value != '') {
              const startDate = new Date(startTime.value).getTime();
              const endDate = new Date(endTime.value).getTime();
              const filteredItems = airSpaceEventPage.value.filter(item => {
                const startTime = new Date(item.starttime!).getTime();
                return startTime >= startDate &&startTime <= endDate;
              });
              airSpaceEventPage.value = filteredItems;
            }
            total.value = airSpaceEventPage.value.length;
        })
    };

    // 多选
    const handleSelectionChange = (selection: AirSpaceEventData[]) => {
        selectedIds.value = selection.map(item => item.id!);
    };

    const endAirSpaceEvent = async (item:any) => {
        updateAirSpaceEventForm.id = item.id;
        updateAirSpaceEventForm.theme = item.theme;
        updateAirSpaceEventForm.detail = item.detail;
        updateAirSpaceEventForm.title = item.title;
        updateAirSpaceEventForm.name = item.name;
        updateAirSpaceEventForm.status = '已完成';
        await updateAirSpaceEvent(updateAirSpaceEventForm).then(() => {
            MessagePlugin.success('操作成功');
            getAirSpaceEventPage()
        });
    };




    return {

        airSpaceEventList,
        airSpaceEventPage,
        currentPage,
        pageSize,
        total,
        addAirSpaceEventForm,
        addAirSpaceEventFormRules,
        updateAirSpaceEventForm,
        updateAirSpaceEventFormRules,
        selectedIds,
        eventTypeOptions,
        eventLevelOptions,
        eventStatusOptions,
        eventThemeOptions,
        airSpaceNameOptions,
        startTime,
        endTime,
        createTime1,
        createTime2,
        updateTime1,
        updateTime2,
        operationPanelVisible,
        operationOptions,
        operateAirSpace,

        getAllAirSpaceEventList,
        getAirSpaceEventPage,
        addAirSpaceEventData,
        deleteAirSpaceEventById,
        updateAirSpaceEventData,
        searchAirSpaceEvent,
        handleSelectionChange,
        endAirSpaceEvent


    }
});