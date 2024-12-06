<template>
  <userEdit :visible="visible" header="添加放行地面飞行进程单" @update:visible="handleAddVisibleChange">
    <template #main>
      <t-form ref="form" :data="releaseGroundEfpsAddFormData" :rules="releaseGroundEfpsADD_FORM_RULES" :label-width="200"
        @submit="releaseGroundEfpsAddSubmit">
        <el-scrollbar height="520px" style="padding: 15px;">
          进程单类型和状态
          <hr>
          <!-- 进程单类型 -->
          <t-form-item name="type" label="进程单类型">
            <t-select v-model="releaseGroundEfpsAddFormData.type" style="width: 100%;">
              <t-option v-for="item in releaseGroundEfpsTypeOptions" :value="item.value" :label="item.label" :key="item.value">
              </t-option>
            </t-select>
          </t-form-item>

          <!-- 进程单状态 -->
          <t-form-item name="status" label="进程单状态">
            <t-select v-model="releaseGroundEfpsAddFormData.status" style="width: 100%;">
              <t-option v-for="item in releaseGroundEfpsStatusOptions" :value="item.value" :label="item.label" :key="item.value">
              </t-option>
            </t-select>
          </t-form-item>
          标牌区
          <hr>
          <!-- 航空器呼号 -->
          <t-form-item name="a1" label="航空器呼号">
            <t-input v-model="releaseGroundEfpsAddFormData.a1" />
          </t-form-item>

          <!-- 航空器机型 -->
          <t-form-item name="b1" label="航空器机型">
            <t-input v-model="releaseGroundEfpsAddFormData.b1" />
          </t-form-item>

          <!-- 尾流标志 -->
          <t-form-item name="c1" label="尾流标志">
            <t-select v-model="releaseGroundEfpsAddFormData.c1" style="width: 100%;">
              <t-option v-for="item in releaseGroundEfpsWakeOptions" :value="item.value" :label="item.label" :key="item.value">
              </t-option>
            </t-select>
          </t-form-item>

          <!-- 二次雷达应答机模式及编码 -->
          <t-form-item name="d1Lhalf" label="二次雷达应答机模式">
            <t-select v-model="releaseGroundEfpsAddFormData.d1Lhalf" style="width: 100%;">
              <t-option v-for="item in releaseGroundEfpsSecondaryRadarOptions" :value="item.value" :label="item.label"
                :key="item.value">
              </t-option>
            </t-select>
          </t-form-item>

          <t-form-item name="d1Rhalf" label="应答机编码">
            <t-input v-model="releaseGroundEfpsAddFormData.d1Rhalf" />
          </t-form-item>

          <!-- 起飞机场 -->
          <t-form-item name="e1" label="起飞机场">
            <t-input v-model="releaseGroundEfpsAddFormData.e1" />
          </t-form-item>

          <!-- 预计起飞/降落时刻 -->
          <t-form-item name="fg1" label="预计起飞/降落时刻">
            <t-input v-model="releaseGroundEfpsAddFormData.fg1" />
          </t-form-item>

          <!-- 目的地机场 -->
          <t-form-item name="h1" label="目的地机场">
            <t-input v-model="releaseGroundEfpsAddFormData.h1" />
          </t-form-item>
          指令区
          <hr>
          <!-- 高度变化数值 -->
          <t-form-item name="b2Lhalf" label="高度变化数值">
            <t-input v-model="releaseGroundEfpsAddFormData.b2Lhalf" />
          </t-form-item>
          <!-- 高度变化状态 -->
          <t-form-item name="b2Rhalf" label="高度变化状态">
            <t-select v-model="releaseGroundEfpsAddFormData.b2Rhalf" style="width: 100%;">
              <t-option v-for="item in releaseGroundEfpsHightStatusOptions" :value="item.value" :label="item.label"
                :key="item.value">
              </t-option>
            </t-select>
          </t-form-item>

          <!-- 其他指令 -->
          <t-form-item name="c2" label="其他指令">
            <t-input v-model="releaseGroundEfpsAddFormData.c2" />
          </t-form-item>

          航路区
          <hr>
          <t-form-item name="de3" label="航空器地面控制指令">
            <t-input v-model="releaseGroundEfpsAddFormData.de3" />
          </t-form-item>
          <t-form-item name="c3" label="程序号">
            <t-input v-model="releaseGroundEfpsAddFormData.c3" />
          </t-form-item>
          协调区
          <hr>
          <!-- 进程单生成日期和时刻 -->
          <t-form-item name="b4" label="进程单生成日期和时刻">
            <t-input v-model="releaseGroundEfpsAddFormData.b4" />
          </t-form-item>

          <!-- 停机位 -->
          <t-form-item name="e4" label="停机位">
            <t-input v-model="releaseGroundEfpsAddFormData.e4" />
          </t-form-item>

          <!-- 其他信息 -->
          <t-form-item name="c4" label="其他信息">
            <t-input v-model="releaseGroundEfpsAddFormData.c4" />
          </t-form-item>

          <!-- 航空器收到本场ATIS信息 -->
          <t-form-item name="m" label="航空器收到本场ATIS信息">
            <t-radio-group v-model="releaseGroundEfpsAddFormData.m" variant="primary-filled">
              <t-radio-button value="1">是</t-radio-button>
              <t-radio-button value="0">否</t-radio-button>
            </t-radio-group>
          </t-form-item>

          <!-- 与空军协调完毕 -->
          <t-form-item name="a" label="与空军协调完毕">
            <t-radio-group v-model="releaseGroundEfpsAddFormData.a" variant="primary-filled">
              <t-radio-button value="1">是</t-radio-button>
              <t-radio-button value="0">否</t-radio-button>
            </t-radio-group>
          </t-form-item>

          <!-- 航空器被雷达识别 -->
          <t-form-item name="i" label="航空器被雷达识别">
            <t-radio-group v-model="releaseGroundEfpsAddFormData.i" variant="primary-filled">
              <t-radio-button value="1">是</t-radio-button>
              <t-radio-button value="0">否</t-radio-button>
            </t-radio-group>
          </t-form-item>

          <!-- 对过境航班，拍发EST报 -->
          <t-form-item name="e" label="对过境航班，已拍发EST报">
            <t-radio-group v-model="releaseGroundEfpsAddFormData.e" variant="primary-filled">
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
import { ref } from 'vue'
import { useReleaseGroundEfpsStore, releaseGroundEfpsAddFormData } from "@/stores/releaseGroundEfps-store";
import { releaseGroundEfpsADD_FORM_RULES, releaseGroundEfpsHightStatusOptions, releaseGroundEfpsSecondaryRadarOptions, releaseGroundEfpsStatusOptions, releaseGroundEfpsTypeOptions, releaseGroundEfpsWakeOptions } from '@/types/releaseGroundEfpsTypes'
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const store = useReleaseGroundEfpsStore();
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
const releaseGroundEfpsAddSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.addData(releaseGroundEfpsAddFormData.value).then(() => {
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
