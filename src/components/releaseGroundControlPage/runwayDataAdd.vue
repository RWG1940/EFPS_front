<template>
    <userEdit :visible="visible" header="添加跑道" @update:visible="handleAddVisibleChange">
        <template #main>
            <t-form ref="form" :data="runwayAddFormData" :rules="runwayADD_FORM_RULES" :label-width="100"
                @submit="runwayAddSubmit">
                <el-scrollbar height="380px" style="padding: 40px;">

                    <t-form-item name="code" label="编号">
                        <t-input v-model="runwayAddFormData.code" />
                    </t-form-item>
                    <t-form-item name="length" label="长度">
                        <t-input v-model="runwayAddFormData.length" />
                    </t-form-item>
                    <t-form-item name="width" label="宽度">
                        <t-input v-model="runwayAddFormData.width" />
                    </t-form-item>
                    <t-form-item name="surfaceType" label="材质">
                        <t-input v-model="runwayAddFormData.surfaceType" />
                    </t-form-item>
                    <p style="margin-left: 30%;">（0：空闲，1：占用，2：停用）</p>
                    <t-form-item name="status" label="状态">
                        <t-input v-model="runwayAddFormData.status" />
                    </t-form-item>
                    <t-form-item name="remarks" label="备注">
                        <t-input v-model="runwayAddFormData.remarks" />
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
import { useRunwayStore, runwayAddFormData } from "@/stores/runway-store";
import { runwayADD_FORM_RULES } from '@/types/runwayTypes'
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const store = useRunwayStore();
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
const runwayAddSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.addData(runwayAddFormData.value).then(() => {
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
  