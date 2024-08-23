<template>
    <div class="header">
        <t-head-menu theme="dark">
            <template #logo>
                <t-icon name="user" color="yellow"></t-icon>
                <p style="color: white; margin-left: 2px;">
                    用户：<span style="color: white;">{{ userStore.myData.emp.eName }}</span>
                </p>
                <t-icon name="assignment-user" color="lightgreen"></t-icon>
                <p style="color: white; margin-left: 2px;">
                    角色：<span style="color: white;">{{ userStore.myData.dept.dName }}</span>
                </p>
            </template>
            <t-button @click="toggleTimezone" theme="default" size="small" style="margin-left: 35%;">
                <t-icon name="time" color="white" style="color: black;margin: auto;"></t-icon>&ensp;{{ currentTimezoneLabel
                }}
            </t-button>
            <p style="color: white; margin-left: 5px;">
                <span style="font-weight: bold; color: white;">{{ currentDateTime }}</span>
            </p>
            <template #operations>
                <p
                    style="margin-right: 10px; color: rgb(255, 255, 255); padding: 5px; border-radius: 3px; font-weight: bolder; font-style: italic;">
                    EFPS-SYSTEM
                </p>
                <t-popconfirm content="确认退出登录吗" :visible="visible"> 
                    <t-button theme="danger" shape="square" size="small" style="margin-right: 20px;" @click="visible = true">
                        <template #icon>
                            <t-icon name="logout" color="white" />
                        </template>
                    </t-button>
                    <template #cancelBtn>
                        <t-button size="small" variant="text" style="margin-right: 12px"
                            @click="visible = false">取消</t-button>
                    </template>
                    <template #confirmBtn>
                        <t-button size="small" theme="primary" @click="userStore.logout">确定</t-button>
                    </template>
                </t-popconfirm>
            </template>
        </t-head-menu>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/stores/user-store';

const userStore = useUserStore();
const visible = ref(false);
const currentDateTime = ref('');
const currentTimezone = ref('Asia/Shanghai');
const currentTimezoneLabel = ref('北京时间');

const timezones = [
    { zone: 'Asia/Shanghai', label: '北京时间' },
    { zone: 'America/New_York', label: '纽约时间' },
    { zone: 'Europe/London', label: '伦敦时间' },
];

const updateTime = () => {
    const now = new Date();
    const options = { timeZone: currentTimezone.value, hour12: false };
    const dateString = now.toLocaleDateString('en-GB', options);
    const timeString = now.toLocaleTimeString('en-GB', options);
    currentDateTime.value = `${dateString} ${timeString}`;
};

const toggleTimezone = () => {
    const nextIndex = (timezones.findIndex(tz => tz.zone === currentTimezone.value) + 1) % timezones.length;
    currentTimezone.value = timezones[nextIndex].zone;
    currentTimezoneLabel.value = timezones[nextIndex].label;
    updateTime();
};

onMounted(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    onUnmounted(() => clearInterval(interval));
});
</script>

<style lang="scss"></style>
