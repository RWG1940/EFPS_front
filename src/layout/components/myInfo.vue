<template>
    
      <div class="t-suf-container">
        <t-drawer 
          class="panel"
          v-model:visible="store.myInfoVisible"
          :placement="placement"
          :mode="mode"
          :confirm-btn="{
            content: 'OK',
            disabled: true,
        }"
          header="个人中心"
          show-in-attached-element
        >
        <div class="wrap">
            <div class="avatar">
                <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" size="100px"/>
                <t-button theme="default" style="margin-top: 15px;" size="small">修改资料</t-button>
            </div>
          <div class="content">
            <span><p class="rwg">用户名：</p><p>{{ store.name }}</p></span>
            <span><p class="rwg">账号：</p><p>{{ store.username }}</p></span>
            <span><p class="rwg">id：</p><p>{{ store.id }}</p></span>
          </div>
        </div>
        </t-drawer>

    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useHomeStore } from "@/stores/home-store";

  const store = useHomeStore()
  const placement = ref('top');
  const mode = ref('push');
  </script>
  <style scoped>
  .wrap {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 15px;
    display: flex;
    flex-direction: column;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  .content span {
    display: flex;
  }
  .rwg {
    color: blue;
    font-weight: bold;
  }
  </style>
  