<template>
    <userEdit :visible="visible" header="队列中进程单" @update:visible="handleProcessingVisibleChange" :showOverlay="false">
        <template #main>
            <el-table :data="filterTableData" style="width: 100%" max-height="420"
                :default-sort="{ prop: 'createtime', order: 'descending' }">
                <el-table-column align="left" width="520" prop="createtime" sortable>
                    <template #header>
                        <el-input size="small" v-model="search" placeholder="航空器信息/目的机场" style="width: 50%;" />
                    </template>
                    <template #default="scope">
                        <div style="display: flex; align-items: center;flex-direction: column;">
                            <t-popconfirm theme="default" content="您想优先处理该进程单吗" :visible="visibleMap[scope.row.id]"
                                :cancelBtn="{ content: '取消', size: 'small', theme: 'default', onClick: () => { visibleMap[scope.row.id] = false } }"
                                :confirmBtn="{ content: '确定', size: 'small', theme: 'primary', onClick: () => handleProcessingEfpsFirstBtn(scope.row.id) }">
                                <t-button @click="withdrawSelectedTowerEfps(scope.row.id)" size="small" theme="default">
                                    <template #icon>
                                        <t-icon name="caret-left" />
                                    </template>
                                    撤回
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
            <t-button theme="default" @click="cancelButton">关闭</t-button>
        </template>
    </userEdit>
</template>
  
<script lang="ts" setup>
import userEdit from '@/components/userManage/userEdit.vue'
import { useTowerEfpsStore, withdrawSelectedTowerEfps, search, filterTableData,handleProcessingEfpsFirst } from "@/stores/towerEfps-store";
import { ref, reactive, computed } from 'vue'
import towerEfps from '../towerEfps.vue';

const visibleMap = reactive<{ [key: string]: boolean }>({});
const prepareBackgroundColor = ref('antiquewhite')
const store = useTowerEfpsStore();
const props = defineProps<{
    visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleProcessingVisibleChange = () => {
    emit('update:visible');
};
const cancelButton = () => {
    emit('update:visible');
};
const togglePopconfirm = (id: string) => {
    visibleMap[id] = !visibleMap[id];
};
const handleProcessingEfpsFirstBtn = (id: string) => {
    handleProcessingEfpsFirst(id)
    visibleMap[id] = !visibleMap[id];
}





</script>
<style scoped></style>
  