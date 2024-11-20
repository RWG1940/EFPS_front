<template>
    <!-- 编辑航空动态 -->
    <userEdit :visible="visible" header="编辑新航空动态" @update:visible="handleEditVisibleChange">
        <template #main>
            <t-form ref="form" :data="editFormData" :rules="aircraftsTrendEDIT_FORM_RULES"
                :label-width="70" @submit="editAircraftsTrendSubmit">
                <t-form-item label="标题" name="header">
                    <t-input v-model="editFormData.header" placeholder="请输入标题" />
                </t-form-item>
                <t-form-item label="作者" name="author">
                    <t-input v-model="editFormData.author" placeholder="请输入作者" />
                </t-form-item>
                <t-form-item label="主题" name="theme">
                    <t-select v-model="editFormData.theme" placeholder="请选择主题">
                        <t-option v-for="item in aircraftsTrendThemeOptions" :value="item.value" :label="item.label"
                            :key="item.value">
                        </t-option>
                    </t-select>
                </t-form-item>
                <t-form-item label="状态" name="status">
                    <t-select v-model="editFormData.status" placeholder="请选择状态">
                        <t-option v-for="item in aircraftsTrendStatusOptions" :value="item.value" :label="item.label"
                            :key="item.value">
                        </t-option>
                    </t-select>
                </t-form-item>
                <t-form-item label="内容" name="content">
                    <t-textarea v-model="editFormData.content" placeholder="请输入文案" name="description"
                        :autosize="{ minRows: 1, maxRows: 100 }" />
                </t-form-item>


            </t-form>
        </template>
        <template #footer>
            <t-button theme="primary" @click="addButton" block>提交</t-button>
            <t-button theme="default" @click="cancelButton" block style="margin-left: 10px;">取消</t-button>

        </template>
    </userEdit>
</template>
<script lang="ts" setup>
import userEdit from '../userManage/userEdit.vue'
import { ref } from 'vue'
import { aircraftsTrendsStore,editFormData } from '@/stores/aircraftsTrends-store'
import { aircraftsTrendEDIT_FORM_RULES,aircraftsTrendThemeOptions,aircraftsTrendStatusOptions } from '@/types/aircraftsTrendsTypes'
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

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
    aircraftsTrendsStore.fetchPageData()
};
const addButton = () => {
    form.value?.submit()
    handleEditVisibleChange();
};

const editAircraftsTrendSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await aircraftsTrendsStore.updateData(editFormData.value).then(() => {
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
<style lang="scss" scoped></style>