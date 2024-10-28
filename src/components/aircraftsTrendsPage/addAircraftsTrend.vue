<template>
    <!-- 添加新航空动态 -->
    <userEdit :visible="visible" header="添加新航空动态" @update:visible="handleAddVisibleChange">
        <template #main>
            <t-form ref="form" :data="store.aircraftsTrendAddFormData" :rules="store.aircraftsTrendADD_FORM_RULES"
                :label-width="70" @submit="addAircraftsTrendSubmit">
                <t-form-item label="标题" name="header">
                    <t-input v-model="store.aircraftsTrendAddFormData.header" placeholder="请输入标题" />
                </t-form-item>
                <t-form-item label="作者" name="author">
                    <t-input v-model="store.aircraftsTrendAddFormData.author" placeholder="请输入作者" />
                </t-form-item>
                <t-form-item label="主题" name="theme">
                    <t-select v-model="store.aircraftsTrendAddFormData.theme" placeholder="请选择主题">
                        <t-option v-for="item in store.aircraftsTrendThemeOptions" :value="item.value" :label="item.label"
                            :key="item.value">
                        </t-option>
                    </t-select>
                </t-form-item>
                <t-form-item label="状态" name="status">
                    <t-select v-model="store.aircraftsTrendAddFormData.status" placeholder="请选择状态">
                        <t-option v-for="item in store.aircraftsTrendStatusOptions" :value="item.value" :label="item.label"
                            :key="item.value">
                        </t-option>
                    </t-select>
                </t-form-item>
                <t-form-item label="内容" name="content">
                    <t-textarea v-model="store.aircraftsTrendAddFormData.content" placeholder="请输入文案" name="description"
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
import { useAircraftsTrendsStore } from '@/stores/aircraftsTrends-store'
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const form = ref<FormInstanceFunctions>();
const store = useAircraftsTrendsStore()
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

const addAircraftsTrendSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.addAircraftsTrendData().then(() => {
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