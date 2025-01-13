<template>
    <div class="operations">
        <t-icon name="gesture-press"></t-icon>操作
        <t-row style="margin: 5px;background-color:beige;padding: 10px;border-radius: 10px;">
            <t-row :gutter="5">
                <t-col>进程单修改：</t-col>
                <t-col>
                    <t-select size="small" placeholder="区域" style="width: 80px;" v-model="selectedArea"
                        @change="onAreaChange">
                        <t-option v-for="option in areaEfpsAreaOptions" :key="option.value" :value="option.value"
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
                <t-col><t-select size="small" style="width: 90px;" placeholder="记录区" v-model="selectedRecordArea">
                        <t-option v-for="option in recordAreaOptions" :key="option.value" :value="option.value"
                            :label="option.label">
                            {{ option.label }}
                        </t-option>
                    </t-select></t-col>
                <t-col><t-input size="small" style="width: 80px;" clearable placeholder="位置名称"
                        v-model="locationName"></t-input></t-col>
                <t-col><t-input size="small" style="width: 80px;" clearable placeholder="位置报"
                        v-model="locationReport"></t-input></t-col>
                <t-col><t-button size="small" @click="locationReportSave">保存</t-button></t-col>

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
            <t-col>
                <t-input size="small" style="width: 120px;" clearable v-model="flyCommand"></t-input>
            </t-col>
            <t-col><t-button size="small" @click="sendFlyCommand">发送</t-button></t-col>
        </t-row>
        <t-row :gutter="5" style="margin-left: 5px;">
            <t-col><t-button theme="success" shape="round">测试</t-button></t-col>
            <t-col>
                <t-button shape="round" @click="transferVisible = true">移交</t-button>
                <t-dialog v-model:visible="transferVisible" header='确认移交？' :on-confirm="handleTransfer" theme="info">
                    <t-row>将会移交至&ensp;<el-tag :type="nowProcessingData[0]?.type == 1 ? 'warning' : 'danger'" effect="dark" >{{ nowProcessingData[0]?.type == 1 ? '塔台席' : '暂未对接下一步的接口' }}</el-tag></t-row>
                    该操作不可逆，请确认移交进程单的信息：
                    <el-scrollbar hight="50px">
                        <areaEfps BackgroundColor="lightskyblue" :efps-data="nowProcessingData[0] || {}" />
                    </el-scrollbar>
                </t-dialog>
            </t-col>
            <t-col><t-button theme="warning" shape="round" @click="printVisible = true">导出</t-button></t-col>
            <t-dialog v-model:visible="printVisible" header='确认打印？' :on-confirm="exportToPDFBtn" theme="info">
                <el-scrollbar hight="50px">
                    <areaEfps BackgroundColor="lightskyblue" :efps-data="nowProcessingData[0] || {}" />
                </el-scrollbar>
            </t-dialog>
        </t-row>
    </div>
</template>
<script lang="ts" setup>
import { useAreaEfpsStore,transferEfps,nowProcessingData, saveOperations, setCreateTime, sendFlyCommand, filterEfpsByStatusAndDate, recycleProcessingAreaEfps, withdrawAreaEfps, onAreaChange, setVIP, locationReportSave, riseHight, declineHight, keepHight, setConflictFlag, setDiversion, setReturnflight
, selectedArea, inputOperationsValue, selectedItem, inputHightValue, hightTypeRadio, selectedRecordArea, locationName, locationReport,flyCommand,itemOptions } from '@/stores/areaEfps-store';
import { areaEfpsAreaOptions, recordAreaOptions } from '@/types/areaEfpsDataTypes';
import { ref } from 'vue';
import areaEfps from '../areaEfps.vue'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const store = useAreaEfpsStore();
const transferVisible = ref(false);
const printVisible = ref(false)

const handleTransfer = () => {
    transferVisible.value = false;
    transferEfps()
};
const exportToPDFBtn = () => {
    printVisible.value = false;
    exportToPDF()
};
const exportToPDF = async () => {
    // 获取需要导出的元素
    const element = document.querySelector('#loveSJM')as HTMLElement;
    if (!element) return;

    // 使用 html2canvas 将元素转换为图像
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    console.log(imgData); // 打印 base64 数据
    if (!imgData.startsWith('data:image/png;base64,')) {
        console.error('生成的图片数据格式错误或无效');
        return;
    }

    // 创建 jsPDF 实例
    const pdf = new jsPDF();

    // 计算图像的宽度和高度以适应 PDF 页面
    const imgWidth = 210; // A4 页面宽度
    const pageHeight = 297; // A4 页面高度
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // 添加图像到 PDF
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 如果图像高度超过一页，则继续添加新的页面
    while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }
    
    // 保存 PDF
    pdf.save('nowProcessingData.pdf');
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