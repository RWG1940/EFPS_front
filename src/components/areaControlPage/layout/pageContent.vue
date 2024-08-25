<template>
    <el-row class="content">
        <el-col :span="16">
            <el-scrollbar height="620px">
                <el-row style="margin-top: 10px;">
                    <el-col :span="3.5">
                        <p style="margin-top: 0;text-decoration: underline blue 10px;font-weight: bold;margin-left: 10px;">
                            <t-icon name="flight-landing"></t-icon>进港
                            <t-button class="rround" theme="default" shape="circle" @click="store.fetchAllAreaEfpsData"
                                style="margin-left: 10px;"><t-icon name='refresh'></t-icon></t-button>
                            <t-button class="rround" theme="default" shape="circle" @click="handleAddVisibleChange"><t-icon
                                    name='add'></t-icon></t-button>
                        </p>
                    </el-col>
                    <el-col :span="3.5"
                        style="width:170px;background-color: aliceblue;border-radius: 25px;padding: 15px;height: 40px;">
                        <p style="font-size: xx-small;margin: -6px;"><t-icon name="next"></t-icon>下一个进程单准备</p>
                        <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="60"
                            :status="'active'" style="font-size: xx-small;" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="arrival-prepare-container">
                            <el-table :data="store.filteredArrivalEfps" style="width: 100%" max-height="250">
                                <el-table-column label="准备中的进程单" width="480" sortable>
                                    <template #default="scope">
                                        <div style="display: flex; align-items: center;flex-direction: column;">
                                            <t-popconfirm theme="default" content="您想要处理该进程单吗" :visible="visibleMap[scope.row.id]"
                                                :cancelBtn="{ content: '取消', size: 'small', theme: 'default', onClick: () => { visibleMap[scope.row.id] = false } }"
                                                :confirmBtn="{ content: '确定', size: 'small', theme: 'primary', onClick: () => handleArrivalEfpsProcess(scope.row.id) }">
                                                <areaEfps :BackgroundColor="prepareBackgroundColor"
                                                    :efpsData="scope.row || {}" @click="togglePopconfirm(scope.row.id)" />
                                            </t-popconfirm>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="arrival-handled-container">
                            <el-table :data="store.filteredTransferredArrivalEfps" style="width: 100%" max-height="250">
                                <el-table-column label="已移交的进程单" width="480" sortable>
                                    <template #default="scope">
                                        <div style="display: flex; align-items: center;flex-direction: column;">
                                            <areaEfps :BackgroundColor="handledBackgroundColor"
                                                :efpsData="scope.row || {}" />
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 10px;">
                    <el-col :span="3.5">
                        <p style="margin-top: 0;text-decoration: underline blue 10px;font-weight: bold;margin-left: 10px;">
                            <t-icon name="flight-takeoff"></t-icon>出港
                            <t-button class="rround" theme="default" shape="circle" @click="store.fetchAllAreaEfpsData"
                                style="margin-left: 10px;"><t-icon name='refresh'></t-icon></t-button>
                            <t-button class="rround" theme="default" shape="circle" @click="handleAddVisibleChange"><t-icon
                                    name='add'></t-icon></t-button>
                        </p>
                    </el-col>
                    <el-col :span="3.5"
                        style="width:170px;background-color: aliceblue;border-radius: 25px;padding: 15px;height: 40px;">
                        <p style="font-size: xx-small;margin: -6px;"><t-icon name="next"></t-icon>下一个进程单准备</p>
                        <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="60"
                            :status="'active'" style="font-size: xx-small;" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="departure-prepare-container">
                            <el-table :data="store.filteredDepartureEfps" style="width: 100%" max-height="250">
                                <el-table-column label="准备中的进程单" width="480" sortable>
                                    <template #default="scope">
                                        <div style="display: flex; align-items: center;flex-direction: column;">
                                            <t-popconfirm theme="default" content="您想要处理该进程单吗" :visible="visibleMap[scope.row.id]"
                                                :cancelBtn="{ content: '取消', size: 'small', theme: 'default', onClick: () => { visibleMap[scope.row.id] = false }  }"
                                                :confirmBtn="{ content: '确定', size: 'small', theme: 'primary', onClick: () => handleDepartureEfpsProcess(scope.row.id) }">
                                                <areaEfps :BackgroundColor="prepareBackgroundColor"
                                                    :efps-data="scope.row || {}" @click="togglePopconfirm(scope.row.id)" />
                                            </t-popconfirm>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="departure-handled-container">
                            <el-table :data="store.filteredTransferredDepartureEfps" style="width: 100%" max-height="250">
                                <el-table-column label="已移交的进程单" width="480" sortable>
                                    <template #default="scope">
                                        <div style="display: flex; align-items: center;flex-direction: column;">
                                            <areaEfps :BackgroundColor="handledBackgroundColor"
                                                :efps-data="scope.row || {}" />
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
                <p style="margin-top: 10px;text-decoration: underline blue 10px;font-weight: bold;margin-left: 10px;">
                    <t-icon name="desktop-1"></t-icon>动态
                    <t-button class="rround" theme="default" shape="circle"><t-icon name='refresh'></t-icon></t-button>
                </p>
                <el-row>
                    <trendsTool />
                </el-row>
                <p style="margin-top: 10px;text-decoration: underline blue 10px;font-weight: bold;margin-left: 10px;">
                    <t-icon name="info-circle"></t-icon>信息
                    <t-button class="rround" theme="default" shape="circle"><t-icon name='refresh'></t-icon></t-button>
                </p>
                <el-row>
                    <msgTool />
                </el-row>
                <el-row style="justify-content: center;">Powered By JDZU</el-row>
            </el-scrollbar>
        </el-col>
        <el-col :span="8">
            <rightControlCenter />
        </el-col>
    </el-row>
    <areaEfpsDataAdd :visible="addVisible" @update:visible="handleAddVisibleChange" />
</template>
<script lang="ts" setup>
import { ref,reactive } from 'vue'
import areaEfps from '@/components/areaControlPage/areaEfps.vue'
import rightControlCenter from '@/components/areaControlPage/rightControlCenter.vue'
import msgTool from '@/components/areaControlPage/msgTool.vue'
import trendsTool from '@/components/areaControlPage/trendsTool.vue'
import areaEfpsDataAdd from '../areaEfpsDataAdd.vue'
import { useareaEfpsStore } from '@/stores/areaEfps-store'

const visibleMap = reactive<{ [key: string]: boolean }>({});
const store = useareaEfpsStore()
const addVisible = ref(false)
const prepareBackgroundColor = ref('antiquewhite')
const handledBackgroundColor = ref('lightgreen')

const handleAddVisibleChange = () => {
    addVisible.value = !addVisible.value
}
const togglePopconfirm = (id: string) => {
  visibleMap[id] = !visibleMap[id];
};
const handleArrivalEfpsProcess = (id: string) => {
    const areaEfps = {
        id: id,
        status: 2,
    };
    console.log(id)
    store.updateAreaEfpsData(areaEfps);
    visibleMap[id] = false;
}
const handleDepartureEfpsProcess = (id: string) => {
    const areaEfps = {
        id: id,
        status: 2,
    };
    console.log(id)
    store.updateAreaEfpsData(areaEfps);
    visibleMap[id] = false;
}


</script>
<style lang="scss" scoped>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.rround {
    transition-duration: 0.3s;
}

.rround:hover {
    transition-duration: 0.3s;
    transform: rotate(180deg);
}


.arrival-prepare-container {
    height: 250px;
    width: 480px;
    background-color: white;
    border-radius: 15px;
    padding: 8px;
    margin-left: 10px;
    transition-duration: 0.5s;
}

.arrival-prepare-container:hover {
    box-shadow: 1px 1px 5px 1px grey;
    transition-duration: 0.5s;
}

.arrival-handled-container {
    height: 250px;
    width: 480px;
    background-color: white;
    border-radius: 15px;
    padding: 8px;
    margin-left: 4px;
    transition-duration: 0.5s;
}

.arrival-handled-container:hover {
    box-shadow: 1px 1px 5px 1px grey;
    transition-duration: 0.5s;
}



.departure-prepare-container {
    height: 250px;
    width: 480px;
    background-color: white;
    border-radius: 15px;
    padding: 8px;
    margin-left: 10px;
    transition-duration: 0.5s;
}

.departure-prepare-container:hover {
    box-shadow: 1px 1px 5px 1px grey;
    transition-duration: 0.5s;
}

.departure-handled-container {
    height: 250px;
    width: 480px;
    background-color: white;
    border-radius: 15px;
    padding: 8px;
    margin-left: 4px;
    transition-duration: 0.5s;
}

.departure-handled-container:hover {
    box-shadow: 1px 1px 5px 1px grey;
    transition-duration: 0.5s;
}</style>