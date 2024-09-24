<template>
    <my-info />
    <tags />
    <t-content class="tc">
        <transition name="m-trans">
            <router-view></router-view>
        </transition>
    </t-content>
</template>
<script lang="ts" setup>
import myInfo from "@/layout/components/myInfo.vue";
import { ref } from "vue";
import tags from "@/layout/components/tags.vue";

</script>
<style scoped>
.m-trans-enter-active,
.m-trans-leave-active {
  transition: all 0.5s ease-out;
}

.m-trans-enter-from,
.m-trans-leave-to {
  opacity: 0;
  transform: perspective(1000px) rotateX(10deg) rotateY(10deg) translateX(200px);
}
</style>