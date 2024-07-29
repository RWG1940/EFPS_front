<template>
    <div>
      <t-drawer v-model:visible="visible" header="消息" :on-confirm="onClickConfirm" :close-btn="true">
        <p>消息。。。</p>
      </t-drawer>
        <t-icon class="t-menu__operations-icon" name="notification" @click="handleClick"/>
  
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { MessagePlugin } from 'tdesign-vue-next';
  import type{ DrawerProps, ButtonProps } from 'tdesign-vue-next';
  const visible = ref(false);
  const handleClick: ButtonProps['onClick'] = () => {
    visible.value = true;
  };
  const onClickConfirm: DrawerProps['onConfirm'] = () => {
    MessagePlugin.info('数据保存中...', 1000);
    const timer = setTimeout(() => {
      clearTimeout(timer);
      visible.value = false;
      MessagePlugin.info('数据保存成功!');
    }, 1000);
  };
  </script>
  