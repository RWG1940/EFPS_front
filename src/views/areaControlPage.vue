<template>
    <div class="wrap">
        <pageHeader />
        <pageContent/>
        <pageFooter />
    </div>
</template>
<script lang="ts" setup>
import pageHeader from '@/components/areaControlPage/layout/pageHeader.vue'
import pageContent from '@/components/areaControlPage/layout/pageContent.vue'
import pageFooter from '@/components/areaControlPage/layout/pageFooter.vue'
import { onMounted } from 'vue';
import { useareaEfpsStore } from '@/stores/areaEfps-store'

 onMounted(() => {
     const areaStore = useareaEfpsStore()
     areaStore.fetchAllAreaEfpsData()
 })
</script>
<style lang="scss" scoped>
.wrap {
    min-width: 1530px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: rgba(220, 220, 220, 0.594);
}

</style>