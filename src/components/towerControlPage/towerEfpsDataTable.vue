<template>
    <userEdit :visible="visible" header="待处理进程单" @update:visible="handleTableVisibleChange">
        <template #main>
            <el-table :data="filteredEfps" style="width: 100%" max-height="420"
                :default-sort="{ prop: 'createtime', order: 'descending' }">
                <el-table-column align="left" width="60" label="类型">
                    <template #default="scope">
                        <el-tag :type="scope.row.type == '1' ? 'warning' : 'success'">{{ scope.row.type == '1' ? '进港' : '出港'
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="left" width="520" sortable prop="createtime">
                    <template #header>
                        <el-input size="small" v-model="search" placeholder="航空器信息/目的机场" style="width: 50%;" />
                    </template>
                    <template #default="scope">
                        <div style="display: flex; align-items: center;flex-direction: column;">
                            <t-popconfirm theme="default" content="您想处理该进程单吗" :visible="visibleMap[scope.row.id]"
                                :cancelBtn="{ content: '取消', size: 'small', theme: 'default', onClick: () => { visibleMap[scope.row.id] = false } }"
                                :confirmBtn="{ content: '确定', size: 'small', theme: 'primary', onClick: () => handleProcessingEfpsBtn(scope.row.id) }">
                                <t-button @click="handleProcessingEfpsFirstBtn(scope.row.id)" size="small" theme="default">
                                    优先处理
                                    <template #icon>
                                        <t-icon name="chevron-right-double" />
                                    </template>

                                </t-button>
                                <towerEfps :BackgroundColor="prepareBackgroundColor" :efpsData="scope.row || {}"
                                    @click="togglePopconfirm(scope.row.id)" />
                            </t-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template #footer>
            总计：{{ filteredEfps.length }}条数据
            <t-button theme="default" @click="cancelButton">关闭</t-button>
        </template>
    </userEdit>
</template>
  
<script lang="ts" setup>
import userEdit from '@/components/userManage/userEdit.vue'
import { search, handleProcessingEfpsFirst, filteredEfps, handleEfpsProcess } from "@/stores/towerEfps-store";
import { ref, reactive, computed } from 'vue'
import towerEfps from '@/components/towerControlPage/towerEfps.vue';

const visibleMap = reactive<{ [key: string]: boolean }>({});
const prepareBackgroundColor = ref('antiquewhite')
const props = defineProps<{
    visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleTableVisibleChange = () => {
    emit('update:visible');
};
const cancelButton = () => {
    emit('update:visible');
};
const togglePopconfirm = (id: string) => {
    visibleMap[id] = !visibleMap[id];
};
const handleProcessingEfpsBtn = (id: string) => {
    handleEfpsProcess(id)
    visibleMap[id] = !visibleMap[id];
}
const handleProcessingEfpsFirstBtn = (id: string) => {
    handleProcessingEfpsFirst(id)
    visibleMap[id] = !visibleMap[id];
}





</script>
<style scoped></style>
  