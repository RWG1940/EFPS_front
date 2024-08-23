import { defineStore } from 'pinia';
import { ref } from 'vue';
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { fetchAreaEfpsData, fetchAreaEfpsDataPages, addAreaEfps, fetchAreaEfpsDataBySearch, updateAreaEfps, deleteAreaEfps } from '../api/areaEfps-api';
import type{ FormProps } from 'tdesign-vue-next';
import { reactive } from 'vue';

// 定义区域飞行进程单数据类型
export interface AreaEfpsData {
    id?: number;
    status?: number;
    type?: number;
    a1?: string;
    b1?: string;
    c1?: string;
    d1?: string;
    e1?: string;
    fg1?: string;
    h1?: string;
    a2?: string;
    b2?: string;
    c2?: string;
    a31?: string;
    a32?: string;
    a33?: string;
    a34?: string;
    a35?: string;
    a36?: string;
    b31?: string;
    b32?: string;
    b33?: string;
    b34?: string;
    b35?: string;
    b36?: string;
    a4?: string;
    b4?: string;
    c4?: string;
    m?: string;
    e?: string;
    a?: string;
    i?: string;
    createtime?: string;
    updatetime?: string;
}
//分页属性类型
export interface Page {
    page?: number;
    pageSize?: number;
    total?: number;
}
export const useareaEfpsStore = defineStore('areaEfps', () => {
    /*
    * 属性
    */
    //areaEfps数据体
    const areaEfpsData = ref<AreaEfpsData[]>([]);
    //添加进程单的表单
    const areaEfpsAddFormData: FormProps['data'] = reactive({
        id: undefined,
        status: undefined,
        type: undefined,
        a1: '',
        b1: 'ZZZZ',
        c1: '',
        d1Lhalf: '',
        d1Rhalf: '',
        d1: '',
        e1: 'ZZZZ',
        fg1: '',
        h1: 'ZZZZ',
        a2: '',
        b2: '',
        b2Lhalf: '',
        b2Rhalf: '',
        c2: '',
        a31: '',
        a32: '',
        a33: '',
        a34: '',
        a35: '',
        a36: '',
        b31: '',
        b32: '',
        b33: '',
        b34: '',
        b35: '',
        b36: '',
        a4: '',
        b4: '',
        c4: '',
        m: '0',
        e: '0',
        a: '0',
        i: '0',
        createtime: '',
        updatetime: ''
    });
    //用于清空表单
    const NullareaEfpsAddFormData = ref({
        id: undefined,
        status: undefined,
        type: undefined,
        a1: '',
        b1: 'ZZZZ',
        c1: '',
        d1Lhalf: '',
        d1Rhalf: '',
        d1: '',
        e1: 'ZZZZ',
        fg1: '',
        h1: 'ZZZZ',
        a2: '',
        b2: '',
        b2Lhalf: '',
        b2Rhalf: '',
        c2: '',
        a31: '',
        a32: '',
        a33: '',
        a34: '',
        a35: '',
        a36: '',
        b31: '',
        b32: '',
        b33: '',
        b34: '',
        b35: '',
        b36: '',
        a4: '',
        b4: '',
        c4: '',
        m: '0',
        e: '0',
        a: '0',
        i: '0',
        createtime: '',
        updatetime: ''
    });
    // 表单验证规则
    const areaEfpsADD_FORM_RULES = ref({
        a1: [{ required: true, message: '航空器呼号不能为空', trigger: 'blur' }],
    });
    // 进程单类型选项
    const areaEfpsTypeOptions = ref([
        { label: '进港', value: '1' },
        { label: '出港', value: '0' },
    ]);
    // 进程单状态选项
    const areaEfpsStatusOptions = ref([
        { label: '待处理', value: '1' },
        { label: '处理中', value: '2' },
        { label: '已完成', value: '3' },
    ]);
    // 尾流选项
    const areaEfpsWakeOptions = ref([
        { label: 'H', value: 'H' },//重型
        { label: 'M', value: 'M' },//中型
        { label: 'L', value: 'L' },//轻型
    ]);
    // 二次雷达应答机模式
    const areaEfpsSecondaryRadarOptions = ref([
        { label: 'N', value: 'N' },
        { label: 'A', value: 'A' },
        { label: 'C', value: 'C' },
        { label: 'X', value: 'X' },
        { label: 'P', value: 'P' },
        { label: 'I', value: 'I' },
        { label: 'S', value: 'S' },
        { label: 'D', value: 'D' },
    ]);
    // 高度变化状态选项
    const areaEfpsHightStatusOptions = ref([
        { label: '保持', value: '1' },
        { label: '离开上升', value: '2' },
        { label: '离开下降', value: '3' },
        { label: '场压保持', value: '4' },
        { label: '场压上升', value: '5' },
        { label: '场压下降', value: '6' },
    ]);
    
    //初始分页属性
    const areaEfpsPage = ref<Page>({
        page: 1,
        pageSize: 10,
        total: 0,
    });

    /*
    * 方法
    */
    //获取所有areaEfps数据
    const fetchAllAreaEfpsData = async () => {
        const response = await fetchAreaEfpsData();
        if (response.code == 1) {
            areaEfpsData.value = response.result;
        } else {
            MessagePlugin.error(response.message);
        }
    }
    // 获取分页后的areaEfps数据
    const fetchAreaEfpsDataPagesData = async () => {
        const response = await fetchAreaEfpsDataPages(
            areaEfpsPage.value.page ?? 1,
            areaEfpsPage.value.pageSize ?? 10
            );
        if (response.code == 1) {
            areaEfpsData.value = response.result.list;
        } else {
            MessagePlugin.error(response.message);
        }
    }
    // 添加areaEfps数据
    const addAreaEfpsData = async (areaEfps: any) => {
        const response = await addAreaEfps(areaEfps);
        if (response.code == 1) {
            MessagePlugin.success("添加成功");
        } else {
            MessagePlugin.error(response.message);
        }
    }
    // 删除areaEfps数据
    const deleteAreaEfpsData = async (ids: number[]) => {
        const response = await deleteAreaEfps(ids);
        if (response.code == 1) {
            MessagePlugin.success("删除成功");
        } else {
            MessagePlugin.error(response.message);
        }
    }
    // 更新areaEfps数据
    const updateAreaEfpsData = async (areaEfps: any) => {
        const response = await updateAreaEfps(areaEfps);
        if (response.code == 1) {
            MessagePlugin.success("更新成功");
        } else {
            MessagePlugin.error(response.message);
        }
    }
    // 查询areaEfps数据
    const searchAreaEfpsData = async (areaEfps: any) => {
        const response = await fetchAreaEfpsDataBySearch(areaEfps);
        if (response.code == 1) {
            MessagePlugin.success("查询成功");
        } else {
            MessagePlugin.error(response.message);
        }
    }
    //添加进程单表单提交
    const areaEfpsAddSubmit = async () => {
        const response = await addAreaEfps(areaEfpsAddFormData);
        if (response.code == 1) {
            MessagePlugin.success("添加成功");
            clearAreaEfpsAddFormData();
        } else {
            MessagePlugin.error(response.message);
        } 
        
    }
    //清空添加表单方法
    const clearAreaEfpsAddFormData = () => {
        areaEfpsAddFormData.value = JSON.parse(JSON.stringify(NullareaEfpsAddFormData.value));
    }

    return {
        // 返回属性
        areaEfpsData,
        areaEfpsPage,
        areaEfpsAddFormData,
        NullareaEfpsAddFormData,
        areaEfpsADD_FORM_RULES,
        areaEfpsTypeOptions,
        areaEfpsStatusOptions,
        areaEfpsWakeOptions,
        areaEfpsSecondaryRadarOptions,
        areaEfpsHightStatusOptions,

        // 返回方法
        fetchAllAreaEfpsData,
        fetchAreaEfpsDataPagesData,
        addAreaEfpsData,
        deleteAreaEfpsData,
        updateAreaEfpsData,
        searchAreaEfpsData,
        areaEfpsAddSubmit,
        clearAreaEfpsAddFormData
    }

})