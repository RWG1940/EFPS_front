<template>
    <div class="wrap">
        <t-row :gutter="20">
            <t-col :span="4.5">
                <div class="msg">
                    <p class="title"><t-icon name="notification">
                        </t-icon> 已发布的公告
                        <t-tooltip content="新增一条公告">
                            <t-button size="small" @click="handleAddVisibleChange" theme="warning"><t-icon name="add"></t-icon></t-button>
                        </t-tooltip>
                        <t-tooltip content="删除过期的公告">
                            <t-popconfirm theme="default" content="您确定要删除24小时之前的公告吗" :visible="visible1" :confirm-btn="{
                                content: '确认',
                                theme: 'warning',
                                onClick: () => {
                                    store.deleteExpiredNoticesData()
                                    visible1 = false
                                }
                            }" :cancel-btn="{
                                content: '我再想想',
                                theme: 'default',
                                variant: 'outline',
                                onClick: () => { visible1 = false }
                            }">
                                <t-button size="small" style="margin-left: 5px;" @click="visible1 = true" theme="warning"><t-icon
                                        name="delete-time" ></t-icon></t-button>
                            </t-popconfirm>
                        </t-tooltip>
                    </p>
                    <importantMsg />
                </div>
            </t-col>
            <t-col :span="7">
                <div class="msgTable">
                    <p class="title"><t-icon name="root-list">
                        </t-icon> 所有公告
                        <t-tooltip content="新增一条公告">
                            <t-button size="small" theme="default" @click="handleAddVisibleChange"><t-icon
                                    name="add"></t-icon></t-button>
                        </t-tooltip>
                        <t-tooltip content="删除选中的公告">
                            <t-button size="small" theme="default" style="margin-left: 5px;"
                                @click="store.deleteSelectedNoticesData"><t-icon name="delete"></t-icon></t-button>
                        </t-tooltip>
                    </p>
                    <el-table :data="store.filterTableData" max-height="300" style="margin-top: 3px;"
                        @selection-change="store.handleSelectionChange">
                        <el-table-column type="selection" width="30" />
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
                            
                        ]" :filter-method="(value: number, row: NoticesData) => { return row.status === value }"
                            filter-placement="bottom-end">
                            <template #default="scope">
                                <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'"
                                    size="small">
                                    {{ scope.row.status == 1 ? '已发布' : '未发布' }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="author" label="作者" width="80"></el-table-column>
                        <el-table-column fixed="right" min-width="120">
                            <template #header>
                                <el-input v-model="store.search" size="small" placeholder="搜索" />
                            </template>
                            <template #default="scope">
                                <t-button size="small" theme="default"
                                    @click="() => { store.noticeEditFormData = scope.row; handleEditVisibleChange() }">编辑</t-button>
                                <t-button size="small" theme="danger" style="margin-left: 5px;" @click="store.deleteNoticesData([scope.row.id])">删除</t-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </t-col>
        </t-row>
        <addNotice :visible="addVisible" @update:visible="handleAddVisibleChange" />
        <editNotice :visible="editVisible" @update:visible="handleEditVisibleChange" />

    </div>
</template>
<script setup lang="ts">
import { useNoticesStore } from '@/stores/notices-store';
import { formatDate } from '@/utils/moment'
import addNotice from '../components/noticesPage/addNotice.vue'
import editNotice from '../components/noticesPage/editNotice.vue'
import { ref } from 'vue';
import type { NoticesData } from '@/stores/notices-store';
import importantMsg from '@/components/areaControlPage/msgTool/importantMsg.vue';

const store = useNoticesStore();
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
    margin: 1%;
    height: 98%;
    width: 95%;

}

.msg {
    background-color:orange;
    display: flex;
    border-radius: 8px;
    flex-direction: column;
}

.title {
    margin: 15px;
    font-weight: bold;
    font-size: large;
    color:aliceblue;
}

.msgTable {
    display: flex;
    background-color: rgb(141, 141, 141);
    padding: 10px;
    border-radius: 8px;
    flex-direction: column;
    height: 355px;
}
</style>
  