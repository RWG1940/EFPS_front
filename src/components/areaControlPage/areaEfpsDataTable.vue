<template>
    <userEdit :visible="visible" header="区域飞行进程单总览" @update:visible="handleFullVisibleChange">
        <template #main>
            <el-table :data="store.areaEfpsDataPages" style="width: 100%" max-height="250">
                <el-table-column label="时间" width="480" sortable>
                    <template #default="scope">
                        <div style="display: flex; align-items: center;flex-direction: column;">
                           
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
  import { useareaEfpsStore } from "@/stores/areaEfps-store";
  
  const store = useareaEfpsStore();
  const props = defineProps<{
    visible: boolean;
  }>();
  // 通知父组件(table)事件
  const emit = defineEmits(['update:visible']);
  
  // visible更新后通知父组件 通知面板原本就能控制visible值
  const handleFullVisibleChange = () => {
    emit('update:visible');
  };
  
  const cancelButton = () => {
    // 清空表单数据
    store.areaEfpsAddFormData = JSON.parse(JSON.stringify(store.NullareaEfpsAddFormData));
    emit('update:visible');
  };
  
  // 提交用户数据
  const addButton = async () => {
    emit('update:visible');
  };
  
  </script>
  <style scoped></style>
  