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
    background-image: url('../assets/img/areaControlPage/th.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
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