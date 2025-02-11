<template>
  <!-- 添加新区域飞行进程单 -->
  <userEdit :visible="visible" header="添加区域飞行进程单" @update:visible="handleAddVisibleChange">
    <template #main>
      <t-form ref="form" :data="areaEfpsAddFormData" :rules="areaEfpsADD_FORM_RULES" :label-width="200"
        @submit="areaEfpsAddSubmit">
        <el-scrollbar height="520px" style="padding: 15px;">
          进程单类型和状态
          <hr>
          <!-- 进程单类型 -->
          <t-form-item name="type" label="进程单类型">
            <t-select v-model="areaEfpsAddFormData.type" style="width: 100%;">
              <t-option v-for="item in areaEfpsTypeOptions" :value="item.value" :label="item.label" :key="item.value">
              </t-option>
            </t-select>
          </t-form-item>

          <!-- 进程单状态 -->
          <t-form-item name="status" label="进程单状态">
            <t-select v-model="areaEfpsAddFormData.status" style="width: 100%;">
              <t-option v-for="item in areaEfpsStatusOptions" :value="item.value" :label="item.label" :key="item.value">
              </t-option>
            </t-select>
          </t-form-item>
          标牌区
          <hr>
          <!-- 航空器呼号 -->
          <t-form-item name="a1" label="航空器呼号">
            <t-input v-model="areaEfpsAddFormData.a1" />
          </t-form-item>

          <!-- 航空器机型 -->
          <t-form-item name="b1" label="航空器机型">
            <t-input v-model="areaEfpsAddFormData.b1" />
          </t-form-item>

          <!-- 尾流标志 -->
          <t-form-item name="c1" label="尾流标志">
            <t-select v-model="areaEfpsAddFormData.c1" style="width: 100%;">
              <t-option v-for="item in areaEfpsWakeOptions" :value="item.value" :label="item.label" :key="item.value">
              </t-option>
            </t-select>
          </t-form-item>

          <!-- 二次雷达应答机模式及编码 -->
          <t-form-item name="d1Lhalf" label="二次雷达应答机模式">
            <t-select v-model="d1Lhalf" style="width: 100%;">
              <t-option v-for="item in areaEfpsSecondaryRadarOptions" :value="item.value" :label="item.label"
                :key="item.value">
              </t-option>
            </t-select>
          </t-form-item>

          <t-form-item name="d1Rhalf" label="应答机编码">
            <t-input v-model="d1Rhalf" />
          </t-form-item>

          <!-- 起飞机场 -->
          <t-form-item name="e1" label="起飞机场">
            <t-input v-model="areaEfpsAddFormData.e1" />
          </t-form-item>

          <!-- 预计起飞/降落时刻 -->
          <t-form-item name="fg1" label="预计起飞/降落时刻">
            <t-input v-model="areaEfpsAddFormData.fg1" />
          </t-form-item>

          <!-- 目的地机场 -->
          <t-form-item name="h1" label="目的地机场">
            <t-input v-model="areaEfpsAddFormData.h1" />
          </t-form-item>
          指令区
          <hr>
          <!-- 高度变化数值 -->
          <t-form-item name="b2Lhalf" label="高度变化数值">
            <t-input v-model="b2Lhalf" />
          </t-form-item>
          <!-- 高度变化状态 -->
          <t-form-item name="b2Rhalf" label="高度变化状态">
            <t-select v-model="b2Rhalf" style="width: 100%;">
              <t-option v-for="item in areaEfpsHightStatusOptions" :value="item.value" :label="item.label"
                :key="item.value">
              </t-option>
            </t-select>
          </t-form-item>

          <!-- 其他指令 -->
          <t-form-item name="c2" label="其他指令">
            <t-input v-model="areaEfpsAddFormData.c2" />
          </t-form-item>

          <!-- 申请的巡航高度层 -->
          <t-form-item name="a2" label="申请的巡航高度层">
            <t-input-number v-model="areaEfpsAddFormData.a2" theme="column" :step="10"></t-input-number>
          </t-form-item>
          航路区
          <hr>
          <!-- 位置报告点名称 -->
          <t-form-item name="a31" label="位置报告点名称1">
            <t-input v-model="areaEfpsAddFormData.a31" />
          </t-form-item>

          <!-- 位置报 -->
          <t-form-item name="b31" label="位置报1">
            <t-input v-model="areaEfpsAddFormData.b31" />
          </t-form-item>

          <!-- 位置报告点名称 -->
          <t-form-item name="a32" label="位置报告点名称2">
            <t-input v-model="areaEfpsAddFormData.a32" />
          </t-form-item>

          <!-- 位置报 -->
          <t-form-item name="b32" label="位置报2">
            <t-input v-model="areaEfpsAddFormData.b32" />
          </t-form-item>

          <!-- 位置报告点名称 -->
          <t-form-item name="a33" label="位置报告点名称3">
            <t-input v-model="areaEfpsAddFormData.a33" />
          </t-form-item>

          <!-- 位置报 -->
          <t-form-item name="b33" label="位置报3">
            <t-input v-model="areaEfpsAddFormData.b33" />
          </t-form-item>

          <!-- 位置报告点名称 -->
          <t-form-item name="a34" label="位置报告点名称4">
            <t-input v-model="areaEfpsAddFormData.a34" />
          </t-form-item>

          <!-- 位置报 -->
          <t-form-item name="b34" label="位置报4">
            <t-input v-model="areaEfpsAddFormData.b34" />
          </t-form-item>

          <!-- 位置报告点名称 -->
          <t-form-item name="a35" label="位置报告点名称5">
            <t-input v-model="areaEfpsAddFormData.a35" />
          </t-form-item>

          <!-- 位置报 -->
          <t-form-item name="b35" label="位置报5">
            <t-input v-model="areaEfpsAddFormData.b35" />
          </t-form-item>

          <!-- 位置报告点名称 -->
          <t-form-item name="a36" label="位置报告点名称6">
            <t-input v-model="areaEfpsAddFormData.a36" />
          </t-form-item>

          <!-- 位置报 -->
          <t-form-item name="b36" label="位置报6">
            <t-input v-model="areaEfpsAddFormData.b36" />
          </t-form-item>
          协调区
          <hr>
          <!-- 进程单生成日期和时刻 -->
          <t-form-item name="b4" label="进程单生成日期和时刻">
            <t-date-picker v-model="areaEfpsAddFormData.b4" enable-time-picker allow-input clearable
              format="YYYY-MM-DD HH:mm:ss" />
          </t-form-item>

          <!-- 扇区号 -->
          <t-form-item name="a4" label="扇区号">
            <t-input v-model="areaEfpsAddFormData.a4" />
          </t-form-item>

          <!-- 其他信息 -->
          <t-form-item name="c4" label="其他信息">
            <t-input v-model="areaEfpsAddFormData.c4" />
          </t-form-item>

          <!-- 航空器收到本场ATIS信息 -->
          <t-form-item name="m" label="航空器收到本场ATIS信息">
            <t-radio-group v-model="areaEfpsAddFormData.m" variant="primary-filled">
              <t-radio-button value="1">是</t-radio-button>
              <t-radio-button value="0">否</t-radio-button>
            </t-radio-group>
          </t-form-item>

          <!-- 与空军协调完毕 -->
          <t-form-item name="a" label="与空军协调完毕">
            <t-radio-group v-model="areaEfpsAddFormData.a" variant="primary-filled">
              <t-radio-button value="1">是</t-radio-button>
              <t-radio-button value="0">否</t-radio-button>
            </t-radio-group>
          </t-form-item>

          <!-- 航空器被雷达识别 -->
          <t-form-item name="i" label="航空器被雷达识别">
            <t-radio-group v-model="areaEfpsAddFormData.i" variant="primary-filled">
              <t-radio-button value="1">是</t-radio-button>
              <t-radio-button value="0">否</t-radio-button>
            </t-radio-group>
          </t-form-item>

          <!-- 对过境航班，拍发EST报 -->
          <t-form-item name="e" label="对过境航班，已拍发EST报">
            <t-radio-group v-model="areaEfpsAddFormData.e" variant="primary-filled">
              <t-radio-button value="1">是</t-radio-button>
              <t-radio-button value="0">否</t-radio-button>
            </t-radio-group>
          </t-form-item>


        </el-scrollbar>

      </t-form>
    </template>
    <template #footer>
      <t-button theme="primary" type="submit" @click="addButton" block>提交</t-button>
      <t-button theme="default" @click="cancelButton" block style="margin-left: 10px;">取消</t-button>
    </template>
  </userEdit>
</template>

<script lang="ts" setup>
import userEdit from '@/components/userManage/userEdit.vue'
import { areaEfpsAddFormData, areaEfpsStore, useAreaEfpsStore, d1Lhalf, d1Rhalf, b2Lhalf, b2Rhalf } from "@/stores/areaEfps-store";
import { ref } from 'vue';
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { areaEfpsADD_FORM_RULES, areaEfpsSecondaryRadarOptions, areaEfpsStatusOptions, areaEfpsTypeOptions, areaEfpsWakeOptions, areaEfpsHightStatusOptions } from '@/types/areaEfpsDataTypes'

const store = useAreaEfpsStore();
const form = ref<FormInstanceFunctions>();
const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleAddVisibleChange = () => {
  emit('update:visible');
};

const cancelButton = () => {
  form.value?.reset();
  handleAddVisibleChange();
};
const addButton = () => {
  form.value?.submit()
  handleAddVisibleChange();
};
const areaEfpsAddSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
  if (validateResult === true) {
    areaEfpsAddFormData.value.d1 = d1Lhalf.value + d1Rhalf.value;
    if(b2Rhalf.value == '1'){
      areaEfpsAddFormData.value.b21 = b2Lhalf.value
    }
    if(b2Rhalf.value == '2'){
      areaEfpsAddFormData.value.b21 = b2Lhalf.value + '↑'
    }
    if(b2Rhalf.value == '3'){
      areaEfpsAddFormData.value.b21 = b2Lhalf.value + '↓'
    }
    if(b2Rhalf.value == '4'){
      areaEfpsAddFormData.value.b21 = 'H'+b2Lhalf.value 
    }
    if(b2Rhalf.value == '5'){
      areaEfpsAddFormData.value.b21 = 'H'+b2Lhalf.value+'↑'
    }
    if(b2Rhalf.value == '6'){
      areaEfpsAddFormData.value.b21 = 'H'+b2Lhalf.value+'↓'
    }
    await store.addData(areaEfpsAddFormData.value).then(() => {
      form.value?.reset();
    })
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    if (firstError) {
      MessagePlugin.warning(firstError);
    } else {
      MessagePlugin.warning('验证失败');
    }
  }
};

</script>
<style scoped></style>
