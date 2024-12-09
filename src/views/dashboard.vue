<template>
  <div class="wrap">
    <t-row :gutter="5" style="margin-bottom: 15px;">
      <t-col :span="2">
        <t-card>
          <p class="pp">🙋‍♂️今日访问量：</p>
        </t-card>
      </t-col>
      <t-col :span="2">
        <t-card><p class="pp">📃未处理进程单：</p></t-card>
      </t-col>
      <t-col :span="2">
        <t-card><p class="pp">💥冲突预警：</p></t-card>
      </t-col>
      <t-col :span="2">
        <t-card><p class="pp">🌞当日天气：</p></t-card>
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
      <t-col :span="2" >
          
          <t-card style="height: 233px;">
            <p class="pp">🗼塔台</p>
            <t-row>
        
            </t-row>
          </t-card>
      </t-col>
      <t-col :span="2">
          
          <t-card style="height: 233px;">
            <p class="pp">🌲区域</p>
          </t-card>
      </t-col>
      <t-col :span="2" >
          
          <t-card style="height: 233px;">
            <p class="pp">🎈地面</p>
          </t-card>
      </t-col>
    </t-row>

    <t-row>
      <p style="font-weight: bolder;margin: 0;border-bottom: 5px solid blue;">进程单</p>
    </t-row>
    <t-row>
      <t-col :span="12">
        <t-card>
          <efpsView />
        </t-card>
        
      </t-col>

    </t-row>
  </div>
</template>
<script setup lang="ts">
import empDeptView from '../components/dashboard/empDeptView.vue'
import efpsView from '../components/dashboard/efpsView.vue'


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
  