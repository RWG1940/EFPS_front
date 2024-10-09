<template>
    <t-card hover-shadow>
        <el-table :data="tableData" style="width: 165vh" stripe border>
            <el-table-column prop="name" fixed label="空域名称" width="120"></el-table-column>
            <el-table-column prop="theme" label="主题" width="120"></el-table-column>
            <el-table-column prop="type" label="类型" width="120"></el-table-column>
            <el-table-column prop="level" label="等级" width="120"></el-table-column>
            <el-table-column prop="title" label="标题" width="120"></el-table-column>
            <el-table-column prop="starttime" label="开始时间" width="120"></el-table-column>
            <el-table-column prop="endtime" label="结束时间" width="120"></el-table-column>
            <el-table-column prop="status" label="状态" width="120"></el-table-column>
            <el-table-column prop="createtime" label="创建时间" width="120"></el-table-column>
            <el-table-column prop="updatetime" label="更新时间" width="120"></el-table-column>
            <el-table-column prop="detail" label="详情" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
                <template #default="scope">
                    <t-button size="small" theme="danger">删除</t-button>
                    <t-button size="small" theme="default" style="margin-left: 5px;">编辑</t-button>
                    <t-button size="small" style="margin-left: 5px;" theme="default">详情</t-button>
                </template>
            </el-table-column>
        </el-table>
    </t-card>
</template>
<script setup lang="ts">

import { ref } from 'vue'



const tableData = ref([
    {
        name: '1',
        theme: '2',
        type: '3',
        level: '4',
        title: '5',
        starttime: '6',
        endtime: '7',
        status: '8',
        createtime: '9',
        updatetime: '10',
        detail: '11'
    },
    {
        name: '1',
        theme: '2',
        type: '3',
        level: '4',
        title: '5',
        starttime: '6',
        endtime: '7',
        status: '8',
        createtime: '9',
        updatetime: '10',
        detail: '11'
    },
])

</script>
<style scoped>
  
</style>