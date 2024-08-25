<template>
    <div class="operations">
        <t-icon name="gesture-press"></t-icon>操作
        <t-row style="margin: 5px;background-color:beige;padding: 10px;border-radius: 10px;">
            <t-col>进程单修改：</t-col>
            <t-col>
                <t-select size="small" placeholder="区域" style="width: 80px;" v-model="store.selectedArea"
                    @change="store.onAreaChange">
                    <t-option v-for="option in store.areaEfpsAreaOptions" :key="option.value" :value="option.value"
                        :label="option.label">
                        {{ option.label }}
                    </t-option>
                </t-select>
            </t-col>
            <t-col>
                <t-select size="small" placeholder="数据项" style="width: 120px;" v-model="store.selectedItem">
                    <t-option v-for="option in store.itemOptions" :key="option.value" :value="option.value"
                        :label="option.label">
                        {{ option.label }}
                    </t-option>
                </t-select>
            </t-col>
            <t-col>
                <t-input size="small" style="width: 120px;" v-model="store.inputOperationsValue" clearable></t-input>
            </t-col>
            <t-col>
                <t-button size="small" @click="store.saveOperations">保存</t-button>
            </t-col>
            <t-row style="margin-top: 10px;" :gutter="5">
                <t-col>指令区快捷：</t-col>
                <t-col style="margin-top: -3.5px;">
                    <t-radio-group v-model="store.hightTypeRadio" variant="default-filled" size="small" >
                        <t-radio-button value="1">高度</t-radio-button>
                        <t-radio-button value="2">场压高度</t-radio-button>
                    </t-radio-group>
                </t-col>
                <t-col>
                    <t-input-number v-model="store.inputHightValue" theme="column" :step="100" :max="99999" :min="0" size="small" />
                </t-col>
                <t-col><t-button size="small">保持</t-button></t-col>
                <t-col><t-button size="small">上升</t-button></t-col>
                <t-col><t-button size="small">下降</t-button></t-col>
            </t-row>
            <t-row style="margin-top: 10px;" :gutter="5">
                <t-col>航路区快捷：</t-col>
                <t-col><t-select size="small" style="width: 110px;" clearable placeholder="角度或距离"></t-select></t-col>
                <t-col><t-button size="small">左转</t-button></t-col>
                <t-col><t-button size="small">右转</t-button></t-col>
                <t-col><t-button size="small">左偏</t-button></t-col>
                <t-col><t-button size="small">右偏</t-button></t-col>

            </t-row>
            <t-row style="margin-top:10px;" :gutter="5">
                <t-col>协调区快捷：</t-col>
                <t-col><t-button size="small" variant="outline">冲突标志</t-button></t-col>
                <t-col><t-button size="small" variant="outline">备降</t-button></t-col>
                <t-col><t-button size="small" variant="outline">返航</t-button></t-col>
                <t-col><t-button size="small" variant="outline">VIP</t-button></t-col>
                <t-col><t-button size="small" variant="outline">设置为当前时间</t-button></t-col>

            </t-row>
        </t-row>
        <t-row style="margin: 5px;background-color:beige;padding: 10px;border-radius: 10px;">
            <t-col>飞行指令：</t-col>
            <t-col>
                <t-input size="small" style="width: 120px;" clearable></t-input>
            </t-col>
            <t-col><t-button size="small">发送</t-button></t-col>
        </t-row>
        <t-row :gutter="5" style="margin-left: 5px;">
            <t-col><t-button theme="success" shape="round">测试</t-button></t-col>
            <t-col><t-button shape="round">移交</t-button></t-col>
            <t-col><t-button theme="warning" shape="round">导出</t-button></t-col>
        </t-row>
    </div>
</template>
<script lang="ts" setup>
import { useareaEfpsStore } from '@/stores/areaEfps-store';

const store = useareaEfpsStore();
</script>
<style lang="scss" scoped>
.operations {
    background-color: rgba(220, 220, 220, 0.594);
    padding: 5px;
    border-radius: 5px;
    margin-top: 10px;
}
</style>