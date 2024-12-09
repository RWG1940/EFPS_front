<template>
    <userEdit :visible="visible" header="已移交的进程单" @update:visible="handleAddVisibleChange">
        <template #main>
            <el-scrollbar height="500px" style="border-radius: 10px;background-color: aliceblue;padding: 5px;">
                <div class="departure-handled-container">
                    离港
                    <el-scrollbar height="225px" style="border-radius: 10px;">
                        <div v-for="item in filteredTransferredDepartureEfps" style="width: 100%;margin-bottom: 10px;"
                            max-height="230">
                            <releaseGroundEfps BackgroundColor="lightgreen" :efps-data="item || {}" />
                        </div>
                    </el-scrollbar>
                    进港
                    <el-scrollbar height="225px" style="border-radius: 10px;">
                        <div v-for="item in filteredTransferredArrivalEfps" style="width: 100%;margin-bottom: 10px;"
                            max-height="230">
                            <releaseGroundEfps BackgroundColor="lightgreen" :efps-data="item || {}" />
                        </div>
                    </el-scrollbar>
                </div>
            </el-scrollbar>
        </template>
        <template #footer>
            总计：{{ filteredTransferredArrivalEfps.length + filteredTransferredDepartureEfps.length }}条数据
            <t-button theme="default" @click="cancelButton">关闭</t-button>
        </template>
    </userEdit>
</template>
  
<script lang="ts" setup>
import userEdit from '@/components/userManage/userEdit.vue'
import { filteredTransferredArrivalEfps, filteredTransferredDepartureEfps, } from '@/stores/releaseGroundEfps-store'
import releaseGroundEfps from '../releaseGroundControlPage/releaseGroundEfps.vue'


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
  