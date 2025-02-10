<template>
    <userEdit :visible="visible" header="修改跑道" @update:visible="handleEditVisibleChange">
        <template #main>
            <t-form ref="form" :data="runwayEditFormData" :rules="runwayEDIT_FORM_RULES" :label-width="100"
                @submit="runwayEditSubmit">
                <el-scrollbar height="380px" style="padding: 40px;">

                    <t-form-item name="code" label="编号">
                        <t-input v-model="runwayEditFormData.code"  />
                    </t-form-item>
                    <t-form-item name="length" label="长度">
                        <t-input v-model="runwayEditFormData.length" />
                    </t-form-item>
                    <t-form-item name="width" label="宽度">
                        <t-input v-model="runwayEditFormData.width" />
                    </t-form-item>
                    <t-form-item name="surfaceType" label="材质">
                        <t-input v-model="runwayEditFormData.surfaceType" />
                    </t-form-item>
                    <p style="margin-left: 30%;">（0：空闲，1：占用，2：停用）</p>
                    <t-form-item name="status" label="状态">
                        <t-input v-model="runwayEditFormData.status" />
                    </t-form-item>
                    <t-form-item name="remarks" label="备注">
                        <t-input v-model="runwayEditFormData.remarks" />
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
import userEdit from '@/components/userManage/userEdit.vue'
import { ref } from 'vue'
import { useRunwayStore, runwayEditFormData } from "@/stores/runway-store";
import { runwayEDIT_FORM_RULES } from '@/types/runwayTypes'
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const store = useRunwayStore();
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
const runwayEditSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.updateData(runwayEditFormData.value).then(() => {
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
  