<template>
    <t-space class="tdesign-demo-dropdown">
      <t-dropdown :options="options" @click="clickHandler">
        <t-button variant="text">
          用户名
          <template #suffix><chevron-down-icon size="16" /></template>
        </t-button>
      </t-dropdown>
    </t-space>
  </template>
  <script lang="ts" setup>
  import { MessagePlugin } from 'tdesign-vue-next';
  import  type {DropdownProps } from 'tdesign-vue-next';
  import { ChevronDownIcon } from 'tdesign-icons-vue-next';
  const options: DropdownProps['options'] = [
    {
      content: '个人中心',
      value: 1,
    },
    {
      content: '退出登录',
      value: 2,
      theme: 'error',
    },
  ];
  const clickHandler: DropdownProps['onClick'] = (data) => {
    MessagePlugin.info(`【${data.content}】`);
  };
  </script>
  