<template>
    <userEdit :visible="visible" header="跑道管理面板" @update:visible="handleAddVisibleChange">
        <template #main>
            <el-scrollbar height="480px" style="border-radius: 10px;background-color: aliceblue;padding: 5px;">
                <el-table :data="filteredRunwayTableData" style="width: 100%">
                    <el-table-column label="编码" prop="code" fixed width="80" show-overflow-tooltip />
                    <el-table-column label="长度" prop="length" width="80" show-overflow-tooltip />
                    <el-table-column label="宽度" prop="width" width="80" show-overflow-tooltip />
                    <el-table-column label="材质" prop="surfaceType" width="80" show-overflow-tooltip />
                    <el-table-column label="状态" prop="status" />
                    <el-table-column label="创建时间" prop="createdAt" width="80" show-overflow-tooltip />
                    <el-table-column label="更新时间" prop="updatedAt" width="80" show-overflow-tooltip />
                    <el-table-column label="备注" prop="remarks" width="80" show-overflow-tooltip />
                    <el-table-column fixed="right" label="操作" min-width="120">
                        <template #header>
                        <el-input size="small" v-model="search" placeholder="编码/材质" style="width: 100%;" />
                    </template>
                        <template #default="{ row }">
                            <t-row :gutter="5">
                                <t-col>
                                    <t-button theme="default" size="small" @click="handleEditClick(row.id)">修改</t-button>
                                </t-col>
                                <t-col>
                                    <t-button theme="danger" size="small"
                                        @click="handleDeleteClick(row.id)">删除</t-button>
                                </t-col>
                            </t-row>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>
        </template>
        <template #footer>
            总计：{{ filteredRunwayTableData.length }}条数据
            <t-button theme="default" @click="cancelButton">关闭</t-button>
        </template>
    </userEdit>
</template>
  
<script lang="ts" setup>
import userEdit from '@/components/userManage/userEdit.vue'
import { filteredRunwayTableData, search } from "@/stores/runway-store";



const props = defineProps<{
    visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleAddVisibleChange = () => {
    emit('update:visible');
};

const cancelButton = () => {
    handleAddVisibleChange();
};



</script>
<style scoped></style>
  