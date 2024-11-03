<template>
  <div>
    <t-drawer v-model:visible="visible" header="消息" :close-btn="true" :footer="false">
      <t-row>
        <t-col style="font-weight: bold;border-bottom: 5px solid orange;">公告消息
        </t-col>
      </t-row>
      <t-row style="margin-top: 5px;">
        <el-scrollbar height="300px" style="border-radius: 5px;">
          <t-notification v-for="(message, index) in noticesStore.noticesDataPublished" :key="index"
            :title="message.header" :message="message.content" :content="message.content" theme="warning"
            :footer="formatDate(message.createtime || '')" class="notice-item" :max-line="2" />
        </el-scrollbar>
      </t-row>

      <t-row>
        <t-col style="font-weight: bold;border-bottom: 5px solid blue;">系统消息
        </t-col>
      </t-row>

      <t-row>
        <t-col style="font-weight: bold;border-bottom: 5px solid rgb(255, 0, 0);">警报
        </t-col>
      </t-row>
    </t-drawer>
    <t-icon class="t-menu__operations-icon" name="notification" @click="handleClick" />

  </div>
</template>
  
<script lang="ts" setup>
import { MessagePlugin } from 'tdesign-vue-next';
import type { DrawerProps, ButtonProps } from 'tdesign-vue-next';
import { ref, onMounted } from 'vue';
import { useNoticesStore } from '@/stores/notices-store'
import { formatDate } from '@/utils/moment'
import { useHomeStore } from "@/stores/home-store";
import { useAirSpaceEventStore } from '@/stores/airSpaceEvent-store';

const noticesStore = useNoticesStore()
const homeStore = useHomeStore()
const airSpaceEventStore = useAirSpaceEventStore()
onMounted(() => {
  noticesStore.fetchAllNoticesData()
})

const visible = ref(false);
const handleClick: ButtonProps['onClick'] = () => {
  visible.value = true;
  homeStore.myInfoVisible = false;
  airSpaceEventStore.operationPanelVisible = false;

};

</script>
<style scoped>
.notice-item {
  width: 265px;
  margin-bottom: 5px;
  transition: all 0.3s ease-in-out;
}
.notice-item:hover {
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.514);
  transition: all 0.3s ease-in-out;
  transform: scale(0.95);
}
</style>