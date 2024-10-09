<template>
  <div>
    <t-drawer v-model:visible="visible" header="消息" :close-btn="true" :footer="false">
      <t-row>
        <t-col style="font-weight: bold;border-bottom: 5px solid orange;">公告消息
        </t-col>
      </t-row>
      <t-row style="margin-top: 5px;">
        <el-scrollbar height="300px" style="border-radius: 5px;">
            <t-notification v-for="(message, index) in noticesStore.noticesDataPublished" :key="index" :title="message.header" :message="message.content"
                :content="message.content" theme="warning" :footer="formatDate(message.createtime || '')" style="width: 265px;margin-bottom: 5px;" :max-line="2" />
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
import { ref,onMounted } from 'vue';
import { useNoticesStore } from '@/stores/notices-store'
import { formatDate } from '@/utils/moment'

const noticesStore = useNoticesStore()

onMounted(() => {
    noticesStore.fetchAllNoticesData()
})

const visible = ref(false);
const handleClick: ButtonProps['onClick'] = () => {
  visible.value = true;
};

</script>
  