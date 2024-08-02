<template>
  <t-space>
    <t-dropdown :options="options" trigger="click" @click="clickHandler">
      <t-space>
        <t-button variant="text">
          {{ condition }}
          <template #suffix> <t-icon name="chevron-down" size="16" /></template>
        </t-button>
      </t-space>
    </t-dropdown>
  </t-space>
</template>

<script lang="ts" setup>
import type { DropdownProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { defineEmits } from 'vue';
import { ref } from 'vue'

const options: DropdownProps['options'] = [
  { content:'所有',value:'all'},
  { content: 'id', value: 'id' },
  { content: '姓名', value: 'eName' },
  { content: '账号', value: 'eUsername' },
  { content: '手机号', value: 'ePhone' },
];
// 设置默认选项
const condition = ref(options[0].content);

const emit = defineEmits(['updateSearchCondition']);

const clickHandler: DropdownProps['onClick'] = (data) => {
  MessagePlugin.success(`选中【${data.content}】`);
  condition.value = data.content;
  emit('updateSearchCondition', data.value);
};
</script>
