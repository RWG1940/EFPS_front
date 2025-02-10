<template>
    <userEdit :visible="visible" header="新增停机坪" @update:visible="handleAddVisibleChange">
        <template #main>
            <t-form ref="form" :data="parkingStandAddFormData" :rules="parkingStandADD_FORM_RULES" :label-width="100"
                @submit="parkingStandAddSubmit">
                <el-scrollbar height="380px" style="padding: 40px;">

                    <t-form-item name="code" label="编号">
                        <t-input v-model="parkingStandAddFormData.code" />
                    </t-form-item>
                    <p style="margin-left: 30%;">（1：小型，2：中型，3：大型）</p>
                    <t-form-item name="size" label="大小">
                        <t-input v-model="parkingStandAddFormData.size" />
                    </t-form-item>
                    <t-form-item name="location" label="位置">
                        <t-input v-model="parkingStandAddFormData.location" />
                    </t-form-item>
                    <p style="margin-left: 30%;">（0：空闲，1：占用，2：停用）</p>
                    <t-form-item name="status" label="状态">
                        <t-input v-model="parkingStandAddFormData.status" />
                    </t-form-item>
                    <t-form-item name="remarks" label="备注">
                        <t-input v-model="parkingStandAddFormData.remarks" />
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
import userEdit from '../userManage/userEdit.vue';
import { ref } from 'vue'
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { parkingStandAddFormData,parkingStandStore,useParkingStandStore } from '@/stores/parkingStand-store'
import { parkingStandADD_FORM_RULES } from '@/types/parkingStandTypes'

const store = useParkingStandStore();
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
const parkingStandAddSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.addData(parkingStandAddFormData.value).then(() => {
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