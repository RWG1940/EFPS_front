<template>
    <userEdit :visible="visible" header="停机坪管理面板" @update:visible="handleControlVisibleChange">
        <template #main>
            <el-scrollbar height="480px" style="border-radius: 10px;background-color: aliceblue;padding: 5px;">
                <el-table :data="filteredParkingStandTableData" style="width: 100%">
                    <el-table-column label="编码" prop="code" fixed width="80" show-overflow-tooltip />
                    <el-table-column label="大小" prop="size" width="80" show-overflow-tooltip>
                        <template #default="{ row }">
                            <el-tag effect="plain" round>{{ row.size == 1 ? '小型' : row.size == 2 ?'中型':'大型' }}</el-tag>
                        </template>
                        </el-table-column>
                    <el-table-column label="状态" prop="status" width="80" show-overflow-tooltip>
                            <template #default="scope">
                                <el-tag :type="scope.row.status == '0'? 'success':scope.row.status == '1'?'warning':'danger'" >{{ scope.row.status == '0'? '空闲':scope.row.status == '1'?'被占用':'已禁用' }}</el-tag>
                            </template>    
                    </el-table-column>
                    <el-table-column label="位置" prop="location" width="80" show-overflow-tooltip />
                    <el-table-column label="创建时间" prop="createdAt" width="80" show-overflow-tooltip />
                    <el-table-column label="更新时间" prop="updatedAt" width="80" show-overflow-tooltip />
                    <el-table-column label="备注" prop="remarks" width="80" show-overflow-tooltip />
                    <el-table-column fixed="right" label="操作" min-width="120">
                        <template #header>
                            <el-input size="small" v-model="search" placeholder="编码" style="width: 100%;" />
                        </template>
                        <template #default="{ row }">
                            <t-row :gutter="5">
                                <t-col>
                                    <t-button theme="default" size="small" @click="handleEdit(row)">修改</t-button>
                                </t-col>
                                <t-col>
                                    <t-popconfirm content="确认删除吗" @confirm="handleDelete([row.id])" theme="danger">
                                        <t-button theme="danger" size="small">删除</t-button>
                                    </t-popconfirm>
                                </t-col>
                            </t-row>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>
        </template>
        <template #footer>
            总计：{{ filteredParkingStandTableData.length }}条数据
            <t-button theme="default" @click="cancelButton">关闭</t-button>
        </template>
    </userEdit>
    <parkingStandEdit :visible="editVisible" @update:visible="handleEditVisibleChange" />
</template>
  
<script lang="ts" setup>
import userEdit from '@/components/userManage/userEdit.vue'
import { ref, defineProps, defineEmits } from 'vue';
import parkingStandEdit from './parkingStandEdit.vue'
import { parkingStandStore, filteredParkingStandTableData, search, parkingStandEditFormData } from "@/stores/parkingStand-store";
import { MessagePlugin } from 'tdesign-vue-next';

const editVisible = ref(false);
const props = defineProps<{
    visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleControlVisibleChange = () => {
    emit('update:visible');
};

const cancelButton = () => {
    handleControlVisibleChange();
};
const handleEditVisibleChange = () => {
    editVisible.value = !editVisible.value;
};
const handleEdit = (row: any) => {
    parkingStandEditFormData.value = { ...row };
    handleEditVisibleChange()
};
const handleDelete = async (id: number[]) => {
        await parkingStandStore.deleteData(id)
};


</script>
<style scoped></style>
  