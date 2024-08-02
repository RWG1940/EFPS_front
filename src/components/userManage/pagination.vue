<template>
    <t-pagination
      v-model="current"
      v-model:pageSize="pageSize"
      :total="total"
      show-jumper
      @change="onChange"
      @page-size-change="onPageSizeChange"
      @current-change="onCurrentChange"
    />
  </template>
  
  <script setup lang="ts">
 import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
  import { MessagePlugin } from 'tdesign-vue-next';
  
  const props = defineProps({
  current: Number,
  pageSize: Number,
  total: Number,
});

const emit = defineEmits(['pageChange','eleChange']);
const current = ref(props.current);
const pageSize = ref(props.pageSize);
  
const onPageSizeChange = (size: number) => {
  console.log('page-size:', size);
  MessagePlugin.success(`pageSize变化为${size}`);
  emit('pageChange', current.value,pageSize.value);
};

const onCurrentChange = (index: number) => {
  MessagePlugin.success(`转到第${index}页`);
  emit('pageChange', index,pageSize.value);
  emit('eleChange',index,pageSize.value)
};

const onChange = (pageInfo: any) => {
  console.log(pageInfo);
};

watch(() => props.current, (newValue) => {
  current.value = newValue;
});

watch(() => props.pageSize, (newValue) => {
  pageSize.value = newValue;
});
  </script>
  