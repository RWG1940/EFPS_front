<template>
    <div class="wrap">
        <t-row :gutter="20">
            <t-col :span="5">
                <div class="msg">
                    <p class="title"><t-icon name="notification">
                        </t-icon> 已发布的航班动态
                        <t-tooltip content="新增一条动态">
                            <t-button size="small"><t-icon name="add"></t-icon></t-button>
                        </t-tooltip>
                        <t-tooltip content="删除过期的动态">
                            <t-button size="small" style="margin-left: 5px;"><t-icon name="delete-time"></t-icon></t-button>
                        </t-tooltip>
                    </p>
                    <aircraftsTrends />
                </div>
            </t-col>
            <t-col :span="7">
                <div class="msgTable">
                    <p class="title"><t-icon name="root-list">
                        </t-icon> 所有动态
                        <t-tooltip content="新增一条动态">
                            <t-button size="small" theme="default"><t-icon name="add"></t-icon></t-button>
                        </t-tooltip>
                        <t-tooltip content="删除选中的动态">
                            <t-button size="small" theme="default" style="margin-left: 5px;"><t-icon name="delete"></t-icon></t-button>
                        </t-tooltip>
                    </p>
                    <el-table :data="store.aircraftsTrendsData" max-height="300" style="margin-top: 3px;"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="theme" label="主题" width="60" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="header" label="标题" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="content" label="内容" width="180" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="createtime" label="创建时间" width="120" show-overflow-tooltip sortable>
                            <template #default="scope">
                                {{ formatDate(scope.row.createtime) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="updatetime" label="更新时间" width="120" show-overflow-tooltip sortable>
                            <template #default="scope">
                                {{ formatDate(scope.row.updatetime) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态" width="80"></el-table-column>
                        <el-table-column prop="author" label="作者" width="80"></el-table-column>
                        <el-table-column fixed="right" min-width="120">
                            <template #header>
                                <el-input v-model="search" size="small" placeholder="搜索" />
                            </template>
                            <template #default>
                                <t-button size="small" theme="default">编辑</t-button>
                                <t-button size="small" theme="danger" style="margin-left: 5px;">删除</t-button>
                            </template>
                        </el-table-column>

                    </el-table>
                </div>
            </t-col>
        </t-row>
    </div>
</template>
<script setup lang="ts">
import aircraftsTrends from '@/components/areaControlPage/trendsTool/aircraftsTrends.vue';
import { useAircraftsTrendsStore } from '@/stores/aircraftsTrends-store';
import { formatDate } from '@/utils/moment'

const store = useAircraftsTrendsStore();
</script>
<style lang="scss" scoped>
.wrap {
    background-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 2%;
    height: 98%;
    width: 93%;

}

.msg {
    background-color: rgb(93, 120, 255);
    display: flex;
    border-radius: 8px;
    flex-direction: column;
}

.title {
    margin: 15px;
    font-weight: bold;
    font-size: large;
    color: aliceblue;
}

.msgTable {
    display: flex;
    background-color: rgb(141, 141, 141);
    padding: 10px;
    border-radius: 8px;
    flex-direction: column;
}
</style>
  