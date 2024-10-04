<template>
  <div style="border-top: 1px solid rgba(220, 220, 220, 0.765)">
    <transition name="m-trans" appear>
      <t-menu theme="light" default-value="" :collapsed="collapsed">
        <t-menu-item :value="rwg" @click="handleMenuClick('dashboard')">
          <template #icon>
            <t-icon name="dashboard" />
          </template>
          仪表盘
        </t-menu-item>
        <t-menu-item value="flight-plan" @click="() => { }">
          <template #icon>
            <t-icon name="assignment" />
          </template>
          飞行计划
        </t-menu-item>
        <t-menu-item value="flight-status" @click="handleMenuClick('flight-status')">
          <template #icon>
            <t-icon name="earth" />
          </template>
          航班动态
        </t-menu-item>
        <t-submenu value="command-control" mode="popup">
          <template #title>
            <span>指挥控制</span>
          </template>
          <template #icon>
            <t-icon name="tower-3" />
          </template>
          <t-menu-item value="command-control/area-management"
            @click="handleMenuClick('command-control/area-management')">区域管制</t-menu-item>
          <t-menu-item value="command-control/tower-management"
            @click="handleMenuClick('command-control/tower-management')">塔台管制</t-menu-item>
          <t-menu-item value="command-control/combined-ground-release-management"
            @click="handleMenuClick('command-control/combined-ground-release-management')">放行地面合并管制</t-menu-item>
        </t-submenu>
        <t-menu-item value="airspace-status" @click="handleMenuClick('airspace-status')">
          <template #icon>
            <t-icon name="cloud" />
          </template>
          空域动态
        </t-menu-item>
        <t-menu-item value="notices" @click="handleMenuClick('notices')">
          <template #icon>
            <t-icon name="chat" />
          </template>
          公告通知
        </t-menu-item>
        <t-submenu value="data-analysis" mode="popup">
          <template #icon>
            <t-icon name="chart" />
          </template>
          <template #title>
            <span>数据统计与分析</span>
          </template>
          <t-menu-item value="data-analysis/flight-traffic"
            @click="handleMenuClick('data-analysis/flight-traffic')">航班流量统计</t-menu-item>
          <t-menu-item value="data-analysis/operation-efficiency"
            @click="handleMenuClick('data-analysis/operation-efficiency')">运行效率分析</t-menu-item>
          <t-menu-item value="data-analysis/delay-analysis"
            @click="handleMenuClick('data-analysis/delay-analysis')">延误原因分析</t-menu-item>
        </t-submenu>
        <t-submenu value="system-management" mode="popup">
          <template #icon>
            <t-icon name="control-platform" />
          </template>
          <template #title>
            <span>系统管理</span>
          </template>
          <t-menu-item value="system-management/user-manage"
            @click="handleMenuClick('system-management/user-manage')">用户管理</t-menu-item>
          <t-menu-item value="system-management/dept-manage"
            @click="handleMenuClick('system-management/dept-manage')">部门管理</t-menu-item>
          <t-menu-item value="system-management/system-settings"
            @click="handleMenuClick('system-management/system-settings')">系统设置</t-menu-item>
        </t-submenu>

        <template #operations>
          <t-button class="t-demo-collapse-btn" variant="text" shape="square" @click="changeCollapsed">
            <template #icon><t-icon :name="iconName" /></template>
          </t-button>
        </template>
      </t-menu>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted,onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const collapsed = ref(false);
const iconName = computed(() => (collapsed.value ? 'chevron-right' : 'chevron-left'));
const rwg = ref('');

const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
};

const router = useRouter();


const handleMenuClick = (path: string) => {
  router.push(`/home/${path}`);
};
onMounted(() => {
  if (rwg.value == '') {
    //router.push('/home/dashboarda')
  }
});




</script>
<style scoped>
.m-trans-enter-active,
.m-trans-leave-active {
  transition: all 0.5s ease-out;
}

.m-trans-enter-from,
.m-trans-leave-to {
  opacity: 0;
  transform: perspective(1000px) translateX(-200px) scale(0.5);
}
</style>
