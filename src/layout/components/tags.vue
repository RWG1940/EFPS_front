<template>
    <div style="cursor:pointer;margin: 1%;transition-duration: 0.5s;margin-bottom: 5px;">
        <t-tag theme="primary" :variant="item.isActive ? 'dark' : 'light'"
            class="menu-tags" closable v-for="(item, index) in tagData"
            :key="item.name + index" @close="handleClose(item)" @click="handleSelect(item)" @contextmenu.prevent="onRightClick">
            <span>{{ item.name }}</span>
        </t-tag>
    </div>
</template>
  
<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useTagsStore } from '@/stores/tags-store';
import router from '@/router';

const tagsStore = useTagsStore();

// 计算标签数据
const tagData = computed(() => {
    return tagsStore.tagsList;
});

const handleClose = (item: any) => {
    tagsStore.delRoute(item);
};

const handleSelect = (item: any) => {
    if (item.name !== tagsStore.currentRoute?.name) {
        router.push(item.path);
        tagsStore.setTagsList(item);
    }
};
const onRightClick = (e: any) => {
    
};

</script>
  
<style lang="less" scoped>
.menu-tags {
    margin-right: 6px;
    transition-duration: 0.5s;
}
.menu-tags:active {
    transform: scale(1.2);
    transition-duration: 0.5s;
}
.menu-tags:hover {
    transform: perspective(1000px) rotateY(-40deg) scale(1.4);
    font-weight: bold;
}
</style>