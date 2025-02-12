<template>
    <div class="chat-panel">
        <userEdit :visible="visible" header="🚀即时通讯" @update:visible="handleChatVisibleChange">
            <template #main>
                <!-- 消息显示区域 -->
                <t-list style="position: relative; height: 300px; overflow-y: scroll">
                    <div class="message-list" ref="messageList">
                        <el-tag v-if="groupMessage.length == 0">暂时没有消息哦</el-tag>
                        <div class="message-item" v-for="(msg, index) in groupMessage" :key="index">
                            <transition name="m-trans" appear>
                                <t-row v-if="msg.sender == String(userStore.myData.emp.id)">
                                    <t-col :span="3"></t-col>
                                    <t-col :span="7">
                                        <div class="message-content">{{ msg.content }}</div>
                                        <div class="message-time">{{ formatTimestamp(Number(msg.timestamp)) }}</div>
                                    </t-col>
                                    <t-col :span="2">
                                        <t-avatar size="medium" style="margin-top: -20px;margin-left: 15px;">{{
                                            msg.sender.slice(0, 1) }}</t-avatar>
                                        <div class="message-sender" style="margin-left: 10px;font-size: xx-small;">{{
                                            msg.sender }}</div>
                                    </t-col>
                                </t-row>
                            </transition>
                            <transition name="m-trans" appear>
                                <t-row v-if="msg.sender != String(userStore.myData.emp.id)">

                                    <t-col :span="2">
                                        <t-avatar size="medium" style="margin-top: -20px;margin-left: 5px;">{{
                                            msg.sender.slice(0, 1) }}</t-avatar>
                                        <div class="message-sender" style="margin-left: 0px;font-size: xx-small;">{{
                                            msg.sender
                                        }}</div>
                                    </t-col>
                                    <t-col :span="7">
                                        <div class="message-content1">{{ msg.content }}</div>
                                        <div class="message-time1">{{ formatTimestamp(Number(msg.timestamp)) }}</div>
                                    </t-col>
                                    <t-col :span="3"></t-col>
                                </t-row>
                            </transition>
                        </div>
                    </div>
                </t-list>
                <!-- 输入框 -->
                <div class="chat-input">
                    <t-input v-model="messageInput" type="text" placeholder="请输入消息..." clearable />
                    <t-button @click="sendMessageBtn" style="width: 100px;">
                        <template #icon>
                            <t-icon name="send" color="white" />
                        </template>
                        发送
                    </t-button>
                </div>
            </template>
            <template #footer>
                <t-button @click="cancelButton" theme="default">取消</t-button>
            </template>
        </userEdit>
    </div>
</template>
  
<script setup lang="ts">
import userEdit from '@/components/userManage/userEdit.vue';
import { reactive, ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { connectWebSocket, sendMessage, closeWebSocket, groupMessage } from '@/hooks/webSocket';
import { useUserStore } from '@/stores/user-store';

const messageList = ref<HTMLElement | null>(null);
const userStore = useUserStore();
const props = defineProps<{
    visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleChatVisibleChange = () => {
    emit('update:visible');
};

const cancelButton = () => {
    handleChatVisibleChange();
};

const messageInput = ref('');

// 组件加载时建立 WebSocket 连接
onMounted(() => {
    connectWebSocket();
});

// 组件卸载时关闭 WebSocket 连接
onUnmounted(() => {
    closeWebSocket();
});

// 发送消息
const sendMessageBtn = () => {
    if (messageInput.value.trim()) {
        const message = messageInput.value.trim();
        sendMessage(`{"type": "2","status":"1","message": "${message}","sender": "${userStore.myData.emp.id as number}","timestamp": "${Math.floor(new Date().getTime() / 1000)}"}`);
        messageInput.value = '';  // 清空输入框
        scrollToBottom();
    }
};
// 格式化时间戳为可读的日期格式
const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp); // 将秒数转换为毫秒数
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 每次消息更新时滚动到底部
const scrollToBottom = () => {
    nextTick(() => {
        if (messageList.value) {
            messageList.value.scrollTop = messageList.value.scrollHeight;
        }
    });
};

// 监听 groupMessage 的变化，自动滚动
watch(() => groupMessage, () => {
    scrollToBottom();
}, { immediate: true });

</script>
  
<style scoped>
.chat-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.message-list {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    background-color: #f1f1f1;

}

.message-item {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 4px;
}

.message-time {
    display: flex;
    justify-content: right;
    font-size: 12px;
    color: #888;
    margin-right: 5px;
}

.message-time1 {
    display: flex;
    justify-content: left;
    font-size: 12px;
    color: #888;
    margin-right: 5px;
}

.chat-input {
    display: flex;
    padding: 10px;
    background-color: #fff;
}

.chat-input input {
    flex-grow: 1;
    padding: 5px;
    margin-right: 10px;
}

.chat-input button {
    padding: 5px 10px;
}

.message-content {
    padding: 8px;
    border-radius: 4px;
    background-color: rgb(94, 223, 195);
    transition-duration: 0.3s;
    transform: perspective(1000px) rotateY(20deg);
}

.message-content:hover {
    transform: scale(1.05);
    transition-duration: 0.3s;
    box-shadow: 1px 1px 8px grey;
}

.message-content1 {
    padding: 8px;
    border-radius: 4px;
    background-color: rgb(243, 250, 255);
    transition-duration: 0.3s;
    transform: perspective(1000px) rotateY(-20deg);
}

.message-content1:hover {
    transform: scale(1.05);
    transition-duration: 0.3s;
    box-shadow: 1px 1px 8px grey;
}
.m-trans-enter-active,
.m-trans-leave-active {
  transition: all 0.5s ease-out;
}

.m-trans-enter-from,
.m-trans-leave-to {
  opacity: 0;
  transform: perspective(1000px) rotateX(10deg) rotateY(10deg) translateX(200px) scale(0.5);
}
</style>
  