import { ref } from 'vue';
import { computed } from 'vue';
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { areaEfpsApi } from '../api/services/areaEfps-api';
import moment from 'moment';
import { formatDate, formatDate2 } from '@/utils/moment';
import { createCRUDStore } from './utils/createCRUDStore';
import type { AreaEfpsData } from '@/types/areaEfpsDataTypes';
import { areaEfpsTagOptions, areaEfpsInstructionOptions, areaEfpsRouteOptions, areaEfpsCoopOptions } from '@/types/areaEfpsDataTypes'
import { towerEfpsStore } from './towerEfps-store';
import { cooperaMsgStore } from '@/stores/cooperaMsg-store';
import { runwayStore } from './runway-store';
import { alertMsgStore } from './alertMsg-store';
import { parkingStandStore } from './parkingStand-store';

export const useAreaEfpsStore = createCRUDStore('areaEfps', areaEfpsApi);
export const areaEfpsStore = useAreaEfpsStore()
export const d1Lhalf = ref('');
export const d1Rhalf = ref('');
export const b2Lhalf = ref('');
export const b2Rhalf = ref('');
export const areaEfpsAddFormData = ref<AreaEfpsData>({})
export const search = ref('')
// 进程单修改的状态
export const selectedArea = ref('');
export const selectedItem = ref('');
export const inputOperationsValue = ref('');
export const itemOptions = ref<{ label: string; value: string }[]>([]);
//指令区快捷操作的状态
export const hightTypeRadio = ref('1');
export const inputHightValue = ref('');
export const selectedRecordArea = ref('');
export const locationName = ref('');
export const location = ref('');
export const locationReport = ref('');
export const flyCommand = ref('');
//过滤后的表格数据
export const filteredArrivalEfps = computed(() => {
    return areaEfpsStore.data.filter((efps: any) => efps.status === 1 && efps.type === 1).sort((a: any, b: any) => a.fg1 - b.fg1) as AreaEfpsData[];
});
export const filteredDepartureEfps = computed(() => {
    return areaEfpsStore.data.filter((efps: any) => efps.status === 1 && efps.type === 0).sort((a: any, b: any) => a.fg1 - b.fg1) as AreaEfpsData[];
});
export const filteredTransferredArrivalEfps = computed(() => {
    return areaEfpsStore.data.filter((efps: any) => efps.status === 3 && efps.type === 1).sort((a: any, b: any) => a.fg1 - b.fg1) as AreaEfpsData[];
});
export const filteredTransferredDepartureEfps = computed(() => {
    return areaEfpsStore.data.filter((efps: any) => efps.status === 3 && efps.type === 0).sort((a: any, b: any) => a.fg1 - b.fg1) as AreaEfpsData[];
});
export const filteredRecycleEfps = computed(() => {
    return areaEfpsStore.data.filter((efps: any) => efps.status === 5) as AreaEfpsData[];
});
export const filteredCompletedEfps = computed(() => {
    return areaEfpsStore.data.filter((efps: any) => efps.status === 4) as AreaEfpsData[];
});
export const filteredEfps = computed(() => {
    return areaEfpsStore.data.filter((efps: any) =>
        (
            !search.value ||
            efps.a1.toLowerCase().includes(search.value.toLowerCase())
            ||
            efps.b1.toLowerCase().includes(search.value.toLowerCase())
            ||
            efps.c1.toLowerCase().includes(search.value.toLowerCase())
            ||
            efps.d1.toLowerCase().includes(search.value.toLowerCase())
            ||
            efps.e1.toLowerCase().includes(search.value.toLowerCase())
            ||
            efps.h1.toLowerCase().includes(search.value.toLowerCase())
        )
        &&
        efps.status === 1 && (efps.type === 0 || efps.type === 1)) as AreaEfpsData[];
});
// 队列中的进程单
export const filterTableData = computed(() => {
    return areaEfpsStore.data.filter(
        (efps: any) =>
            (
                !search.value ||
                efps.a1.toLowerCase().includes(search.value.toLowerCase())
                ||
                efps.b1.toLowerCase().includes(search.value.toLowerCase())
                ||
                efps.c1.toLowerCase().includes(search.value.toLowerCase())
                ||
                efps.d1.toLowerCase().includes(search.value.toLowerCase())
                ||
                efps.e1.toLowerCase().includes(search.value.toLowerCase())
                ||
                efps.h1.toLowerCase().includes(search.value.toLowerCase())
            )
            &&
            efps.status === 2 && (efps.type === 0 || efps.type === 1)
    ) as AreaEfpsData[]
})
//正在处理的进程单数据
export const nowProcessingData = computed(() => {
    return areaEfpsStore.data.filter((efps: any) => efps.status === 6 && (efps.type === 0 || efps.type === 1)) as AreaEfpsData[];
});
// 队列中的进程单
export const processingData = computed(() => {
    return areaEfpsStore.data.filter((efps: any) => efps.status === 2 && (efps.type === 0 || efps.type === 1)) as AreaEfpsData[];
});


// 回收处理中的进程单
export const recycleProcessingAreaEfps = async () => {
    const processingEfps = nowProcessingData.value[0];
    if (processingEfps && processingEfps.id !== undefined) {
        processingEfps.status = 5;
        areaEfpsStore.updateData(processingEfps)
    } else {
        MessagePlugin.error("未找到正在处理的进程单");
    }
}
// 撤回处理中的进程单
export const withdrawAreaEfps = async () => {
    const processingEfps = nowProcessingData.value[0];
    if (processingEfps && processingEfps.id !== undefined) {
        processingEfps.status = 1;
        areaEfpsStore.updateData(processingEfps)
    } else {
        MessagePlugin.error("未找到正在处理的进程单");
    }
}

// 根据所选的区域更新数据项选项
export const onAreaChange = () => {
    switch (selectedArea.value) {
        case '1':
            itemOptions.value = areaEfpsTagOptions;
            break;
        case '2':
            itemOptions.value = areaEfpsInstructionOptions;
            break;
        case '3':
            itemOptions.value = areaEfpsRouteOptions;
            break;
        case '4':
            itemOptions.value = areaEfpsCoopOptions;
            break;
        default:
            itemOptions.value = [];
    }
};
// 进程单操作保存
export const saveOperations = () => {
    if (inputOperationsValue.value == '') {
        MessagePlugin.error("请输入操作内容!");
    } else {
        areaEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            [selectedItem.value]: inputOperationsValue.value,
        })
    }
}

// 进程单指令区快捷操作
export const changeHight = (instruction: number) => {
    if (inputHightValue.value == '') {
        MessagePlugin.warning('未输入数据！')
        return;
    }
    areaEfpsStore.updateData({
        id: nowProcessingData.value[0]?.id,
        [location.value]: `${hightTypeRadio.value == '1' ? '' : 'H'}${inputHightValue.value}${instruction == 0 ? '' : instruction == 1 ? '↑' : '↓'}`,
    })
}

export const locationReportSave = () => {
    if (locationName.value == '' && locationReport.value == '') {
        MessagePlugin.warning('未输入数据或数据不完整！')
    } else {
        areaEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            [`a3${selectedRecordArea.value}`]: `${locationName.value}`,
            [`b3${selectedRecordArea.value}`]: `${locationReport.value}`,
        })
    }
}

export const setConflictFlag = () => {
    if (nowProcessingData.value[0]?.c4 == 'W') {
        areaEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            c4: '',
        })
    } else {
        areaEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            c4: 'W',
        })
    }
}

export const setDiversion = () => {
    if (nowProcessingData.value[0]?.c4 === '备降') {
        areaEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            c4: '',
        })
    } else {
        areaEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            c4: '备降',
        })
    }
}

export const setReturnflight = () => {
    if (nowProcessingData.value[0]?.c4 === '返航') {
        areaEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            c4: '',
        })
    } else {
        areaEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            c4: '返航',
        })
    }
}

export const setVIP = () => {
    if (nowProcessingData.value[0]?.c4 === 'VIP') {
        areaEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            c4: '',
        })
    } else {
        areaEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            c4: 'VIP',
        })
    }
}

export const setCreateTime = () => {
    areaEfpsStore.updateData({
        id: nowProcessingData.value[0]?.id,
        createtime: moment().format('YYYY-MM-DD HH:mm:ss')
    })
}

export const sendFlyCommand = () => {
    areaEfpsStore.updateData({
        id: nowProcessingData.value[0]?.id,
        c2: flyCommand.value
    })
}

export const transferEfps = () => {
    // 进港进程单
    if (nowProcessingData.value[0]?.type == 1) {
        // 塔台添加进程单
        const newEfps = ref<AreaEfpsData>({})
        newEfps.value = { ...nowProcessingData.value[0] }
        newEfps.value.status = 1
        towerEfpsStore.addData(newEfps.value).then(() => {
            MessagePlugin.success('已移交至塔台席')
        })
        // 塔台将进程单调整为已移交
        areaEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            status: 3
        })
        // 添加协调信息，区域管制席已移交航班nowProcessingData[0].a1
        cooperaMsgStore.addData({
            header: `航班：${nowProcessingData.value[0].a1}移交完成`,
            content: `区域管制席已移交航班给塔台席`,
            theme: 'success',
            status: 0,
        });
        
        // 创建一个值，如果在runwayStore.data中没有找到status值为1的那么这个值为假
        const isRunwayStatus1 = computed(() => {
            return runwayStore.data.some((runway: any) => runway.status == 1);
        });
        if (!isRunwayStatus1.value) {
            alertMsgStore.addData({
                header: '没有可用的跑道，请等待',
                content: '塔台席获取不到可用的跑道',
                author: 'sys',
                status: 0,
            });
        }
        const isStopStatus1 = computed(() => {
            return parkingStandStore.data.some((parkingStand: any) => parkingStand.status == 1);
        });
        if (!isStopStatus1.value) {
            alertMsgStore.addData({
                header: '没有可用的停机位，请等待',
                content: '塔台席获取不到可用的停机位',
                author: 'sys',
                status: 0,
            });
        }

        
        
        return
    }
    // 出港进程单
    if (nowProcessingData.value[0]?.type == 0) {
        MessagePlugin.error('已升空')
        cooperaMsgStore.addData({
            header: `航班：${nowProcessingData.value[0].a1}顺利升空`,
            content: `区域管制席已确认航班升空正常`,
            theme: 'success',
            status: 0,
        });
        return
    }
    MessagePlugin.error('未找到正在处理的进程单')
}

export const getOffsetDate = (days: number): Date => {
    return new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
}

export const filterEfpsByStatusAndDate = (status: number, type: number, date: Date) => {
    return computed(() => {
        return areaEfpsStore.data.filter((efps: any) =>
            efps.status == status &&
            efps.type == type &&
            formatDate(efps.createtime as string || new Date()/*如果时间未定义，则采用当天的时间*/)?.startsWith(formatDate2(date))
        ).length
    });
}

export const handleEfpsProcess = (id: string) => {
    const processingEfps = nowProcessingData.value[0];
    if (processingEfps != undefined) {
        const areaEfps = {
            id: id,
            status: 2,
        };
        areaEfpsStore.updateData(areaEfps);
        MessagePlugin.info("当前存在处理中的进程单，已进入处理队列");
    } else {
        const areaEfps = {
            id: id,
            status: 6,
        };
        areaEfpsStore.updateData(areaEfps);
    }
}
export const withdrawProcessingEfps = () => {
    const processingEfps = nowProcessingData.value[0];
    if (processingEfps && processingEfps.id !== undefined) {
        processingEfps.status = 2;
        areaEfpsStore.updateData(processingEfps)
    } else {
        MessagePlugin.error("未找到正在处理的进程单");
    }
}
export const handleProcessingEfpsFirst = (id: string) => {
    withdrawProcessingEfps()
    handleEfpsProcess(id)
};
export const withdrawSelectedAreaEfps = async (id: string) => {
    const processingEfps = { id: id, status: 1 }
    await areaEfpsStore.updateData(processingEfps).then(() => {
        MessagePlugin.success("撤回成功");
    })
}

export const lastestProcessingData = () => {
    const lastestProcessingEfps = processingData.value[0];
    if (lastestProcessingEfps != undefined) {
        const areaEfps = {
            id: lastestProcessingEfps.id,
            status: 6,
        };
        areaEfpsStore.updateData(areaEfps);
        MessagePlugin.info("处理队列中的进程单已自动进入处理状态");
    }
}
