import { ref, reactive, watch, onMounted } from 'vue';
import { computed } from 'vue';
import { Alert, MessagePlugin } from 'tdesign-vue-next';
import { towerEfpsApi } from '@/api/services/towerEfps-api';
import { createCRUDStore } from '@/stores/utils/createCRUDStore';
import type { TowerEfpsData } from '@/types/towerEfpsTypes';
import { formatDate, formatDate2 } from '@/utils/moment';
import { releaseGroundEfpsStore } from './releaseGroundEfps-store';
import { areaEfpsStore } from './areaEfps-store';
import { flightRunwayStore } from './flightRunway-store';
import { flightParkingStandStore } from './flightParkingStand-store';
import { flightInfoStore } from './flightInfo-store';
import { cooperaMsgStore } from '@/stores/cooperaMsg-store';
import { parkingStandStore } from './parkingStand-store';
import { runwayStore } from './runway-store';


export const useTowerEfpsStore = createCRUDStore('towerEfps', towerEfpsApi);
export const towerEfpsStore = useTowerEfpsStore();
export const towerEfpsAddFormData = ref<TowerEfpsData>({});
export const search = ref('');
export const selectedProgram = ref('');
export const selectedRunway = ref('');
export const selectedStopway = ref('');
export const d1Lhalf = ref('');
export const d1Rhalf = ref('');
export const b2Lhalf = ref('');
export const b2Rhalf = ref('');
//过滤后的表格数据
export const filteredArrivalEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 1 && efps.type === 1).sort((a: any, b: any) => a.fg1 - b.fg1) as TowerEfpsData[];
});
export const filteredDepartureEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 1 && efps.type === 0).sort((a: any, b: any) => a.fg1 - b.fg1) as TowerEfpsData[];
});
export const filteredEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) =>
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
        efps.status === 1 && (efps.type === 0 || efps.type === 1)) as TowerEfpsData[];
});
export const filteredTransferredArrivalEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 3 && efps.type === 1) as TowerEfpsData[];
});
export const filteredTransferredDepartureEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 3 && efps.type === 0) as TowerEfpsData[];
});
export const filteredRecycleEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 5) as TowerEfpsData[];
});
export const filteredCompletedEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 4) as TowerEfpsData[];
});


//正在处理队列中的进程单数据
export const processingData = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 2 && (efps.type === 0 || efps.type === 1)) as TowerEfpsData[];
});
// 正在处理的进程单数据
export const nowProcessingData = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 6 && (efps.type === 0 || efps.type === 1)) as TowerEfpsData[];
});
export const filterTableData = computed(() => {
    return towerEfpsStore.data.filter(
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
    ) as TowerEfpsData[]
})
export const handleEfpsProcess = (id: string) => {
    const processingEfps = nowProcessingData.value[0];
    if (processingEfps != undefined) {
        const towerEfps = {
            id: id,
            status: 2,
        };
        towerEfpsStore.updateData(towerEfps);
        MessagePlugin.info("当前存在处理中的进程单，已进入处理队列");
    } else {
        const towerEfps = {
            id: id,
            status: 6,
        };
        towerEfpsStore.updateData(towerEfps);
    }
}


export const lastestProcessingData = () => {
    const lastestProcessingEfps = processingData.value[0];
    if (lastestProcessingEfps != undefined) {
        const towerEfps = {
            id: lastestProcessingEfps.id,
            status: 6,
        };
        towerEfpsStore.updateData(towerEfps);
        MessagePlugin.info("处理队列中的进程单已自动进入处理状态");
    }
}

export const withdrawTowerEfps = async () => {
    const processingEfps = nowProcessingData.value[0];
    if (processingEfps && processingEfps.id !== undefined) {
        processingEfps.status = 1;
        await towerEfpsStore.updateData(processingEfps).then(() => {
            MessagePlugin.success("撤回成功");
        })
    } else {
        MessagePlugin.error("未找到正在处理的进程单");
    }
}
export const withdrawSelectedTowerEfps = async (id: string) => {
    const processingEfps = { id: id, status: 1 }
    await towerEfpsStore.updateData(processingEfps).then(() => {
        MessagePlugin.success("撤回成功");
    })
}
export const withdrawProcessingEfps = async () => {
    const processingEfps = nowProcessingData.value[0];
    if (processingEfps && processingEfps.id !== undefined) {
        processingEfps.status = 2;
        await towerEfpsStore.updateData(processingEfps).then(() => {
        })
    } else {
        MessagePlugin.error("未找到正在处理的进程单");
    }
}
export const handleProcessingEfpsFirst = (id: string) => {
    withdrawProcessingEfps()
    handleEfpsProcess(id)
};
export const recycleProcessingTowerEfps = async () => {
    const processingEfps = processingData.value[0];
    if (processingEfps && processingEfps.id !== undefined) {
        processingEfps.status = 5;
        await towerEfpsStore.updateData(processingEfps).then(() => {
            MessagePlugin.success("回收成功");
        })
    } else {
        MessagePlugin.error("未找到正在处理的进程单");
    }
}



export const setConflictFlag = () => {
    if (nowProcessingData.value[0]?.c4 == 'W') {
        const areaEfps = {
            id: nowProcessingData.value[0]?.id,
            c4: '',
        };
        towerEfpsStore.updateData(areaEfps)
    } else {
        const areaEfps = {
            id: nowProcessingData.value[0]?.id,
            c4: 'W',
        };
        towerEfpsStore.updateData(areaEfps)
    }
}

export const setDiversion = () => {
    if (nowProcessingData.value[0]?.c4 === '备降') {
        const areaEfps = {
            id: nowProcessingData.value[0]?.id,
            c4: '',
        };
        towerEfpsStore.updateData(areaEfps)
    } else {
        const areaEfps = {
            id: nowProcessingData.value[0]?.id,
            c4: '备降',
        };
        towerEfpsStore.updateData(areaEfps)
    }
}

export const setReturnflight = () => {
    if (nowProcessingData.value[0]?.c4 === '返航') {
        const areaEfps = {
            id: nowProcessingData.value[0]?.id,
            c4: '',
        };
        towerEfpsStore.updateData(areaEfps)
    } else {
        const areaEfps = {
            id: nowProcessingData.value[0]?.id,
            c4: '返航',
        };
        towerEfpsStore.updateData(areaEfps)
    }
}

export const setVIP = () => {
    if (nowProcessingData.value[0]?.c4 === 'VIP') {
        const towerEfps = {
            id: nowProcessingData.value[0]?.id,
            c4: '',
        };
        towerEfpsStore.updateData(towerEfps)
    } else {
        const towerEfps = {
            id: nowProcessingData.value[0]?.id,
            c4: 'VIP',
        }
        towerEfpsStore.updateData(towerEfps)
    }
}


export const transferEfps = () => {


    // 进港进程单
    if (nowProcessingData.value[0]?.type == 1) {
        // 地面添加进程单
        const newEfps = ref<TowerEfpsData>({})
        newEfps.value = { ...nowProcessingData.value[0] }
        newEfps.value.status = 1
        releaseGroundEfpsStore.addData(newEfps.value).then(() => {
            MessagePlugin.success('已移交至放行地面合并席')
        })
        // 塔台将进程单调整为已移交
        towerEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            status: 3
        })
        cooperaMsgStore.addData({
            header: `航班：${nowProcessingData.value[0].a1}移交成功`,
            content: `塔台管制席已移交航班给放行地面合并席`,
            theme: 'success',
            status: 0,
        });
        return
    }
    // 出港进程单
    if (nowProcessingData.value[0]?.type == 0) {
        const newEfps = ref<TowerEfpsData>({})
        newEfps.value = { ...nowProcessingData.value[0] }
        newEfps.value.status = 1
        areaEfpsStore.addData(newEfps.value).then(() => {
            MessagePlugin.success('已移交至区域席')
        })
        // 塔台将进程单调整为已移交
        towerEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            status: 3
        })
        // 释放跑道、停机位资源
        // 1.先通过flightInfo查询到航班id
        flightInfoStore.searchData({ flightNumber: nowProcessingData.value[0]?.a1 }).then(() => {
            if(flightInfoStore.searchResultData.length == 0){
                MessagePlugin.error('未找到该航班')
            }else{
                var flight = flightInfoStore.searchResultData[0] as any
                var flightId = flight.id as number
                // 2.通过id去删除关联表的数据
                flightParkingStandStore.deleteData([ flightId ]).then(() => {
                    MessagePlugin.success('释放停机位资源成功')
                })
                flightRunwayStore.deleteData([ flightId ]).then(() => {
                    MessagePlugin.success('释放跑道资源成功')
                })
            }
            })
            cooperaMsgStore.addData({
                header: `航班：${nowProcessingData.value[0].a1}移交成功`,
                content: `塔台管制席已移交航班给区域管制席`,
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
        return towerEfpsStore.data.filter((efps: any) =>
            efps.status == status &&
            efps.type == type &&
            formatDate(efps.createtime as string || new Date()/*如果时间未定义，则采用当天的时间*/)?.startsWith(formatDate2(date))
        ).length
    });
}

export const permitFly = () => {
    if (selectedProgram.value == '') {
        MessagePlugin.warning('请选择选择程序')
        return
    }
    // todo 这里根据程序号自动填写跑道号以及停机位
    towerEfpsStore.updateData({
        id: nowProcessingData.value[0]?.id,
        c3: selectedProgram.value
    })
}
export const cancelPermit = () => {
    towerEfpsStore.updateData({
        id: nowProcessingData.value[0]?.id,
        c3: ' '
    })
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
            towerEfpsStore.updateData({
                id: nowProcessingData.value[0]?.id,
                e4: selectedStopway.value
            })
            parkingStandStore.updateData({
                id: selectedStopway.value,
                status: 2
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
            towerEfpsStore.updateData({
                id: nowProcessingData.value[0]?.id,
                de34: selectedRunway.value
            })
            runwayStore.updateData({
                code: selectedRunway.value,
                status: 2
            })
        } else {
            MessagePlugin.warning('跑道已被占用!')
        }
    })
}
export const clearStopwayWithRunway = () => {
    towerEfpsStore.updateData({
        id: nowProcessingData.value[0]?.id,
        e4: '',
        de34: ''
    })
}
export const saveExit = () => {
    if (nowProcessingData.value[0]?.de31 == 'P/B') {
        towerEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            de31: ''
        })
        return
    }
    towerEfpsStore.updateData({
        id: nowProcessingData.value[0]?.id,
        de31: 'P/B'
    })
}
export const saveStart = () => {
    if (nowProcessingData.value[0]?.de32 == 'S/T') {
        towerEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            de32: ''
        })
        return
    }
    towerEfpsStore.updateData({
        id: nowProcessingData.value[0]?.id,
        de32: 'S/T'
    })
}
export const saveTaxi = () => {
    if (nowProcessingData.value[0]?.de33 == 'R/W') {
        towerEfpsStore.updateData({
            id: nowProcessingData.value[0]?.id,
            de33: ''
        })
        return
    }
    towerEfpsStore.updateData({
        id: nowProcessingData.value[0]?.id,
        de33: 'R/W'
    })
}


