<template>
    <userEdit :visible="visible" header="添加空域事件" @update:visible="handleAddVisibleChange">
        <template #main>
            <el-scrollbar height="520px" style="margin-bottom: 10px;">
                <t-form ref="form" :data="store.addAirSpaceEventForm" :rules="store.addAirSpaceEventFormRules" :label-width="0"
                    @submit="handleAddFormSubmit" @reset="cancelButton">

                    <t-form-item name="name">
                        <t-input-adornment prepend="空域名称">
                            <t-select v-model="store.addAirSpaceEventForm.name" :options="store.airSpaceNameOptions" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="theme">
                        <t-input-adornment prepend="主题">
                            <t-select v-model="store.addAirSpaceEventForm.theme" :options="store.eventThemeOptions" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="type">
                        <t-input-adornment prepend="类型">
                            <t-select v-model="store.addAirSpaceEventForm.type" :options="store.eventTypeOptions" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="level">
                        <t-input-adornment prepend="优先级" >
                            <t-select v-model="store.addAirSpaceEventForm.level" :options="store.eventLevelOptions" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="title">
                        <t-input-adornment prepend="标题">
                            <t-input v-model="store.addAirSpaceEventForm.title" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="starttime">
                        <t-input-adornment prepend="开始时间">
                            <t-date-picker v-model="store.addAirSpaceEventForm.starttime" enable-time-picker allow-input clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="endtime">
                        <t-input-adornment prepend="结束时间">
                            <t-date-picker v-model="store.addAirSpaceEventForm.endtime" enable-time-picker allow-input clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="status">
                        <t-input-adornment prepend="状态">
                            <t-select v-model="store.addAirSpaceEventForm.status" :options="store.eventStatusOptions" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="detail">
                        <t-input-adornment prepend="详情">
                            <t-textarea v-model="store.addAirSpaceEventForm.detail" clearable />
                        </t-input-adornment>
                    </t-form-item>
                </t-form>
            </el-scrollbar>
        </template>
        <template #footer>
            <t-button theme="primary" @click="submitBtn" block>提交</t-button>
            <t-button theme="default" @click="resetBtn" block style="margin-left: 10px;">取消</t-button>
        </template>
    </userEdit>
</template>
<script lang="ts" setup>
import userEdit from '../userManage/userEdit.vue';
import { useAirSpaceEventStore } from '@/stores/airSpaceEvent-store';
import { ref } from 'vue';
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const form = ref<FormInstanceFunctions>();
const store = useAirSpaceEventStore();
const props = defineProps<{
    visible: boolean;
}>();
const emit = defineEmits(['update:visible']);

const handleAddVisibleChange = () => {
    emit('update:visible');
};
const cancelButton: FormProps['onReset'] = () => {
    emit('update:visible')
}
// 提交用户数据
const handleAddFormSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.addAirSpaceEventData(store.addAirSpaceEventForm).then(() => {
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

const submitBtn = () => {
    form.value?.submit();
}
const resetBtn = () => {
    form.value?.reset();
}

</script>
<style scoped></style>