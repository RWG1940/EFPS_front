<template>
  <t-layout class="tl1">
    <rheader />
    <t-layout class="tl2">
      <sideBar />
      <t-layout>
        <content/>
        <rfooter/>
      </t-layout>
    </t-layout>
  </t-layout>
</template>
  
<script setup lang="ts">
import sideBar from "@/layout/sideBar.vue";
import rheader from "@/layout/header.vue";
import content from "@/layout/content.vue";
import rfooter from "@/layout/footer.vue"
</script>
<style lang="scss" scoped>

.tl1 {
  height: 100vh;
  width: 100%;
}
.tl2 {
  display: flex;
  flex-direction: row;
}





</style>