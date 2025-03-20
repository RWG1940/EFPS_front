<template>
    <userEdit :visible="visible" header="修改航班信息" @update:visible="handleEditVisibleChange">
        <template #main>
            <t-form ref="form" :data="flightInfoEditFormData" :rules="FlightInfoEDIT_FORM_RULES" clearable:label-width="100"
                @submit="flightInfoEditSubmit">
                <el-scrollbar height="380px" style="padding: 40px;">
                    <t-form-item name="flightNumber" label="航班号：">
                        <t-input clearable v-model="flightInfoEditFormData.flightNumber" />
                    </t-form-item>
                    <t-form-item name="airline" label="航空公司：">
                        <t-input clearable v-model="flightInfoEditFormData.airline">
                        </t-input>
                    </t-form-item>
                    <t-form-item name="airline" label="机型：">
                        <t-input clearable v-model="flightInfoEditFormData.aircraftType" />
                    </t-form-item>
                    <t-form-item name="airline" label="起降机场：">
                        <t-input clearable  v-model="flightInfoEditFormData.departureAirport" />
                    </t-form-item>
                    <t-form-item name="airline" label="目的机场：">
                        <t-input clearable v-model="flightInfoEditFormData.arrivalAirport" />
                    </t-form-item>
                    <t-form-item name="airline" label="计划起飞时间：">
                        <t-input clearable v-model="flightInfoEditFormData.scheduledDepartureTime" />
                    </t-form-item>
                    <t-form-item name="airline" label="计划到达时间：">
                        <t-input clearable  v-model="flightInfoEditFormData.scheduledArrivalTime" />
                    </t-form-item>
                    <t-form-item name="airline" label="状态：">
                        <t-select clearable :options="FlightInfo_STATUS" v-model="flightInfoEditFormData.flightStatus">
                        </t-select>
                    </t-form-item>
                    <t-form-item name="airline" label="航路信息：">
                        <t-input clearable v-model="flightInfoEditFormData.route">
                        </t-input>
                    </t-form-item>
                    <t-form-item name="airline" label="实际起飞时间：">
                        <t-input clearable v-model="flightInfoEditFormData.actualDepartureTime" />
                    </t-form-item>
                    <t-form-item name="airline" label="实际到达时间：">
                        <t-input clearable v-model="flightInfoEditFormData.actualArrivalTime" />
                    </t-form-item>
                    <t-form-item name="airline" label="当前高度：">
                        <t-input clearable v-model="flightInfoEditFormData.altitude" />
                    </t-form-item>
                    <t-form-item name="airline" label="当前速度：">
                        <t-input clearable v-model="flightInfoEditFormData.speed" />
                    </t-form-item>
                    <t-form-item name="airline" label="当前经纬度：">
                        <t-input clearable v-model="flightInfoEditFormData.position" />
                    </t-form-item>
                    <t-form-item name="airline" label="备注：">
                        <t-textarea clearable v-model="flightInfoEditFormData.remarks" rows="3" />
                    </t-form-item>
                </el-scrollbar>
            </t-form>
        </template>
        <template #footer>
            <t-button theme="primary" type="submit" @click="EditButton" block>提交</t-button>
            <t-button theme="default" @click="cancelButton" block style="margin-left: 10px;">取消</t-button>
        </template>
    </userEdit>
</template>

<script lang="ts" setup>
import userEdit from '../userManage/userEdit.vue';
import { ref } from 'vue'
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { flightInfoEditFormData, flightInfoStore, useFlightInfoStore } from '../../stores/flightInfo-store'
import { FlightInfoEDIT_FORM_RULES, FlightInfo_STATUS } from '../../types/flightInfoTypes'

const store = useFlightInfoStore();
const form = ref<FormInstanceFunctions>();
const props = defineProps<{
    visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleEditVisibleChange = () => {
    emit('update:visible');
};

const cancelButton = () => {
    form.value?.reset();
    handleEditVisibleChange();
};
const EditButton = () => {
    form.value?.submit()
    handleEditVisibleChange();
};
const flightInfoEditSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.updateData(flightInfoEditFormData.value).then(() => {
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