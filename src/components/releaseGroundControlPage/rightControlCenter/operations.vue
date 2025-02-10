<template>
    <div class="operations">
        <t-icon name="gesture-press"></t-icon>操作
        <t-row :gutter="5" class="operation-row">
            <t-col><t-select size="small" v-model="selectedStopway" :options="parkingStandOptions" style="width: 100px;"
                    clearable placeholder="停机位"></t-select></t-col>
            <t-col><t-button size="small" @click="saveStopway">使用</t-button></t-col>
            <t-col><t-select size="small" v-model="selectedRunway" :options="runwayOptions" style="width: 100px;" clearable
                    placeholder="跑道号"></t-select></t-col>
            <t-col><t-button size="small" @click="saveRunway">使用</t-button></t-col>
            &ensp;|&ensp;
            <t-col><t-button size="small" theme="danger" @click="clearStopwayWithRunway">清除</t-button></t-col>
        </t-row>
        <t-row :gutter="5" class="operation-row">
            <t-col><t-select size="small" style="width: 100px;" clearable placeholder="车辆调度"></t-select></t-col>
            <t-col><t-button size="small" @click="saveStopway">确认</t-button></t-col>
            <t-col><t-select size="small" style="width: 100px;" clearable placeholder="登机口"></t-select></t-col>
            <t-col><t-button size="small" @click="">确认</t-button></t-col>


        </t-row>
        <t-row :gutter="5" style="margin-left: 5px;margin-top: 100px;">
            <t-col>
                <t-button shape="round" @click="transferVisible = true">放行</t-button>
                <t-dialog v-model:visible="transferVisible" header='确认放行？' :on-confirm="handleTransfer" theme="info">
                    <t-row>下一步将&ensp;<el-tag
                            :type="nowProcessingData[0]?.type == 1 ? 'danger' : nowProcessingData[0]?.type == 0 ? 'warning' : 'info'"
                            effect="dark">{{
                                nowProcessingData[0]?.type == 1 ? '飞行器入库' : nowProcessingData[0]?.type == 0 ? '移交至塔台席' :
                                '您没有选择进程单'
                            }}</el-tag>{{ nowProcessingData[0]?.type == 1 ? '，将释放跑道资源' :'' }}</t-row>
                    该操作不可逆，请确认移交进程单的信息：
                    <el-scrollbar hight="50px">
                        <releaseGroundEfps id="printable-efps" BackgroundColor="lightskyblue"
                            :efps-data="nowProcessingData[0] || {}" />
                    </el-scrollbar>
                </t-dialog>
            </t-col>
            <t-col><t-button theme="warning" shape="round" @click="printVisible = true">导出</t-button></t-col>
            <t-dialog v-model:visible="printVisible" header='确认打印？' :on-confirm="exportToPDFBtn" theme="info">
                <el-scrollbar hight="50px">
                    <releaseGroundEfps BackgroundColor="lightskyblue" :efps-data="nowProcessingData[0] || {}" />
                </el-scrollbar>
            </t-dialog>
        </t-row>
    </div>
</template>
<script lang="ts" setup>
import {
    clearStopwayWithRunway,
    transferEfps, selectedRunway, selectedStopway, saveStopway, saveRunway, nowProcessingData
} from '@/stores/releaseGroundEfps-store';
import { ref } from 'vue';
import releaseGroundEfps from '../releaseGroundEfps.vue'
import { programOptions } from '@/types/releaseGroundEfpsTypes';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { runwayStore, runwayOptions } from '@/stores/runway-store';
import { parkingStandStore, parkingStandOptions } from '@/stores/parkingStand-store';



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
    const element = document.querySelector('#loveSJM') as HTMLElement;
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
    width: 485px;
    transition-duration: 0.5s;
}

.operations:hover {
    background-color: rgba(255, 255, 255, 0.8);
    transition-duration: 0.5s;
}

.operation-row {
    margin: 5px;
    background-color: beige;
    padding: 10px;
    border-radius: 10px;
    transition-duration: 0.5s;

}

.operation-row:hover {
    background-color: lightgrey;
    color: white;
    transition-duration: 0.5;
    text-shadow: 2px 2px 3px rgb(0, 0, 0);
}
</style>