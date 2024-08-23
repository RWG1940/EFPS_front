<template>
    <el-row class="processing">
        <el-col :span="16" style="margin-bottom: 5px;" >
            <t-icon name="article"></t-icon>正在处理
        </el-col>
        <el-col :span="2">
            <t-popup content="此操作将会退回至准备队列" placement="top" show-arrow destroy-on-close>
                <t-popconfirm theme="warning" content="您想要撤回处理该进程单吗" confirm-btn="确认" cancel-btn="取消">
                    <t-button theme="success" size="small" shape="square"><t-icon name="rollback"></t-icon></t-button>
                </t-popconfirm>
            </t-popup>
        </el-col>
        <el-col :span="2">
            <t-popup content="此操作将会移至回收站" placement="top" show-arrow destroy-on-close>
                <t-popconfirm theme="danger" content="您想要删除该进程单吗" confirm-btn="确认" cancel-btn="取消">
                    <t-button theme="danger" size="small" shape="square"><t-icon name="delete"></t-icon></t-button>
                </t-popconfirm>
            </t-popup>
        </el-col>
        <el-col :span="2">
            <t-popup content="此操作将会打开历史删除" placement="top" show-arrow destroy-on-close>
                <t-button theme="warning" size="small" shape="square"><t-icon name="delete-time"></t-icon></t-button>
            </t-popup>
        </el-col>
        <el-col :span="2"></el-col>
        <areaEfps :BackgroundColor="processingBackgroundColor" />
    </el-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import areaEfps from '../areaEfps.vue'

const processingBackgroundColor = ref('lightskyblue')
</script>
<style lang="scss" scoped>
.processing {
    width: 100%;
    background-color: rgba(220, 220, 220, 0.594);
    justify-content: center;
    border-radius: 5px;
    padding: 3px;
}
</style>