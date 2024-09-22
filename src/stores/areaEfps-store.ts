import { defineStore } from 'pinia';
import { ref } from 'vue';
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { fetchAreaEfpsData, fetchAreaEfpsDataPages, addAreaEfps, fetchAreaEfpsDataBySearch, updateAreaEfps, deleteAreaEfps } from '../api/services/areaEfps-api';
import type { FormProps } from 'tdesign-vue-next';
import { reactive } from 'vue';
import moment from 'moment';

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
        { label: '已移交', value: '3' },
        { label: '已完成', value: '4' },
        { label: '回收中', value: '5' },
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
    //过滤后的表格数据
    const filteredArrivalEfps = computed(() => {
        return areaEfpsData.value.filter(efps => efps.status === 1 && efps.type === 1);
    });
    const filteredDepartureEfps = computed(() => {
        return areaEfpsData.value.filter(efps => efps.status === 1 && efps.type === 0);
    });
    const filteredTransferredArrivalEfps = computed(() => {
        return areaEfpsData.value.filter(efps => efps.status === 3 && efps.type === 1);
    });
    const filteredTransferredDepartureEfps = computed(() => {
        return areaEfpsData.value.filter(efps => efps.status === 3 && efps.type === 0);
    });
    const filteredRecycleEfps = computed(() => {
        return areaEfpsData.value.filter(efps => efps.status === 5);
    });
    const filteredCompletedEfps = computed(() => {
        return areaEfpsData.value.filter(efps => efps.status === 4);
    });
    //正在处理的进程单数据
    const processingData = computed(() => {
        return areaEfpsData.value.filter(efps => efps.status === 2 && (efps.type === 0 || efps.type === 1));
    });
    // 进程单区域选项
    const areaEfpsAreaOptions = ref([
        { label: '标牌区', value: '1' },
        { label: '指令区', value: '2' },
        { label: '航路区', value: '3' },
        { label: '协调区', value: '4' },
    ]);
    // 标牌区选项
    const areaEfpsTagOptions = ref([
        { label: '航空器呼号', value: 'a1' },
        { label: '航空器机型', value: 'b1' },
        { label: '尾流标志', value: 'c1' },
        { label: '二次雷达应答机模式及编码', value: 'd1' },
        { label: '起飞机场', value: 'e1' },
        { label: '预计起飞/降落时刻', value: 'fg1' },
        { label: '目的地机场', value: 'h1' },
    ]);
    // 指令区选项
    const areaEfpsInstructionOptions = ref([
        { label: '高度变化', value: 'a2' },
        { label: '其他指令', value: 'b2' },
        { label: '申请的巡航高度层', value: 'c2' },
    ])
    //航路区选项
    const areaEfpsRouteOptions = ref([
        { label: '位置报告点名称1', value: 'a31' },
        { label: '位置报1', value: 'b31' },
        { label: '位置报告点名称2', value: 'a32' },
        { label: '位置报2', value: 'b32' },
        { label: '位置报告点名称3', value: 'a33' },
        { label: '位置报3', value: 'b33' },
        { label: '位置报告点名称4', value: 'a34' },
        { label: '位置报4', value: 'b34' },
        { label: '位置报告点名称5', value: 'a35' },
        { label: '位置报5', value: 'b35' },
        { label: '位置报告点名称6', value: 'a36' },
        { label: '位置报6', value: 'b36' },
    ])
    // 协调区选项
    const areaEfpsCoopOptions = ref([
        { label: '进程单生成日期和时刻', value: '1' },
        { label: '其他信息', value: '2' },
        { label: '航空器收到本场ATIS信息', value: '3' },
        { label: '对过境航班，拍发EST报', value: '4' },
        { label: '与空军协调完毕', value: '5' },
        { label: '航空器被雷达识别', value: '6' },
    ])
    // 进程单修改的状态
    const selectedArea = ref('');
    const selectedItem = ref('');
    const inputOperationsValue = ref('');
    const itemOptions = ref<{ label: string; value: string }[]>([]);

    //指令区快捷操作的状态
    const hightTypeRadio = ref('1');
    const inputHightValue = ref('');

    //初始分页属性
    const areaEfpsPage = ref<Page>({
        page: 1,
        pageSize: 10,
        total: 0,
    });

    const recordAreaOptions = ref([
        { label: '记录1', value: '1' },
        { label: '记录2', value: '2' },
        { label: '记录3', value: '3' },
        { label: '记录4', value: '4' },
        { label: '记录5', value: '5' },
        { label: '记录6', value: '6' },
    ]);

    const selectedRecordArea = ref('');
    const locationName = ref('');
    const locationReport = ref('');

    const flyCommand = ref('');
    /*
    * 方法
    */
    //获取所有areaEfps数据
    const fetchAllAreaEfpsData = async () => {
        await fetchAreaEfpsData().then((resp) => {
            areaEfpsData.value = resp.data.result;
        })
    }
    // 获取分页后的areaEfps数据
    const fetchAreaEfpsDataPagesData = async () => {
        await fetchAreaEfpsDataPages(
            areaEfpsPage.value.page ?? 1,
            areaEfpsPage.value.pageSize ?? 10
        ).then(resp => {
            areaEfpsData.value = resp.data.result.list;
        })
    }
    // 添加areaEfps数据
    const addAreaEfpsData = async (areaEfps: any) => {
        await addAreaEfps(areaEfps).then(() => {
            MessagePlugin.success("添加成功");
            fetchAllAreaEfpsData()
        })
    }
    // 删除areaEfps数据
    const deleteAreaEfpsData = async (ids: number[]) => {
        await deleteAreaEfps(ids).then(() => {
            fetchAllAreaEfpsData();
            MessagePlugin.success("删除成功");
        });
    }
    // 更新areaEfps数据
    const updateAreaEfpsData = async (areaEfps: any) => {
        await updateAreaEfps(areaEfps).then(() => {
            fetchAllAreaEfpsData();
            MessagePlugin.success("更新成功");
        });
    }
    // 查询areaEfps数据
    const searchAreaEfpsData = async (areaEfps: any) => {
        await fetchAreaEfpsDataBySearch(areaEfps);
        // 。。。
    }
    //添加进程单表单提交
    const areaEfpsAddSubmit = async () => {
        await addAreaEfps(areaEfpsAddFormData).then(() => {
            MessagePlugin.success("添加成功");
            clearAreaEfpsAddFormData();
        })
    }
    //清空添加表单方法
    const clearAreaEfpsAddFormData = () => {
        areaEfpsAddFormData.value = JSON.parse(JSON.stringify(NullareaEfpsAddFormData.value));
    }
    // 回收处理中的进程单
    const recycleProcessingAreaEfps = async () => {
        const processingEfps = processingData.value[0];
        if (processingEfps && processingEfps.id !== undefined) {
            processingEfps.status = 5;
            await updateAreaEfps(processingEfps).then(() => {
                MessagePlugin.success("回收成功");
                fetchAllAreaEfpsData();
            })
        } else {
            MessagePlugin.error("未找到正在处理的进程单");
        }
    }
    // 撤回处理中的进程单
    const withdrawAreaEfps = async () => {
        const processingEfps = processingData.value[0];
        if (processingEfps && processingEfps.id !== undefined) {
            processingEfps.status = 1;
            await updateAreaEfps(processingEfps).then(() => {
                MessagePlugin.success("撤回成功");
                fetchAllAreaEfpsData();
            })
        } else {
            MessagePlugin.error("未找到正在处理的进程单");
        }
    }

    // 根据所选的区域更新数据项选项
    const onAreaChange = () => {
        switch (selectedArea.value) {
            case '1':
                itemOptions.value = areaEfpsTagOptions.value;
                break;
            case '2':
                itemOptions.value = areaEfpsInstructionOptions.value;
                break;
            case '3':
                itemOptions.value = areaEfpsRouteOptions.value;
                break;
            case '4':
                itemOptions.value = areaEfpsCoopOptions.value;
                break;
            default:
                itemOptions.value = [];
        }
    };
    // 进程单操作保存
    const saveOperations = () => {
        if (inputOperationsValue.value == '') {
            MessagePlugin.error("请输入操作内容!");
        } else {
            const areaEfps = {
                id: processingData.value[0]?.id,
                [selectedItem.value]: inputOperationsValue.value,
            };
            updateAreaEfpsData(areaEfps)
        }
    }

    // 进程单指令区快捷操作
    const keepHight = () => {
        if (inputHightValue.value == '') {
            MessagePlugin.warning('未输入数据！')
        } else {
            if (hightTypeRadio.value == '1') {
                const areaEfps = {
                    id: processingData.value[0]?.id,
                    b2: `${inputHightValue.value}`,
                };
                updateAreaEfpsData(areaEfps)
            } else {
                const areaEfps = {
                    id: processingData.value[0]?.id,
                    b2: `H${inputHightValue.value}`,
                };
                updateAreaEfpsData(areaEfps)
            }
        }
    }

    const riseHight = () => {
        if (inputHightValue.value == '') {
            MessagePlugin.warning('未输入数据！')
        } else {
            if (hightTypeRadio.value == '1') {
                const areaEfps = {
                    id: processingData.value[0]?.id,
                    b2: `${inputHightValue.value}↑`,
                };
                updateAreaEfpsData(areaEfps)
            } else {
                const areaEfps = {
                    id: processingData.value[0]?.id,
                    b2: `H${inputHightValue.value}↑`,
                };
                updateAreaEfpsData(areaEfps)
            }
        }
    }

    const declineHight = () => {
        if (inputHightValue.value == '') {
            MessagePlugin.warning('未输入数据！')
        } else {
            if (hightTypeRadio.value == '1') {
                const areaEfps = {
                    id: processingData.value[0]?.id,
                    b2: `${inputHightValue.value}↓`,
                };
                updateAreaEfpsData(areaEfps)
            } else {
                const areaEfps = {
                    id: processingData.value[0]?.id,
                    b2: `H${inputHightValue.value}↓`,
                };
                updateAreaEfpsData(areaEfps)
            }
        }
    }

    const locationReportSave = () => {
        if (locationName.value == '' && locationReport.value == '') {
            MessagePlugin.warning('未输入数据或数据不完整！')
        } else {
            const areaEfps = {
                id: processingData.value[0]?.id,
                [`a3${selectedRecordArea.value}`]: `${locationName.value}`,
                [`b3${selectedRecordArea.value}`]: `${locationReport.value}`,
            };
            updateAreaEfpsData(areaEfps)
        }
    }

    const setConflictFlag = () => {
        if (processingData.value[0]?.c4 == 'W') {
            const areaEfps = {
                id: processingData.value[0]?.id,
                c4: '',
            };
            updateAreaEfpsData(areaEfps)
        } else {
            const areaEfps = {
                id: processingData.value[0]?.id,
                c4: 'W',
            };
            updateAreaEfpsData(areaEfps)
        }
    }

    const setDiversion = () => {
        if (processingData.value[0]?.c4 === '备降') {
            const areaEfps = {
                id: processingData.value[0]?.id,
                c4: '',
            };
            updateAreaEfpsData(areaEfps)
        } else {
            const areaEfps = {
                id: processingData.value[0]?.id,
                c4: '备降',
            };
            updateAreaEfpsData(areaEfps)
        }
    }

    const setReturnflight = () => {
        if (processingData.value[0]?.c4 === '返航') {
            const areaEfps = {
                id: processingData.value[0]?.id,
                c4: '',
            };
            updateAreaEfpsData(areaEfps)
        } else {
            const areaEfps = {
                id: processingData.value[0]?.id,
                c4: '返航',
            };
            updateAreaEfpsData(areaEfps)
        }
    }

    const setVIP = () => {
        if (processingData.value[0]?.c4 === 'VIP') {
            const areaEfps = {
                id: processingData.value[0]?.id,
                c4: '',
            };
            updateAreaEfpsData(areaEfps)
        } else {
            const areaEfps = {
                id: processingData.value[0]?.id,
                c4: 'VIP',
            }
            updateAreaEfpsData(areaEfps)
        }
    }

    const setCreateTime = () => {
        updateAreaEfpsData({
            id: processingData.value[0]?.id,
            createtime: moment().format('YYYY-MM-DD HH:mm:ss')
        })
    }

    const sendFlyCommand = () => {
        updateAreaEfpsData({
            id: processingData.value[0]?.id,
            c2: flyCommand.value
        })
    }

    const transferEfps = () => {
        updateAreaEfpsData({
            id: processingData.value[0]?.id,
            status: 3
        })
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
        filteredArrivalEfps,
        filteredDepartureEfps,
        filteredTransferredDepartureEfps,
        filteredTransferredArrivalEfps,
        processingData,
        filteredRecycleEfps,
        filteredCompletedEfps,
        selectedArea,
        areaEfpsAreaOptions,
        selectedItem,
        itemOptions,
        inputOperationsValue,
        hightTypeRadio,
        inputHightValue,
        recordAreaOptions,
        selectedRecordArea,
        locationReport,
        locationName,
        flyCommand,

        // 返回方法
        fetchAllAreaEfpsData,
        fetchAreaEfpsDataPagesData,
        addAreaEfpsData,
        deleteAreaEfpsData,
        updateAreaEfpsData,
        searchAreaEfpsData,
        areaEfpsAddSubmit,
        clearAreaEfpsAddFormData,
        recycleProcessingAreaEfps,
        withdrawAreaEfps,
        onAreaChange,
        saveOperations,
        keepHight,
        riseHight,
        declineHight,
        locationReportSave,
        setConflictFlag,
        setReturnflight,
        setDiversion,
        setVIP,
        setCreateTime,
        sendFlyCommand,
        transferEfps,

    }

})