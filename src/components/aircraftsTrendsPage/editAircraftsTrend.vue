<template>
    <!-- 编辑航空动态 -->
    <userEdit :visible="visible" header="编辑新航空动态" @update:visible="handleEditVisibleChange">
        <template #main>
            <t-form ref="form" :data="store.aircraftsTrendEditFormData" :rules="store.aircraftsTrendEDIT_FORM_RULES"
                :label-width="70" @submit="editAircraftsTrendSubmit">
                <t-form-item label="标题" name="header">
                    <t-input v-model="store.aircraftsTrendEditFormData.header" placeholder="请输入标题" />
                </t-form-item>
                <t-form-item label="作者" name="author">
                    <t-input v-model="store.aircraftsTrendEditFormData.author" placeholder="请输入作者" />
                </t-form-item>
                <t-form-item label="主题" name="theme">
                    <t-select v-model="store.aircraftsTrendEditFormData.theme" placeholder="请选择主题">
                        <t-option v-for="item in store.aircraftsTrendThemeOptions" :value="item.value" :label="item.label"
                            :key="item.value">
                        </t-option>
                    </t-select>
                </t-form-item>
                <t-form-item label="状态" name="status">
                    <t-select v-model="store.aircraftsTrendEditFormData.status" placeholder="请选择状态">
                        <t-option v-for="item in store.aircraftsTrendStatusOptions" :value="item.value" :label="item.label"
                            :key="item.value">
                        </t-option>
                    </t-select>
                </t-form-item>
                <t-form-item label="内容" name="content">
                    <t-textarea v-model="store.aircraftsTrendEditFormData.content" placeholder="请输入文案" name="description"
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

const handleEditVisibleChange = () => {
    emit('update:visible');
};

const cancelButton = () => {
    form.value?.reset();
    handleEditVisibleChange();
    store.getPage()
};
const addButton = () => {
    form.value?.submit()
    handleEditVisibleChange();
};

const editAircraftsTrendSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.updateAircraftsTrendData().then(() => {
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