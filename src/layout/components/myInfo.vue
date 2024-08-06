<template>
    
      <div class="t-suf-container">
        <t-drawer 
          class="panel"
          v-model:visible="homeStore.myInfoVisible"
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
                <t-avatar :image="userStore.myData.eAvatarpath" size="100px"/>
            </div>
          <div class="content">
            <span><p class="rwg">用户名：</p><p>{{ userStore.myData.eName }}</p></span>
            <span><p class="rwg">账号：</p><p>{{ userStore.myData.eUsername }}</p></span>
            <span><p class="rwg">id：</p><p>{{ userStore.myData.id }}</p></span>
            <span><p class="rwg">手机号：</p><p>{{ userStore.myData.ePhone }}</p></span>
            <span><p class="rwg">入职日期：</p><p>{{ formatDate(userStore.myData.eCreatetime || '') }}</p></span>
            <span><p class="rwg">职位：</p><p>{{ userStore.myData.eRole }}</p></span>
            <span><p class="rwg">部门：</p><p>{{ userStore.myData.eDeptid == '0' ? '管理部' : userStore.myData.eDeptid == '1' ? '区域管制部' : userStore.myData.eDeptid == '2' ?'塔台管制部':'其它' }}</p></span>
            <t-button theme="default" style="margin-top: 15px;" size="small" @click="handleEditClick">修改资料</t-button>
          </div>
        </div>
        </t-drawer>
        <myInfoEdit  :visible="editVisible" @update:visible="handleEditVisibleChange" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useHomeStore } from "@/stores/home-store";
  import { useUserStore } from "@/stores/user-store";
  import myInfoEdit from "@/layout/components/myInfoEdit.vue";
  import { formatDate } from "@/utils/moment";

  const userStore = useUserStore()
  const homeStore = useHomeStore()
  const placement = ref('top');
  const mode = ref('push');
  const editVisible = ref(false)
  
  // myInfoEdit保存按钮的回调
  const handleEditVisibleChange = ()=> {
    editVisible.value = false;
  }
  // 编辑按钮事件
  const handleEditClick = ()=> {
    editVisible.value = true;
  }

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
    margin-left: 20px;
    display: flex;
  }
  .content span {
    display: flex;
    height: 27px;
    margin-right: 20px;
    
  }
  .rwg {
    color: blue;
    font-weight: bold;
  }
  </style>
  