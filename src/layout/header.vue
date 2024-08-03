<template>
  <t-header>
    <t-head-menu value="item1" height="120px">
      <template #logo>
        <h1 style="color: blue;">EFPS system</h1>
      </template>
      <template #operations>
        <t-avatar size="medium" style="margin-right: 5px;" image="https://tdesign.gtimg.com/site/avatar.jpg"></t-avatar>
        <userDropdown/>
        <newsDrawer/>       
      </template>
      
    </t-head-menu>
  </t-header>
</template>
<script setup lang="ts">
import userDropdown from "../layout/components/userDropdown.vue";
import newsDrawer from "./components/newsDrawer.vue";

</script>
<style></style>