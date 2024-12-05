<template>
    <el-row class="processing">
        <el-col :span="16" style="margin-bottom: 5px;">
            <t-icon name="article"></t-icon>正在处理
        </el-col>
        <el-col :span="2">
            <t-popup content="此操作将会退回至准备队列" placement="top" show-arrow destroy-on-close>
                <t-popconfirm theme="warning" content="您想要撤回处理该进程单吗" :visible="visible1"
                    :cancelBtn="{ content: '取消', size: 'small', theme: 'default', onClick: () => { visible1 = false } }"
                    :confirmBtn="{ content: '确定', size: 'small', theme: 'danger', onClick: handleWithdraw }">
                    <t-button theme="success" size="small" shape="square" @click="visible1 = true"><t-icon
                            name="rollback"></t-icon></t-button>
                </t-popconfirm>
            </t-popup>
        </el-col>
        <el-col :span="2">
            <t-popup content="此操作将会移至回收站" placement="top" show-arrow destroy-on-close>
                <t-popconfirm theme="danger" content="您想要删除该进程单吗" :visible="visible2"
                    :cancelBtn="{ content: '取消', size: 'small', theme: 'default', onClick: () => { visible2 = false } }"
                    :confirmBtn="{ content: '确定', size: 'small', theme: 'danger', onClick: handleRecycle }">
                    <t-button theme="danger" size="small" shape="square"><t-icon name="delete"
                            @click="visible2 = true"></t-icon></t-button>
                </t-popconfirm>
            </t-popup>
        </el-col>
        <el-col :span="2">
            <t-popup content="此操作将会打开历史删除" placement="top" show-arrow destroy-on-close>
                <t-button theme="warning" size="small" shape="square"><t-icon name="delete-time" @click="recycleVisible = true"></t-icon></t-button>
            </t-popup>
        </el-col>
        <el-col :span="2"></el-col>
        <el-scrollbar hight="50px">
            <towerEfps :BackgroundColor="processingBackgroundColor" :efps-data="processingData[0] || {}" />
        </el-scrollbar>
    </el-row>
    <RecyclePanel :visible="recycleVisible" @update:visible="handleRecycleVisibleChange"/>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import towerEfps from '../towerEfps.vue'
import { processingData,withdrawTowerEfps,recycleProcessingTowerEfps } from '@/stores/towerEfps-store'
import RecyclePanel from './recyclePanel.vue';

const recycleVisible = ref(false)
const processingBackgroundColor = ref('lightskyblue')
const visible1 = ref(false)
const visible2 = ref(false)

const handleWithdraw = () => {
    withdrawTowerEfps()
    visible1.value = false
}
const handleRecycle = () => {
    recycleProcessingTowerEfps()
    visible2.value = false
}
const handleRecycleVisibleChange = () => {
    recycleVisible.value = !recycleVisible.value
}
</script>
<style lang="scss" scoped>
.processing {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.594);
    justify-content: center;
    border-radius: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 3px;
}
</style>