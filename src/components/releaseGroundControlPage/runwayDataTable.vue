<template>
    <userEdit :visible="visible" header="跑道管理面板" @update:visible="handleControlVisibleChange">
        <template #main>
            <el-scrollbar height="480px" style="border-radius: 10px;background-color: aliceblue;padding: 5px;">
                <el-table :data="filteredRunwayTableData" style="width: 100%">
                    <el-table-column label="编码" prop="code" fixed width="80" show-overflow-tooltip />
                    <el-table-column label="长度" prop="length" width="80" show-overflow-tooltip />
                    <el-table-column label="宽度" prop="width" width="80" show-overflow-tooltip />
                    <el-table-column label="材质" prop="surfaceType" width="80" show-overflow-tooltip />
                    <el-table-column label="状态" prop="status">
                        <template #default="{ row }">
                            <el-tag :type="row.status == 0 ? 'success' : row.status == 1 ? 'warning' : 'danger'">{{ row.status
                                == 0 ? '空闲' : row.status == 1 ? '占用' : '停用' }}</el-tag>
                        </template>
                    </el-table-column>
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
            总计：{{ filteredRunwayTableData.length }}条数据
            <t-button theme="default" @click="cancelButton">关闭</t-button>
        </template>
    </userEdit>
    <runwayDataEdit :visible="editVisible" @update:visible="handleEditVisibleChange" />
</template>
  
<script lang="ts" setup>
import userEdit from '@/components/userManage/userEdit.vue'
import { ref, defineProps, defineEmits } from 'vue';
import runwayDataEdit from './runwayDataEdit.vue'
import { runwayStore, filteredRunwayTableData, search, runwayEditFormData } from "@/stores/runway-store";
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
    runwayEditFormData.value = { ...row };
    handleEditVisibleChange()
};
const handleDelete = async (id: number[]) => {
        await runwayStore.deleteData(id)
};


</script>
<style scoped></style>
  