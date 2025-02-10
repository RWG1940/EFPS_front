<template>
  <div class="wrap">
    <t-row :gutter="5" style="margin-bottom: 15px;">
      <t-col :span="2">
        <t-card>
          <p class="pp">🙋‍♂️今日访问量：{{ onlinePeople }}</p>
        </t-card>
      </t-col>
      <t-col :span="2">
        <t-card>
          <p class="pp">📃未处理进程单：{{ undoEfps }}</p>
        </t-card>
      </t-col>
      <t-col :span="2">
        <t-card>
          <p class="pp">💥冲突预警：{{ alertMsgStore.data.length }}</p>
        </t-card>
      </t-col>
      <t-col :span="2">
        <t-card>
          <p class="pp">🌞当日天气：晴</p>
        </t-card>
      </t-col>
    </t-row>
    <t-row>
      <p style="font-weight: bolder;margin: 0;border-bottom: 5px solid blue;">职员和部门</p>
    </t-row>
    <t-row :gutter="5">
      <t-col :span="4">
        <t-card>
          <empDeptView />
        </t-card>
      </t-col>
      <t-col :span="2">

        <t-card style="height: 233px;">
          <p class="pp">🗼塔台</p>

          <t-row>
            ⚪剩余：进港-{{ aa.length }}，出港-{{ ad.length }}
          </t-row>
          <t-row>
            ⚪已处理：进港---{{ ata.length }}，出港--{{ atd.length }}
          </t-row>
          <t-row>
            ⚪处理队列：{{ ap.length }}
          </t-row>
          <t-row>
            ⚪处理中：{{ anp.length }}
          </t-row>
        </t-card>
      </t-col>
      <t-col :span="2">

        <t-card style="height: 233px;">
          <p class="pp">🌲区域</p>
          <t-row>
            ⚪剩余：进港-{{ ta.length }}，出港-{{ td.length }}
          </t-row>
          <t-row>
            ⚪已处理：进港---{{ tta.length }}，出港--{{ ttd.length }}
          </t-row>
          <t-row>
            ⚪处理队列：{{ tp.length }}
          </t-row>
          <t-row>
            ⚪ 处理中：{{ tnp.length }}
          </t-row>
        </t-card>
      </t-col>
      <t-col :span="2">

        <t-card style="height: 233px;">
          <p class="pp">🎈地面</p>
          <t-row>
            ⚪剩余：进港-{{ ra.length }}，出港-{{ rd.length }}
          </t-row>
          <t-row>
            ⚪已处理：进港---{{ rta.length }}，出港--{{ rtd.length }}
          </t-row>
          <t-row>
            ⚪处理队列：{{ rp.length }}
          </t-row>
          <t-row>
            ⚪ 处理中：{{ rnp.length }}
          </t-row>
        </t-card>
      </t-col>
    </t-row>

    <t-row>
      <p style="font-weight: bolder;margin: 0;border-bottom: 5px solid blue;">航班</p>
    </t-row>
    <t-row>
      <t-col :span="12">
        <t-card>
          <efpsView />
        </t-card>

      </t-col>

    </t-row>

    <t-row>
      <p style="font-weight: bolder;margin: 0;border-bottom: 5px solid blue;">协调信息</p>
    </t-row>
    <t-row>
      <t-card>
        <cooperaMsg />
      </t-card>
    </t-row>
  </div>
</template>
<script setup lang="ts">
import empDeptView from '../components/dashboard/empDeptView.vue'
import efpsView from '../components/dashboard/efpsView.vue'
import { useUserStore } from '@/stores/user-store';
import { onMounted, ref } from 'vue';
import { areaEfpsStore, filteredArrivalEfps as aa, filteredDepartureEfps as ad, filteredTransferredArrivalEfps as ata, filteredTransferredDepartureEfps as atd, processingData as ap, nowProcessingData as anp } from '@/stores/areaEfps-store';
import { towerEfpsStore, filteredArrivalEfps as ta, filteredDepartureEfps as td, filteredTransferredArrivalEfps as tta, filteredTransferredDepartureEfps as ttd, processingData as tp, nowProcessingData as tnp } from '@/stores/towerEfps-store';
import { releaseGroundEfpsStore, filteredArrivalEfps as ra, filteredDepartureEfps as rd, filteredTransferredArrivalEfps as rta, filteredTransferredDepartureEfps as rtd, processingData as rp, nowProcessingData as rnp, processingData } from '@/stores/releaseGroundEfps-store';
import { alertMsgStore } from '@/stores/alertMsg-store';
import cooperaMsg from '@/components/towerControlPage/msgTool/cooperaMsg.vue';

const onlinePeople = ref(0)
const undoEfps = ref(0)
const userStore = useUserStore();
onMounted(
  () => {
    userStore.tableData.forEach((element: any) => {

      if (element.isOnline === 1) {
        onlinePeople.value++;
      }

    });
    towerEfpsStore.fetchAllData().then(() => {
      towerEfpsStore.data.forEach((element: any) => {
        if (element.status === 1) {
          undoEfps.value++;
        }
      });
    });
    releaseGroundEfpsStore.fetchAllData().then(() => {
      releaseGroundEfpsStore.data.forEach((element: any) => {
        if (element.status === 1) {
          undoEfps.value++;
        }
      });
    });
    areaEfpsStore.fetchAllData().then(() => {
      areaEfpsStore.data.forEach((element: any) => {
        if (element.status === 1) {
          undoEfps.value++;
        }
      });
    });
    alertMsgStore.fetchAllData()
  }
)

</script>
<style lang="scss" scoped>
.wrap {
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 98%;
}

.pp {
  margin: 0;
  font-weight: bold;
}
</style>
  