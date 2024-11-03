<template>
    <t-card hover-shadow>
        <div class="search-container">
            <t-row :gutter="10">
                <t-col :span="1">
                    <t-select v-model="searchData.name" placeholder="空域" :options="store.airSpaceNameOptions"></t-select>
                </t-col>
                <t-col :span="1">
                    <t-select v-model="searchData.theme" placeholder="主题" :options="store.eventThemeOptions"></t-select>
                </t-col>
                <t-col :span="3">
                    <t-date-range-picker :value="[store.createTime1, store.createTime2]" placeholder="创建日期范围"
                        enable-time-picker allow-input clearable @pick="onPick1" @change="onChange1" />
                </t-col>
                <t-col :span="3">
                    <t-date-range-picker :value="[store.updateTime1, store.updateTime2]" placeholder="更新日期范围"
                        enable-time-picker allow-input clearable @pick="onPick2" @change="onChange2" />
                </t-col>
                <t-col :span="4">
                    <t-date-range-picker :value="[store.startTime, store.endTime]" placeholder="开始结束日期范围" enable-time-picker
                        allow-input clearable @pick="onPick3" @change="onChange3" />
                </t-col>
            </t-row>
            <t-row style="margin-top: 10px;" :gutter="10">
                <t-col :span="2">
                    <t-input v-model="searchData.title" placeholder="标题" clearable />
                </t-col>
                <t-col :span="2">
                    <t-input v-model="searchData.detail" placeholder="详情"></t-input>
                </t-col>
                <t-col :span="1">
                    <t-select v-model="searchData.type" :options="store.eventTypeOptions" placeholder="类型" />
                </t-col>
                <t-col :span="1">
                    <t-select v-model="searchData.level" :options="store.eventLevelOptions" placeholder="等级" />
                </t-col>
                <t-col :span="1">
                    <t-select v-model="searchData.status" placeholder="状态" :options="store.eventStatusOptions"></t-select>
                </t-col>
                <t-button theme="primary" @click="store.searchAirSpaceEvent(searchData)">搜索</t-button>
                <t-button theme="default" style="margin-left: 10px;" @click="resetSearch">重置</t-button>
                <t-button theme="default" shape='circle' style="margin-left: 10px;" @click="addVisible = true">
                    <t-icon name="add"></t-icon>
                </t-button>
                <t-button theme="default" shape='circle' style="margin-left: 10px;" @click="handleDelete()">
                    <t-icon name="delete"></t-icon>
                </t-button></t-row>
        </div>
        <el-table :data="store.airSpaceEventPage" style="width: 165vh" stripe border
            @selection-change="store.handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="id" label="ID" width="120" sortable></el-table-column>
            <el-table-column prop="name" fixed label="空域名称" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="theme" label="主题" width="120" show-overflow-tooltip>
                <template #default="scope">
                    <el-tag effect="plain"
                        :type="scope.row.theme == 'warning' ? 'warning' : scope.row.theme == 'primary' ? 'primary' : scope.row.theme == 'danger' ? 'danger' : 'info'">
                        {{ scope.row.theme == 'danger' ? '危险' : scope.row.theme == 'primary' ? '通知' : scope.row.theme ==
                            'warning' ? '警告' : '' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="120" show-overflow-tooltip>
                <template #default="scope">
                    <el-tag :type="scope.row.type == 1 ? 'primary' : 'warning'" effect="dark">{{ scope.row.type == 1 ?
                        '空域管制' : '空域通知' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="level" label="等级" width="120" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.level == 1 ? '一级' : scope.row.level == 2 ? '二级' : '三级' }}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="250" show-overflow-tooltip></el-table-column>
            <el-table-column prop="starttime" label="开始时间" width="120" show-overflow-tooltip sortable></el-table-column>
            <el-table-column prop="endtime" label="结束时间" width="120" show-overflow-tooltip sortable></el-table-column>
            <el-table-column prop="status" label="状态" width="120" show-overflow-tooltip>
                <template #default="scope">
                    <el-tag :type="scope.row.status === '待发布' ? 'info' : scope.row.status === '进行中' ? 'primary' : 'success'">{{
                        scope.row.status === '待发布' ? '待发布' : scope.row.status === '进行中' ? '进行中' : '已完成' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createtime" label="创建时间" width="120" show-overflow-tooltip sortable></el-table-column>
            <el-table-column prop="updatetime" label="更新时间" width="120" show-overflow-tooltip sortable></el-table-column>
            <el-table-column prop="detail" label="详情" width="250" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <t-popconfirm content="确认删除吗" @confirm="store.deleteAirSpaceEventById([scope.row.id])" theme="danger">
                        <el-button size="small" type="danger">删除</el-button>
                    </t-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <t-pagination style="margin-top: 10px;" v-model="store.currentPage" v-model:pageSize="store.pageSize"
            :total="store.airSpaceEventPage.length" size="small" theme="simple" @page-size-change="onPageSizeChange"
            @current-change="onCurrentChange" />

        <airSpaceEventAdd v-model:visible="addVisible" @update:visible="handleAddVisibleChange" />
        <airSpaceEventEdit v-model:visible="editVisible" @update:visible="handleEditVisibleChange" />

    </t-card>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useAirSpaceEventStore } from '@/stores/airSpaceEvent-store';
import { MessagePlugin } from 'tdesign-vue-next';
import airSpaceEventEdit from '@/components/airSpaceTrendsPage/airSpaceEventEdit.vue';
import airSpaceEventAdd from '@/components/airSpaceTrendsPage/airSpaceEventAdd.vue'
import type { DateRangePickerProps } from 'tdesign-vue-next';

const store = useAirSpaceEventStore();
const onPick1: DateRangePickerProps['onPick'] = (value: any, context) => {
    store.createTime1 = value[0]
    store.createTime2 = value[1]
}
const onChange1: DateRangePickerProps['onChange'] = (value: any, context) => {
    store.createTime1 = value[0]
    store.createTime2 = value[1]
};
const onPick2: DateRangePickerProps['onPick'] = (value: any, context) => {
    store.updateTime1 = value[0]
    store.updateTime2 = value[1]
}
const onChange2: DateRangePickerProps['onChange'] = (value: any, context) => {
    store.updateTime1 = value[0]
    store.updateTime2 = value[1]
};
const onPick3: DateRangePickerProps['onPick'] = (value: any, context) => {
    store.startTime = value[0]
    store.endTime = value[1]
}
const onChange3: DateRangePickerProps['onChange'] = (value: any, context) => {
    store.startTime = value[0]
    store.endTime = value[1]
};
const searchData = ref({
    name: null,
    theme: null,
    type: null,
    level: null,
    title: null,
    starttime: null,
    endtime: null,
    status: null,
    createtime: null,
    updatetime: null,
    detail: null,
})
const resetSearchData = ref({
    name: null,
    theme: null,
    type: null,
    level: null,
    title: null,
    starttime: null,
    endtime: null,
    status: null,
    createtime: null,
    updatetime: null,
    detail: null,
})
const addVisible = ref(false)
const editVisible = ref(false)
onMounted(() => {
    store.getAirSpaceEventPage()
    console.log(store.airSpaceEventPage)
})

const onPageSizeChange = (pageSize: number) => {
    store.pageSize = pageSize
    store.getAirSpaceEventPage()
}
const onCurrentChange = (page: number) => {
    store.currentPage = page
    store.getAirSpaceEventPage()
}
const handleDelete = async () => {
    if (store.selectedIds.length > 0) {
        await store.deleteAirSpaceEventById(store.selectedIds)
    } else {
        MessagePlugin.warning('请选择要删除的项目')
    }
};
const handleEdit = (row: any) => {

    store.updateAirSpaceEventForm = { ...row };
    editVisible.value = true
}
const handleAddVisibleChange = (visible: boolean) => {
    addVisible.value = false
};
const handleEditVisibleChange = (visible: boolean) => {
    editVisible.value = false
};
const resetSearch = async () => {
    resetSearchData.value = {
        name: null,
        theme: null,
        type: null,
        level: null,
        title: null,
        starttime: null,
        endtime: null,
        status: null,
        createtime: null,
        updatetime: null,
        detail: null,
    };
    searchData.value = resetSearchData.value
    store.createTime1 = ''
    store.createTime2 = ''
    store.updateTime1 = ''
    store.updateTime2 = ''
    store.startTime = ''
    store.endTime = ''
    await store.getAirSpaceEventPage()
};
</script>
<style scoped>
.search-container {
    margin-bottom: 10px;
}
</style>