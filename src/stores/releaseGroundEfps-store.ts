import { ref, reactive, watch, onMounted } from 'vue';
import { computed } from 'vue';
import { Alert, MessagePlugin } from 'tdesign-vue-next';
import { releaseGroundEfpsApi } from '@/api/services/releaseGroundEfps-api';
import { createCRUDStore } from '@/stores/utils/createCRUDStore';
import type { ReleaseGroundEfpsData } from '@/types/releaseGroundEfpsTypes';
import { formatDate, formatDate2 } from '@/utils/moment';
import { towerEfpsStore } from './towerEfps-store';
import { flightRunwayStore } from './flightRunway-store';
import { flightParkingStandStore } from './flightParkingStand-store';
import { flightInfoStore } from './flightInfo-store';
import { cooperaMsgStore } from '@/stores/cooperaMsg-store';
 

export const useReleaseGroundEfpsStore = createCRUDStore('releaseGroundEfps', releaseGroundEfpsApi);
export const releaseGroundEfpsStore = useReleaseGroundEfpsStore();
export const releaseGroundEfpsAddFormData = ref<ReleaseGroundEfpsData>({});
export const flyCommand = ref('');
export const search = ref('');
export const selectedRunway = ref('');
export const selectedStopway = ref('');
export const d1Lhalf = ref('');
export const d1Rhalf = ref('');
export const b2Lhalf = ref('');
export const b2Rhalf = ref('');
//过滤后的表格数据
export const filteredArrivalEfps = computed(() => {
    return releaseGroundEfpsStore.data.filter((efps: any) => efps.status === 1 && efps.type === 1).sort((a: any, b: any) => a.fg1 - b.fg1) as ReleaseGroundEfpsData[];
});
export const filteredDepartureEfps = computed(() => {
    return releaseGroundEfpsStore.data.filter((efps: any) => efps.status === 1 && efps.type === 0).sort((a: any, b: any) => a.fg1 - b.fg1) as ReleaseGroundEfpsData[];
});
export const filteredEfps = computed(() => {
    return releaseGroundEfpsStore.data.filter((efps: any) =>
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
        efps.status === 1 && (efps.type === 0 || efps.type === 1)) as ReleaseGroundEfpsData[];
});
export const filteredTransferredArrivalEfps = computed(() => {
    return releaseGroundEfpsStore.data.filter((efps: any) => efps.status === 3 && efps.type === 1).sort((a: any, b: any) => a.fg1 - b.fg1) as ReleaseGroundEfpsData[];
});
export const filteredTransferredDepartureEfps = computed(() => {
    return releaseGroundEfpsStore.data.filter((efps: any) => efps.status === 3 && efps.type === 0).sort((a: any, b: any) => a.fg1 - b.fg1) as ReleaseGroundEfpsData[];
});
export const filteredRecycleEfps = computed(() => {
    return releaseGroundEfpsStore.data.filter((efps: any) => efps.status === 5) as ReleaseGroundEfpsData[];
});
export const filteredCompletedEfps = computed(() => {
    return releaseGroundEfpsStore.data.filter((efps: any) => efps.status === 4) as ReleaseGroundEfpsData[];
});


//正在处理队列中的进程单数据
export const processingData = computed(() => {
    return releaseGroundEfpsStore.data.filter((efps: any) => efps.status === 2 && (efps.type === 0 || efps.type === 1))  as ReleaseGroundEfpsData[];
});
// 正在处理的进程单数据
export const nowProcessingData = computed(() => {
    return releaseGroundEfpsStore.data.filter((efps: any) => efps.status === 6 && (efps.type === 0 || efps.type === 1))  as ReleaseGroundEfpsData[];
});
export const filterTableData = computed(() => {
    return releaseGroundEfpsStore.data.filter(
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
    ) as ReleaseGroundEfpsData[]
})
export const handleEfpsProcess = (id: string) => {
    const processingEfps = nowProcessingData.value[0];
    if (processingEfps != undefined) {
        const releaseGroundEfps = {
            id: id,
            status: 2,
        };
        releaseGroundEfpsStore.updateData(releaseGroundEfps);
        MessagePlugin.info("当前存在处理中的进程单，已进入处理队列");
    } else {
        const releaseGroundEfps = {
            id: id,
            status: 6,
        };
        releaseGroundEfpsStore.updateData(releaseGroundEfps);
    }
}


export const lastestProcessingData = () => {
    const lastestProcessingEfps = processingData.value[0];
    if (lastestProcessingEfps != undefined) {
        const releaseGroundEfps = {
            id: lastestProcessingEfps.id,
            status: 6,
        };
        releaseGroundEfpsStore.updateData(releaseGroundEfps);
        MessagePlugin.info("处理队列中的进程单已自动进入处理状态");
    }
}

export const withdrawReleaseGroundEfps = async () => {
    const processingEfps = nowProcessingData.value[0];
    if (processingEfps && processingEfps.id !== undefined) {
        processingEfps.status = 1;
        await releaseGroundEfpsStore.updateData(processingEfps).then(() => {
            MessagePlugin.success("撤回成功");
        })
    } else {
        MessagePlugin.error("未找到正在处理的进程单");
    }
}
export const withdrawSelectedReleaseGroundEfps = async (id: string) => {
    const processingEfps = { id: id, status: 1 }
    await releaseGroundEfpsStore.updateData(processingEfps).then(() => {
        MessagePlugin.success("撤回成功");
    })
}
export const withdrawProcessingEfps = async () => {
    const processingEfps = nowProcessingData.value[0];
    if (processingEfps && processingEfps.id !== undefined) {
        processingEfps.status = 2;
        await releaseGroundEfpsStore.updateData(processingEfps).then(() => {
        })
    } else {
        MessagePlugin.error("未找到正在处理的进程单");
    }
}
export const handleProcessingEfpsFirst = (id: string) => {
    withdrawProcessingEfps()
    handleEfpsProcess(id)
};
export const recycleProcessingReleaseGroundEfps = async () => {
    const processingEfps = processingData.value[0];
    if (processingEfps && processingEfps.id !== undefined) {
        processingEfps.status = 5;
        await releaseGroundEfpsStore.updateData(processingEfps).then(() => {
            MessagePlugin.success("回收成功");
        })
    } else {
        MessagePlugin.error("未找到正在处理的进程单");
    }
}




export const transferEfps = () => {
        
    // 出港进程单
    if (nowProcessingData.value[0]?.type == 0) {
        const newEfps = ref<ReleaseGroundEfpsData>({})
        newEfps.value = { ...nowProcessingData.value[0] }
        newEfps.value.status = 1
        towerEfpsStore.addData(newEfps.value).then(() => {
            MessagePlugin.success('已移交至塔台席')
        })
        // 放行地面合并席将进程单调整为已移交
        releaseGroundEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            status: 3
        })
        cooperaMsgStore.addData({
            header: `航班：${nowProcessingData.value[0].a1}移交成功`,
            content: `放行地面合并席已移交航班给塔台席`,
            theme: 'success',
            status: 0,
        });
        return
    }
    if (nowProcessingData.value[0]?.type == 1) {
        // 放行地面合并席将进程单调整为已移交
        releaseGroundEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            status: 3
        })
        // 释放跑道资源
        // 1.先通过flightInfo查询到航班id
        flightInfoStore.searchData({ flightNumber: nowProcessingData.value[0]?.a1 }).then(() => {
            if(flightInfoStore.searchResultData.length == 0){
                MessagePlugin.error('未找到该航班')
            }else{
                var flight = flightInfoStore.searchResultData[0] as any
                var flightId = flight.id as number
                // 2.通过id去删除关联表的数据
                flightRunwayStore.deleteData([ flightId ]).then(() => {
                    MessagePlugin.success('释放跑道资源成功')
                })
            }
            })
            cooperaMsgStore.addData({
                header: `航班：${nowProcessingData.value[0].a1}已入库`,
                content: `放行地面合并席已确认飞行器入库`,
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
        return releaseGroundEfpsStore.data.filter((efps: any) =>
            efps.status == status &&
            efps.type == type &&
            formatDate(efps.createtime as string || new Date()/*如果时间未定义，则采用当天的时间*/)?.startsWith(formatDate2(date))
        ).length
    });
}


export const saveStopway = () => {
    if (selectedStopway.value == '') {
        MessagePlugin.warning('请选择停机位')
        return
    }
    flightParkingStandStore.searchData({ parkingStandId: selectedStopway.value }).then(() => {
        if (flightParkingStandStore.searchResultData.length == 0) {// 如果停机位没有航班使用
            flightParkingStandStore.addData({
                flightId: nowProcessingData.value[0]?.id,
                parkingStandId: selectedStopway.value
            })
            releaseGroundEfpsStore.updateData({
                id: nowProcessingData.value[0]?.id,
                e4: selectedStopway.value
            })
        } else {
            MessagePlugin.warning('停机坪已被占用!')
        }
    })
}
export const saveRunway = () => {
    if (selectedRunway.value == '') {
        MessagePlugin.warning('请选择跑道号')
        return
    }
    flightRunwayStore.searchData({ runwayId: selectedRunway.value }).then(() => {
        if (flightRunwayStore.searchResultData.length == 0) {
            flightRunwayStore.addData({
                flightId: nowProcessingData.value[0]?.id,
                runwayId: selectedRunway.value
            })
            releaseGroundEfpsStore.updateData({
                id: nowProcessingData.value[0]?.id,
                de34: selectedRunway.value
            })
        } else {
            MessagePlugin.warning('跑道已被占用!')
        }
    })
}
export const clearStopwayWithRunway = () => {
    releaseGroundEfpsStore.updateData({
        id: nowProcessingData.value[0]?.id,
        e4: '',
        de34: ''
    })
}


