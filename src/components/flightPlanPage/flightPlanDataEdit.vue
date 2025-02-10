<template>
    <userEdit :visible="visible" header="修改航班计划" @update:visible="handleEditVisibleChange">
        <template #main>
            <t-form ref="form" :data="flightPlanEditFormData" :rules="FlightPlanEDIT_FORM_RULES" :label-width="100"
                @submit="flightPlanEditSubmit">
                <el-scrollbar height="380px" style="pEditing: 40px;">
                    <t-form-item label="航班号" name="flightNumber">
                        <t-input v-model="flightPlanEditFormData.flightNumber" placeholder="请输入航班号" />
                    </t-form-item>
                    <t-form-item label="机型" name="aircraftType">
                        <t-input v-model="flightPlanEditFormData.aircraftType" placeholder="请输入机型" />
                    </t-form-item>
                    <t-form-item label="起降机场" name="departureAirport">
                        <t-input v-model="flightPlanEditFormData.departureAirport" placeholder="请输入起降机场" />
                    </t-form-item>
                    <t-form-item label="目的机场" name="arrivalAirport">
                        <t-input v-model="flightPlanEditFormData.arrivalAirport" placeholder="请输入目的机场" />
                    </t-form-item>
                    <t-form-item label="计划起飞时间" name="scheduledDepartureTime">
                        <t-date-picker enable-time-picker allow-input clearable format="YYYY-MM-DD hh:mm:ss" v-model="flightPlanEditFormData.scheduledDepartureTime" placeholder="请选择计划起飞时间" />
                    </t-form-item>
                    <t-form-item label="计划到达时间" name="scheduledArrivalTime">
                        <t-date-picker enable-time-picker allow-input clearable format="YYYY-MM-DD hh:mm:ss" v-model="flightPlanEditFormData.scheduledArrivalTime" placeholder="请选择计划到达时间" />
                    </t-form-item>
                    <t-form-item label="实际起飞时间" name="actualDepartureTime">
                        <t-date-picker enable-time-picker allow-input clearable format="YYYY-MM-DD hh:mm:ss" v-model="flightPlanEditFormData.actualDepartureTime" placeholder="请选择实际起飞时间" />
                    </t-form-item>
                    <t-form-item label="实际到达时间" name="actualArrivalTime">
                        <t-date-picker enable-time-picker allow-input clearable format="YYYY-MM-DD hh:mm:ss" v-model="flightPlanEditFormData.actualArrivalTime" placeholder="请选择实际到达时间" />
                    </t-form-item>
                    <t-form-item label="停机位" name="stand">
                        <t-input v-model="flightPlanEditFormData.stand" placeholder="请输入停机位" />
                    </t-form-item>
                    <t-form-item label="登机口" name="gate">
                        <t-input v-model="flightPlanEditFormData.gate" placeholder="请输入登机口" />
                    </t-form-item>
                    <t-form-item label="状态" name="status">
                        <t-select v-model="flightPlanEditFormData.status" placeholder="请选择状态">
                            <t-option value="已计划">已计划</t-option>
                            <t-option value="进行中">进行中</t-option>
                            <t-option value="已完成">已完成</t-option>
                        </t-select>
                    </t-form-item>
                    <t-form-item label="备注" name="remarks">
                        <t-textarea v-model="flightPlanEditFormData.remarks" placeholder="请输入备注" rows="3" />
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
import { flightPlanEditFormData,flightPlanStore,useFlightPlanStore } from '@/stores/flightPlan-store'
import { FlightPlanEDIT_FORM_RULES } from '@/types/flightPlanTypes'

const store = useFlightPlanStore();
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
const flightPlanEditSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.updateData(flightPlanEditFormData.value).then(() => {
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
<style scoped>
    
</style>