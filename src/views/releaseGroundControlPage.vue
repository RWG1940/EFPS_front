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
import pageHeader from '@/components/releaseGroundControlPage/layout/pageHeader.vue'
import pageContent from '@/components/releaseGroundControlPage/layout/pageContent.vue'
import pageFooter from '@/components/releaseGroundControlPage/layout/pageFooter.vue'


</script>
<style lang="scss" scoped>
.wrap {
    min-width: 1530px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(to top, #eaf8ff, #6d748d);
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