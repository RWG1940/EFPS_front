<template>
  <t-header>
    <t-head-menu value="item1" height="120px">
      <template #logo>
        <h1 style="color: blue;">EFPS system</h1>
      </template>
      <template #operations>
        <el-button circle type="success" style="width: 1px;height: 1px;"></el-button><p style="margin: 0;margin-right: 20px;">在线中</p>
        <t-avatar size="medium" style="margin-right: 5px;" :image="store.myData.emp.eAvatarpath"></t-avatar>
        <userDropdown/>
        <newsDrawer/>       
      </template>
      
    </t-head-menu>
  </t-header>
</template>
<script setup lang="ts">
import userDropdown from "../layout/components/userDropdown.vue";
import newsDrawer from "./components/newsDrawer.vue";
import { useUserStore } from "@/stores/user-store";
import { onBeforeMount } from "vue";

const store = useUserStore()
onBeforeMount(() => {
  // 获取当前登录用户信息
  store.updateLoginUserData()
})
</script>
<style></style>