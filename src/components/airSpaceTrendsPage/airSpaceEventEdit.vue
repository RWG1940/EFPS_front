<template>
    <userEdit :visible="visible" header="编辑空域事件" @update:visible="handleEditVisibleChange">
        <template #main>
            <el-scrollbar height="520px" style="margin-bottom: 10px;">
                <t-form ref="form" :data="store.updateAirSpaceEventForm" :rules="store.updateAirSpaceEventFormRules" :label-width="0"
                    @submit="handleEditFormSubmit" @reset="cancelButton">

                    <t-form-item name="id">
                        <t-input-adornment prepend="ID">
                            <t-input v-model="store.updateAirSpaceEventForm.id" disabled clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="name">
                        <t-input-adornment prepend="空域名称">
                            <t-select v-model="store.updateAirSpaceEventForm.name" :options="store.airSpaceNameOptions" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="theme">
                        <t-input-adornment prepend="主题">
                            <t-select v-model="store.updateAirSpaceEventForm.theme" :options="store.eventThemeOptions" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="type">
                        <t-input-adornment prepend="类型">
                            <t-select v-model="store.updateAirSpaceEventForm.type" :options="store.eventTypeOptions" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="level">
                        <t-input-adornment prepend="优先级" >
                            <t-select v-model="store.updateAirSpaceEventForm.level" :options="store.eventLevelOptions" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="title">
                        <t-input-adornment prepend="标题">
                            <t-input v-model="store.updateAirSpaceEventForm.title" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="starttime">
                        <t-input-adornment prepend="开始时间">
                            <t-date-picker v-model="store.updateAirSpaceEventForm.starttime" enable-time-picker allow-input clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="endtime">
                        <t-input-adornment prepend="结束时间">
                            <t-date-picker v-model="store.updateAirSpaceEventForm.endtime" enable-time-picker allow-input clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="status">
                        <t-input-adornment prepend="状态">
                            <t-select v-model="store.updateAirSpaceEventForm.status" :options="store.eventStatusOptions" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="detail">
                        <t-input-adornment prepend="详情">
                            <t-textarea v-model="store.updateAirSpaceEventForm.detail" clearable />
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

const handleEditVisibleChange = () => {
    emit('update:visible');
};
const cancelButton: FormProps['onReset'] = () => {
    emit('update:visible')
}
// 提交用户数据
const handleEditFormSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.updateAirSpaceEventData(store.updateAirSpaceEventForm).then(() => {
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