<template>
    <div class="wrap">
        <t-row :gutter="20">
            <transition name="m-trans" appear>
                <t-col :span="4.5">
                    <div class="msg">
                        <p class="title"><t-icon name="notification">
                            </t-icon> 已发布的航班动态
                            <t-tooltip content="新增一条动态">
                                <t-button size="small" @click="handleAddVisibleChange"><t-icon
                                        name="add"></t-icon></t-button>
                            </t-tooltip>
                            <t-tooltip content="删除过期的动态">
                                <t-popconfirm theme="default" content="您确定要删除24小时之前的动态吗" :visible="visible1" :confirm-btn="{
                                    content: '确认',
                                    theme: 'warning',
                                    onClick: () => {
                                        store.deleteExpiredAircraftsTrendsData()
                                        visible1 = false
                                    }
                                }" :cancel-btn="{
    content: '我再想想',
    theme: 'default',
    variant: 'outline',
    onClick: () => { visible1 = false }
}">
                                    <t-button size="small" style="margin-left: 5px;" @click="visible1 = true"><t-icon
                                            name="delete-time"></t-icon></t-button>
                                </t-popconfirm>
                            </t-tooltip>
                        </p>
                        <aircraftsTrends />
                    </div>
                </t-col>
            </transition>
            <transition name="m1-trans" appear>
                <t-col :span="7">
                    <div class="msgTable">
                        <p class="title"><t-icon name="root-list">
                            </t-icon> 所有动态
                            <t-tooltip content="新增一条动态">
                                <t-button size="small" theme="default" @click="handleAddVisibleChange"><t-icon
                                        name="add"></t-icon></t-button>
                            </t-tooltip>
                            <t-tooltip content="删除选中的动态">
                                <t-button size="small" theme="default" style="margin-left: 5px;"
                                    @click="store.deleteSelectedAircraftsTrendsData"><t-icon
                                        name="delete"></t-icon></t-button>
                            </t-tooltip>
                        </p>
                        <t-card>
                        <el-table :data="store.filterTableData" max-height="265" style="margin-top: 3px;"
                            @selection-change="store.handleSelectionChange" stripe border>
                            <el-table-column type="selection" width="30" />
                            <el-table-column prop="theme" label="主题" width="70" show-overflow-tooltip :filters="[
                                { text: '通知', value: 'info' },
                                { text: '警告', value: 'warning' },
                                { text: '严重', value: 'error' },
                                { text: '成功', value: 'success' },
                            ]"
                                :filter-method="(value: string, row: AircraftsTrendsData) => { return row.theme === value }"
                                filter-placement="bottom-end">
                                <template #default="scope">
                                    <el-tag
                                        :type="scope.row.theme == 'error' ? 'danger' : scope.row.theme == 'info' ? 'primary' : scope.row.theme == 'warning' ? 'warning' : 'success'"
                                        effect="dark" size="small">
                                        {{ scope.row.theme == 'error' ? '严重' : scope.row.theme == 'info' ? '通知' :
                                            scope.row.theme == 'warning' ? '警告' : '成功' }}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="header" label="标题" width="120" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="content" label="内容" width="180" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="createtime" label="创建时间" width="120" show-overflow-tooltip
                                column-key="createtime" sortable>
                                <template #default="scope">
                                    {{ formatDate(scope.row.createtime) }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="updatetime" label="更新时间" width="120" show-overflow-tooltip
                                column-key="updatetime" sortable>
                                <template #default="scope">
                                    {{ formatDate(scope.row.updatetime) }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态" width="80" :filters="[
                                { text: '已发布', value: 1 },
                                { text: '未发布', value: 0 },

                            ]"
                                :filter-method="(value: number, row: AircraftsTrendsData) => { return row.status === value }"
                                filter-placement="bottom-end">
                                <template #default="scope">
                                    <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'" size="small">
                                        {{ scope.row.status == 1 ? '已发布' : '未发布' }}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="author" label="作者" width="80" show-overflow-tooltip></el-table-column>
                            <el-table-column fixed="right" min-width="120">
                                <template #header>
                                    <el-input v-model="store.search" size="small" placeholder="搜索" />
                                </template>
                                <template #default="scope">
                                    <t-button size="small" theme="default"
                                        @click="() => { store.aircraftsTrendEditFormData = scope.row; handleEditVisibleChange() }">编辑</t-button>
                                    <t-button size="small" theme="danger" style="margin-left: 5px;"
                                        @click="store.deleteAircraftsTrendsData([scope.row.id])">删除</t-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </t-card>
                    </div>
                </t-col>
            </transition>
        </t-row>
        <addAircraftsTrend :visible="addVisible" @update:visible="handleAddVisibleChange" />
        <editAircraftsTrend :visible="editVisible" @update:visible="handleEditVisibleChange" />

    </div>
</template>
<script setup lang="ts">
import aircraftsTrends from '@/components/areaControlPage/trendsTool/aircraftsTrends.vue';
import { useAircraftsTrendsStore } from '@/stores/aircraftsTrends-store';
import { formatDate } from '@/utils/moment'
import addAircraftsTrend from '../components/aircraftsTrendsPage/addAircraftsTrend.vue'
import editAircraftsTrend from '../components/aircraftsTrendsPage/editAircraftsTrend.vue'
import { ref } from 'vue';
import type { AircraftsTrendsData } from '@/stores/aircraftsTrends-store';

const store = useAircraftsTrendsStore();
const addVisible = ref(false)
const editVisible = ref(false)
const visible1 = ref(false)
const handleAddVisibleChange = () => {
    addVisible.value = !addVisible.value
}
const handleEditVisibleChange = () => {
    editVisible.value = !editVisible.value
}
</script>
<style lang="scss" scoped>
.wrap {
    background-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 98%;
}

.msg {
    background-color: rgba(93, 120, 255, 0.5);
    display: flex;
    border-radius: 8px;
    flex-direction: column;
    transition-duration: 0.5s;
}

.msg:hover {
    background-color: rgba(93, 120, 255, 0.8);
    transition-duration: 0.5s;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    transform: scale(1.01);
}

.title {
    margin: 15px;
    font-weight: bold;
    font-size: large;
    color: rgb(255, 255, 255);
}

.msgTable {
    display: flex;
    background-color: rgba(141, 141, 141, 0.5);
    padding: 10px;
    border-radius: 8px;
    flex-direction: column;
    height: 355px;
    transition-duration: 0.5s;
}

.msgTable:hover {
    background-color: rgba(141, 141, 141, 0.8);
    transition-duration: 0.5s;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    transform: scale(1.01);

}

.m-trans-enter-from,
.m-trans-leave-to {
    transform: translateX(-100px) scale(0.5) rotateY(-20deg) rotateX(20deg);
    opacity: 0;
}

.m-trans-enter-active,
.m-trans-leave-active {
    transition: all 0.5s ease;
}

.m1-trans-enter-from,
.m1-trans-leave-to {
    transform: translateX(150px) scale(0.5) rotateY(20deg) rotateX(-20deg);
    opacity: 0;
}

.m1-trans-enter-active,
.m1-trans-leave-active {
    transition: all 0.6s ease;
}
</style>
  