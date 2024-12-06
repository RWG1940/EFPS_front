<template>
    <userEdit :visible="visible" header="回收站" @update:visible="handleRecycleVisibleChange">
        <template #main>
            <el-table :data="filteredRecycleEfps" style="width: 100%" max-height="250">
                <el-table-column label="时间" width="480" sortable>
                    <template #default="scope">
                        <div style="display: flex; align-items: center;flex-direction: column;">
                            <t-popconfirm theme="default" content="您想将该进程单移出回收站吗" :visible="visibleMap[scope.row.id]"
                                :cancelBtn="{ content: '取消', size: 'small', theme: 'default', onClick: () => { visibleMap[scope.row.id] = false } }"
                                :confirmBtn="{ content: '确定', size: 'small', theme: 'primary', onClick: () => handleRecycleArrivalEfps(scope.row.id) }">
                                <releaseGroundEfps :BackgroundColor="prepareBackgroundColor" :efpsData="scope.row || {}"
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
import { useReleaseGroundEfpsStore,filteredRecycleEfps } from "@/stores/releaseGroundEfps-store";
import { ref,reactive } from 'vue'
import releaseGroundEfps from '../releaseGroundEfps.vue';

const visibleMap = reactive<{ [key: string]: boolean }>({});
const prepareBackgroundColor = ref('antiquewhite')
const store = useReleaseGroundEfpsStore();
const props = defineProps<{
    visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleRecycleVisibleChange = () => {
    emit('update:visible');
};
const cancelButton = () => {
    emit('update:visible');
};
const togglePopconfirm = (id: string) => {
  visibleMap[id] = !visibleMap[id];
};
const handleRecycleArrivalEfps = (id: string) => {
    const areaEfps = {
        id: id,
        status: 1,
    };
    store.updateData(areaEfps);
    visibleMap[id] = false;
};



</script>
<style scoped></style>
  