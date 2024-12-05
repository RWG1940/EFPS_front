import { ref, reactive } from 'vue';
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { towerEfpsApi } from '@/api/services/towerEfps-api';
import { createCRUDStore } from '@/stores/utils/createCRUDStore';
import type { TowerEfpsData } from '@/types/towerEfpsTypes';
import { formatDate,formatDate2 } from '@/utils/moment';
import moment from 'moment';
import { towerEfpsCoopOptions,towerEfpsRouteOptions,towerEfpsInstructionOptions,towerEfpsTagOptions } from '@/types/towerEfpsTypes'

export const useTowerEfpsStore = createCRUDStore('towerEfps', towerEfpsApi);
export const towerEfpsStore = useTowerEfpsStore();
export const towerEfpsAddFormData = ref<TowerEfpsData>({});
export const towerEfpsEditFormData = ref<TowerEfpsData>({});
export const flyCommand = ref('');
// 进程单修改的状态
export const selectedArea = ref('');
export const selectedItem = ref('');
export const inputOperationsValue = ref('');
export const itemOptions = ref<{ label: string; value: string }[]>([]);

//指令区快捷操作的状态
export const hightTypeRadio = ref('1');
export const inputHightValue = ref('');
export const inputDE3Value = ref('')
//过滤后的表格数据
export const filteredArrivalEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 1 && efps.type === 1);
});
export const filteredDepartureEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 1 && efps.type === 0);
});
export const filteredTransferredArrivalEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 3 && efps.type === 1);
});
export const filteredTransferredDepartureEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 3 && efps.type === 0);
});
export const filteredRecycleEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 5);
});
export const filteredCompletedEfps = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 4);
});
//正在处理的进程单数据
export const processingData = computed(() => {
    return towerEfpsStore.data.filter((efps: any) => efps.status === 2 && (efps.type === 0 || efps.type === 1));
});
export const withdrawTowerEfps = async () => {
    const processingEfps = processingData.value[0];
    if (processingEfps && processingEfps.id !== undefined) {
        processingEfps.status = 1;
        await towerEfpsStore.updateData(processingEfps).then(() => {
            MessagePlugin.success("撤回成功");
        })
    } else {
        MessagePlugin.error("未找到正在处理的进程单");
    }
}

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

// 根据所选的区域更新数据项选项
export const onAreaChange = () => {
    switch (selectedArea.value) {
        case '1':
            itemOptions.value = towerEfpsTagOptions;
            break;
        case '2':
            itemOptions.value = towerEfpsInstructionOptions;
            break;
        case '3':
            itemOptions.value = towerEfpsRouteOptions;
            break;
        case '4':
            itemOptions.value = towerEfpsCoopOptions;
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
        const areaEfps = {
            id: processingData.value[0]?.id,
            [selectedItem.value]: inputOperationsValue.value,
        };
        towerEfpsStore.updateData(areaEfps)
    }
}

// 进程单指令区快捷操作
export const keepHight = () => {
    if (inputHightValue.value == '') {
        MessagePlugin.warning('未输入数据！')
    } else {
        if (hightTypeRadio.value == '1') {
            const areaEfps = {
                id: processingData.value[0]?.id,
                b2: `${inputHightValue.value}`,
            };
            towerEfpsStore.updateData(areaEfps)
        } else {
            const areaEfps = {
                id: processingData.value[0]?.id,
                b2: `H${inputHightValue.value}`,
            };
            towerEfpsStore.updateData(areaEfps)
        }
    }
}

export const riseHight = () => {
    if (inputHightValue.value == '') {
        MessagePlugin.warning('未输入数据！')
    } else {
        if (hightTypeRadio.value == '1') {
            const areaEfps = {
                id: processingData.value[0]?.id,
                b2: `${inputHightValue.value}↑`,
            };
            towerEfpsStore.updateData(areaEfps)
        } else {
            const areaEfps = {
                id: processingData.value[0]?.id,
                b2: `H${inputHightValue.value}↑`,
            };
            towerEfpsStore.updateData(areaEfps)
        }
    }
}

export const declineHight = () => {
    if (inputHightValue.value == '') {
        MessagePlugin.warning('未输入数据！')
    } else {
        if (hightTypeRadio.value == '1') {
            const areaEfps = {
                id: processingData.value[0]?.id,
                b2: `${inputHightValue.value}↓`,
            };
            towerEfpsStore.updateData(areaEfps)
        } else {
            const areaEfps = {
                id: processingData.value[0]?.id,
                b2: `H${inputHightValue.value}↓`,
            };
            towerEfpsStore.updateData(areaEfps)
        }
    }
}


export const setConflictFlag = () => {
    if (processingData.value[0]?.c4 == 'W') {
        const areaEfps = {
            id: processingData.value[0]?.id,
            c4: '',
        };
        towerEfpsStore.updateData(areaEfps)
    } else {
        const areaEfps = {
            id: processingData.value[0]?.id,
            c4: 'W',
        };
        towerEfpsStore.updateData(areaEfps)
    }
}

export const setDiversion = () => {
    if (processingData.value[0]?.c4 === '备降') {
        const areaEfps = {
            id: processingData.value[0]?.id,
            c4: '',
        };
        towerEfpsStore.updateData(areaEfps)
    } else {
        const areaEfps = {
            id: processingData.value[0]?.id,
            c4: '备降',
        };
        towerEfpsStore.updateData(areaEfps)
    }
}

export const setReturnflight = () => {
    if (processingData.value[0]?.c4 === '返航') {
        const areaEfps = {
            id: processingData.value[0]?.id,
            c4: '',
        };
        towerEfpsStore.updateData(areaEfps)
    } else {
        const areaEfps = {
            id: processingData.value[0]?.id,
            c4: '返航',
        };
        towerEfpsStore.updateData(areaEfps)
    }
}

export const setVIP = () => {
    if (processingData.value[0]?.c4 === 'VIP') {
        const towerEfps = {
            id: processingData.value[0]?.id,
            c4: '',
        };
        towerEfpsStore.updateData(towerEfps)
    } else {
        const towerEfps = {
            id: processingData.value[0]?.id,
            c4: 'VIP',
        }
        towerEfpsStore.updateData(towerEfps)
    }
}

export const setCreateTime = () => {
    towerEfpsStore.updateData({
        id: processingData.value[0]?.id,
        createtime: moment().format('YYYY-MM-DD HH:mm:ss')
    })
}

export const sendFlyCommand = () => {
    towerEfpsStore.updateData({
        id: processingData.value[0]?.id,
        c2: flyCommand.value
    })
}

export const transferEfps = () => {
    towerEfpsStore.updateData({
        id: processingData.value[0]?.id,
        status: 3
    })
}

export const saveDE3 = () => {
    towerEfpsStore.updateData({
        id: processingData.value[0]?.id,
        de3: inputDE3Value.value
    })
}
export const getOffsetDate = (days: number): Date => {
    return new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
}

export const filterEfpsByStatusAndDate = (status: number, type: number, date: Date) => {
    return computed(() => {
        return towerEfpsStore.data.filter((efps:any) =>
            efps.status == status &&
            efps.type == type &&
            formatDate(efps.createtime as string || new Date()/*如果时间未定义，则采用当天的时间*/)?.startsWith(formatDate2(date))
        ).length
    });
}
