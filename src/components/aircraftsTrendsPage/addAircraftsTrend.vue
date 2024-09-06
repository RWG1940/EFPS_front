<template>
    <!-- 添加新航空动态 -->
    <userEdit :visible="visible" header="添加新航空动态" @update:visible="handleAddVisibleChange">
        <template #main>
            <t-form ref="form" :data="store.aircraftsTrendAddFormData" :rules="store.aircraftsTrendADD_FORM_RULES"
                :label-width="70" @submit="store.addAircraftsTrendSubmit">
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

                <!-- 提交和取消按钮 -->
                <t-form-item>
                    <t-button theme="primary" type="submit" @click="addButton" block>提交</t-button>
                    <t-button theme="default" @click="cancelButton" block style="margin-left: 10px;">取消</t-button>
                </t-form-item>
            </t-form>
        </template>
        <template #footer>

        </template>
    </userEdit>
</template>
<script lang="ts" setup>
import userEdit from '../userManage/userEdit.vue'
import { ref } from 'vue'
import { useAircraftsTrendsStore } from '@/stores/aircraftsTrends-store'

const store = useAircraftsTrendsStore()
const props = defineProps<{
    visible: boolean;
}>();
// 定义通知父组件事件
const emit = defineEmits(['update:visible']);
// visible更新后通知父组件
const handleAddVisibleChange = () => {
    emit('update:visible');
};

const cancelButton = () => {
    store.aircraftsTrendAddFormData = {};
    handleAddVisibleChange();
};
const addButton = () => {
    handleAddVisibleChange();
};


</script>
<style lang="scss" scoped></style>