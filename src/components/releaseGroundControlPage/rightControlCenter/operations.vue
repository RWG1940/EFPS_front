<template>
    <div class="operations">
        <t-icon name="gesture-press"></t-icon>操作
        <t-row style="margin: 5px;background-color:beige;padding: 10px;border-radius: 10px;">
            <t-row :gutter="5">
                <t-col>进程单修改：</t-col>
                <t-col>
                    <t-select size="small" placeholder="区域" style="width: 80px;" v-model="selectedArea"
                        @change="onAreaChange">
                        <t-option v-for="option in releaseGroundEfpsAreaOptions" :key="option.value" :value="option.value"
                            :label="option.label">
                            {{ option.label }}
                        </t-option>
                    </t-select>
                </t-col>
                <t-col>
                    <t-select size="small" placeholder="数据项" style="width: 100px;" v-model="selectedItem">
                        <t-option v-for="option in itemOptions" :key="option.value" :value="option.value"
                            :label="option.label">
                            {{ option.label }}
                        </t-option>
                    </t-select>
                </t-col>
                <t-col>
                    <t-input size="small" style="width: 100px;" v-model="inputOperationsValue" clearable></t-input>
                </t-col>
                <t-col>
                    <t-button size="small" @click="saveOperations">保存</t-button>
                </t-col>
            </t-row>
            <t-row style="margin-top: 10px;" :gutter="5">
                <t-col>指令区快捷：</t-col>
                <t-col style="margin-top: -3.5px;">
                    <t-radio-group v-model="hightTypeRadio" variant="default-filled" size="small">
                        <t-radio-button value="1">高度</t-radio-button>
                        <t-radio-button value="2">场压高度</t-radio-button>
                    </t-radio-group>
                </t-col>
                <t-col>
                    <t-input-number v-model="inputHightValue" theme="column" :step="100" :max="99999" :min="0"
                        size="small" />
                </t-col>
                <t-col><t-button size="small" @click="keepHight">保持</t-button></t-col>
                <t-col><t-button size="small" @click="riseHight">上升</t-button></t-col>
                <t-col><t-button size="small" @click="declineHight">下降</t-button></t-col>
            </t-row>
            <t-row style="margin-top: 10px;" :gutter="5">
                <t-col>航路区快捷：</t-col>
                <t-col><t-input v-model="inputDE3Value" theme="column" size="small" placeholder="地面指令" />
                </t-col>
                <t-col><t-button size="small" @click="saveDE3">保存</t-button></t-col>
            
            </t-row>
            <t-row style="margin-top:10px;" :gutter="5">
                <t-col>协调区快捷：</t-col>
                <t-col><t-button size="small" variant="outline" @click="setConflictFlag">冲突标志</t-button></t-col>
                <t-col><t-button size="small" variant="outline" @click="setDiversion">备降</t-button></t-col>
                <t-col><t-button size="small" variant="outline" @click="setReturnflight">返航</t-button></t-col>
                <t-col><t-button size="small" variant="outline" @click="setVIP">VIP</t-button></t-col>
                <t-col><t-button size="small" variant="outline" @click="setCreateTime">设置创建时间</t-button></t-col>

            </t-row>
        </t-row>
        <t-row :gutter="5" style="margin: 5px;background-color:beige;padding: 10px;border-radius: 10px;">
            <t-col>飞行指令：</t-col>
           
            <t-col><t-button size="small" @click="sendFlyCommand">发送</t-button></t-col>
        </t-row>
        <t-row :gutter="5" style="margin-left: 5px;">
            <t-col><t-button theme="success" shape="round">测试</t-button></t-col>
            <t-col>
                <t-button shape="round" @click="transferVisible = true">移交</t-button>
                <t-dialog v-model:visible="transferVisible" header='确认移交？' :on-confirm="handleTransfer" theme="info">
                    该操作不可逆，请确认移交进程单的信息：
                    <el-scrollbar hight="50px">
                        <releaseGroundEfps BackgroundColor="lightskyblue" :efps-data="processingData[0] || {}" />
                    </el-scrollbar>
                </t-dialog>
            </t-col>
            <t-col><t-button theme="warning" shape="round">导出</t-button></t-col>
        </t-row>
    </div>
</template>
<script lang="ts" setup>
import {
    itemOptions,inputDE3Value,saveDE3,
    processingData, selectedArea, onAreaChange, selectedItem, inputOperationsValue, saveOperations, hightTypeRadio, inputHightValue, keepHight
    , riseHight, declineHight, setConflictFlag, setDiversion, setReturnflight, setVIP, setCreateTime,sendFlyCommand, transferEfps
} from '@/stores/releaseGroundEfps-store';
import { ref } from 'vue';
import releaseGroundEfps from '../releaseGroundEfps.vue'
import { releaseGroundEfpsAreaOptions } from '@/types/releaseGroundEfpsTypes';

const transferVisible = ref(false);

const handleTransfer = () => {
    transferVisible.value = false;
    transferEfps()
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