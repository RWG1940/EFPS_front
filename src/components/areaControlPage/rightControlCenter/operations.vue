<template>
    <div class="operations">
        <t-icon name="gesture-press"></t-icon>操作
        <t-row style="margin: 5px;background-color:beige;padding: 10px;border-radius: 10px;">
            <t-row :gutter="5">
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
                    <t-select size="small" placeholder="数据项" style="width: 100px;" v-model="store.selectedItem">
                        <t-option v-for="option in store.itemOptions" :key="option.value" :value="option.value"
                            :label="option.label">
                            {{ option.label }}
                        </t-option>
                    </t-select>
                </t-col>
                <t-col>
                    <t-input size="small" style="width: 100px;" v-model="store.inputOperationsValue" clearable></t-input>
                </t-col>
                <t-col>
                    <t-button size="small" @click="store.saveOperations">保存</t-button>
                </t-col>
            </t-row>
            <t-row style="margin-top: 10px;" :gutter="5">
                <t-col>指令区快捷：</t-col>
                <t-col style="margin-top: -3.5px;">
                    <t-radio-group v-model="store.hightTypeRadio" variant="default-filled" size="small">
                        <t-radio-button value="1">高度</t-radio-button>
                        <t-radio-button value="2">场压高度</t-radio-button>
                    </t-radio-group>
                </t-col>
                <t-col>
                    <t-input-number v-model="store.inputHightValue" theme="column" :step="100" :max="99999" :min="0"
                        size="small" />
                </t-col>
                <t-col><t-button size="small" @click="store.keepHight">保持</t-button></t-col>
                <t-col><t-button size="small" @click="store.riseHight">上升</t-button></t-col>
                <t-col><t-button size="small" @click="store.declineHight">下降</t-button></t-col>
            </t-row>
            <t-row style="margin-top: 10px;" :gutter="5">
                <t-col>航路区快捷：</t-col>
                <t-col><t-select size="small" style="width: 90px;" placeholder="记录区" v-model="store.selectedRecordArea">
                        <t-option v-for="option in store.recordAreaOptions" :key="option.value" :value="option.value"
                            :label="option.label">
                            {{ option.label }}
                        </t-option>
                    </t-select></t-col>
                <t-col><t-input size="small" style="width: 80px;" clearable placeholder="位置名称"
                        v-model="store.locationName"></t-input></t-col>
                <t-col><t-input size="small" style="width: 80px;" clearable placeholder="位置报"
                        v-model="store.locationReport"></t-input></t-col>
                <t-col><t-button size="small" @click="store.locationReportSave">保存</t-button></t-col>

            </t-row>
            <t-row style="margin-top:10px;" :gutter="5">
                <t-col>协调区快捷：</t-col>
                <t-col><t-button size="small" variant="outline" @click="store.setConflictFlag">冲突标志</t-button></t-col>
                <t-col><t-button size="small" variant="outline" @click="store.setDiversion">备降</t-button></t-col>
                <t-col><t-button size="small" variant="outline" @click="store.setReturnflight">返航</t-button></t-col>
                <t-col><t-button size="small" variant="outline" @click="store.setVIP">VIP</t-button></t-col>
                <t-col><t-button size="small" variant="outline" @click="store.setCreateTime">设置创建时间</t-button></t-col>

            </t-row>
        </t-row>
        <t-row :gutter="5" style="margin: 5px;background-color:beige;padding: 10px;border-radius: 10px;">
            <t-col>飞行指令：</t-col>
            <t-col>
                <t-input size="small" style="width: 120px;" clearable v-model="store.flyCommand"></t-input>
            </t-col>
            <t-col><t-button size="small" @click="store.sendFlyCommand">发送</t-button></t-col>
        </t-row>
        <t-row :gutter="5" style="margin-left: 5px;">
            <t-col><t-button theme="success" shape="round">测试</t-button></t-col>
            <t-col>
                <t-button shape="round" @click="transferVisible = true">移交</t-button>
                <t-dialog v-model:visible="transferVisible" header='确认移交？' :on-confirm="handleTransfer" theme="info">
                    该操作不可逆，请确认移交进程单的信息：
                    <el-scrollbar hight="50px">
                    <areaEfps BackgroundColor="lightskyblue" :efps-data="store.processingData[0] || {}" />
                </el-scrollbar>
                </t-dialog>
            </t-col>
            <t-col><t-button theme="warning" shape="round">导出</t-button></t-col>
        </t-row>
    </div>
</template>
<script lang="ts" setup>
import { useareaEfpsStore } from '@/stores/areaEfps-store';
import { ref } from 'vue';
import areaEfps from '../areaEfps.vue'

const store = useareaEfpsStore();
const transferVisible = ref(false);

const handleTransfer = () => {
    transferVisible.value = false;
    store.transferEfps()
};
</script>
<style lang="scss" scoped>
.operations {
    background-color: rgba(255, 255, 255, 0.594);
    padding: 5px;
    border-radius: 10px;
    margin-top: 10px;
}
</style>