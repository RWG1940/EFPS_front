<template>
    <div class="wrap">
        <transition name="pa-trans" appear>
            <pageHeader />
        </transition>
        <pageContent />
        <transition name="pa-trans" appear>
            <pageFooter />
        </transition>
    </div>
</template>
<script lang="ts" setup>
import pageHeader from '@/components/towerControlPage/layout/pageHeader.vue'
import pageContent from '@/components/towerControlPage/layout/pageContent.vue'
import pageFooter from '@/components/towerControlPage/layout/pageFooter.vue'
import { onMounted } from 'vue';
import { useTowerEfpsStore } from '@/stores/towerEfps-store'

onMounted(() => {
    const towerStore = useTowerEfpsStore()
    towerStore.fetchAllData()
})
</script>
<style lang="scss" scoped>
.wrap {
    min-width: 1530px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(to top, #eaf8ff, #7d99d2);
}

.pa-trans-enter-from {
    opacity: 0;
}

.pa-trans-enter-to {
    opacity: 1;
    transition-duration: 0.8s;

}

.pa-trans-leave-from {
    opacity: 1;
}

.pa-trans-leave-to {
    opacity: 0;
}</style>