<template>
    <my-info />
    <t-content class="tc">
        <router-view></router-view>
    </t-content>
</template>
<script lang="ts" setup>
import myInfo from "@/layout/components/myInfo.vue";
import { useHomeStore } from "@/stores/home-store";

const store = useHomeStore()

</script>
<style>
</style>