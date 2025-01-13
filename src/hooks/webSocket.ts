import { reactive, ref, onUnmounted } from 'vue';
import { areaEfpsStore } from '@/stores/areaEfps-store';
import { towerEfpsStore } from '@/stores/towerEfps-store';
import { releaseGroundEfpsStore } from '@/stores/releaseGroundEfps-store';
import { aircraftsTrendsStore } from '@/stores/aircraftsTrends-store';
import { useAirSpaceEventStore } from '@/stores/airSpaceEvent-store';
import { useAirspaceInfoStore } from '@/stores/airspaceInfo-store';
import { useAirspaceWeatherStore } from '@/stores/airSpaceWeather-store';
import { useDeptStore } from '@/stores/dept-store';
import { useEmpPermissionStore } from '@/stores/empPermission-store';
import { flightInfoStore } from '@/stores/flightInfo-store';
import { flightParkingStandStore } from '@/stores/flightParkingStand-store';
import { flightPlanStore } from '@/stores/flightPlan-store';
import { flightRunwayStore } from '@/stores/flightRunway-store';
import { usefoundMeStore } from '@/stores/foundMe-store';
import { useHomeStore } from '@/stores/home-store';
import { useNoticesStore } from '@/stores/notices-store';
import { parkingStandStore } from '@/stores/parkingStand-store';
import { usePermissionStore } from '@/stores/permissions-store';
import { useRoleStore } from '@/stores/role-store';
import { useRoleRouteStore } from '@/stores/roleRoute-store';
import { useRouteStore } from '@/stores/routes-store';
import { runwayStore } from '@/stores/runway-store';
import { usesysMsgStore } from '@/stores/sysMsg-store';
import { useTagsStore } from '@/stores/tags-store';

import { useUserStore } from '@/stores/user-store';


// 装载store
const userStore = useUserStore()
const homeStore = useHomeStore()
// WebSocket 状态管理
const socketState = reactive({
  connection: null as WebSocket | null,
  isConnected: false,
  reconnectAttempts: 0,
  maxReconnectAttempts: 10,  // 最大重试次数
  reconnectInterval: 5000,   // 重连间隔
});

const messageQueue = ref<string[]>([]); // 消息队列，防止 WebSocket 断开时丢失消息

// 建立 WebSocket 连接
export const connectWebSocket = () => {
  if (socketState.connection) {
    socketState.connection.close();
  }

  // 使用 userStore 中的 id 来建立 WebSocket 连接
  socketState.connection = new WebSocket(`ws://localhost:8080/websocket/${userStore.myData.emp.id}`);
  console.log('准备建立websocket连接~~' + `${import.meta.env.WEBSOCKET_URL}/${userStore.myData.emp.id}`);

  socketState.connection.onopen = () => {
    socketState.isConnected = true;
    console.log("WebSocket 连接已建立~~😊");

    // 清空消息队列
    messageQueue.value.forEach((message) => sendMessage(message));
    messageQueue.value = [];
    console.log('清空了消息队列~~✅');
  };

  socketState.connection.onmessage = (event) => {
    handleMessage(event.data);
  };

  socketState.connection.onclose = () => {
    socketState.isConnected = false;
    console.log("WebSocket 连接已关闭");
    // 处理重连逻辑
    handleReconnect();
  };

  socketState.connection.onerror = (error) => {
    console.error("WebSocket 错误：", error);
    // 处理错误时重连
    handleReconnect();
  };
};

// 处理消息
const handleMessage = (data: string) => {
  try {
    const mes = JSON.parse(data);
    // 根据消息类型处理逻辑
    // type: 1 系统响应 2 群聊消息 3 私聊消息 4 群聊通知 5 私聊通知 6 群聊文件 7 私聊文件
    //console.log('dd收到消息：', mes);
    if (mes.type == 1) {
      switch (mes.message) {
        // 当跑道变化
        case 'runwayAdded' || 'runwayUpdated' || 'runwayDeleted':
          console.log('跑道发生变化，实时刷新数据中');
          runwayStore.fetchAllData();
          flightRunwayStore.fetchAllData();
          break;
        // 当停机位变化
        case 'parkingStandAdded' || 'parkingStandUpdated' || 'parkingStandDeleted':
          console.log('停机位发生变化，实时刷新数据中');
          parkingStandStore.fetchAllData();
          flightInfoStore.fetchAllData();
          flightParkingStandStore.fetchAllData();
          break;
        // 当区域飞行进程单变化
        case 'areaEfpsAdded' || 'areaEfpsUpdated' || 'areaEfpsDeleted':
          console.log('区域飞行进程单发生变化，实时刷新数据中');
          towerEfpsStore.fetchAllData();
          releaseGroundEfpsStore.fetchAllData();
          break;
        // 当塔机飞行进程单变化
        case 'towerEfpsAdded' || 'towerEfpsUpdated' || 'towerEfpsDeleted':
          areaEfpsStore.fetchAllData();
          releaseGroundEfpsStore.fetchAllData();
          break;
        // 当放行地面飞行进程单变化
        case 'releaseGroundEfpsAdded' || 'releaseGroundEfpsUpdated' || 'releaseGroundEfpsDeleted':
          areaEfpsStore.fetchAllData();
          towerEfpsStore.fetchAllData();
          break;
        default:
          console.log('未知消息类型:', mes);
      }
    }
    if (mes.type === 2) {
      
    }
    if (mes.type === 3) {
      
    }
    if (mes.type === 4) {
      
    }
    if (mes.type === 5) {
      
    }
    if (mes.type === 6) {
      
    }
    if (mes.type === 7) {
      
    }
  } catch (error) {
    console.error('消息处理错误:', error);
  }
};

// 重连逻辑
const handleReconnect = () => {
  if (socketState.reconnectAttempts < socketState.maxReconnectAttempts) {
    socketState.reconnectAttempts += 1;
    console.log(`尝试重连...第 ${socketState.reconnectAttempts} 次`);
    setTimeout(connectWebSocket, socketState.reconnectInterval);
  } else {
    console.error('WebSocket 重连失败，已达到最大重连次数');
  }
};

// 发送消息
export const sendMessage = (message: string) => {
  if (socketState.isConnected && socketState.connection) {
    socketState.connection.send(message);
  } else {
    console.log('WebSocket 未连接，消息加入队列');
    messageQueue.value.push(message);
  }
};

// 组件卸载时关闭 WebSocket 连接
export const closeWebSocket = () => {
  if (socketState.connection) {
    socketState.connection.close();
    console.log('WebSocket 连接已关闭');
  }
};
