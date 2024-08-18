<template>
    <div class="right">
        <div class="control-center">
            <p style="margin-top: 0px;margin-bottom: 2px;font-weight: bold;"><t-icon name="setting"></t-icon>控制中心</p>
            <el-scrollbar height="270px">
                <div class="processing">
                    <el-row>
                        <el-col :span="16">
                            <t-icon name="article"></t-icon>正在处理
                        </el-col>
                        <el-col :span="2">
                            <t-popup content="此操作将会退回至准备队列" placement="top" show-arrow destroy-on-close>
                                <t-popconfirm theme="warning" content="您想要撤回处理该进程单吗" confirm-btn="确认" cancel-btn="取消">
                                    <t-button theme="success" size="small" shape="square"><t-icon name="rollback"></t-icon></t-button>
                                </t-popconfirm>
                            </t-popup>
                        </el-col>
                        <el-col :span="2">
                            <t-popup content="此操作将会移至回收站" placement="top" show-arrow destroy-on-close>
                                <t-popconfirm theme="danger" content="您想要删除该进程单吗" confirm-btn="确认" cancel-btn="取消">
                                    <t-button theme="danger" size="small" shape="square"><t-icon name="delete"></t-icon></t-button>
                                </t-popconfirm>
                            </t-popup>
                        </el-col>
                        <el-col :span="2">
                            <t-popup content="此操作将会打开历史删除" placement="top" show-arrow destroy-on-close>
                                   <t-button theme="warning" size="small" shape="square"><t-icon name="delete-time"></t-icon></t-button>
                            </t-popup>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <div class="area-efps">
                            <areaEfps :BackgroundColor="processingBackgroundColor" />
                        </div>
                    </el-row>
                </div>
                <div class=" runway-overview">
                    <t-icon name="map"></t-icon>跑道概览
                    <runway/>
                </div>
                <div class="area-overview">
                    <t-icon name="cloudy-day"></t-icon>空域概览
                    <airspace/>
                </div>
                <div class="stop-overview">
                    <t-icon name="location-parking-place"></t-icon>停机位概览
                </div>
            </el-scrollbar>
            <div class="operations">
                <t-icon name="gesture-press"></t-icon>操作
                <t-row style="margin: 10px;background-color:beige;padding: 10px;border-radius: 10px;">
                    <t-col>进程单修改：</t-col>
                    <t-col ><t-select size="small" placeholder="进程单区域" style="width: 120px;"></t-select></t-col>
                    <t-col ><t-select size="small" placeholder="数据项"  style="width: 80px;"></t-select></t-col>
                    <t-col ><t-input size="small" style="width: 120px;" clearable></t-input></t-col>
                    <t-col ><t-button size="small">保存</t-button></t-col>
                    <t-row style="margin-top: 10px;" :gutter="5">
                        <t-col>指令区快捷操作：</t-col>
                        <t-col><t-select size="small" placeholder="高度" style="width: 110px;" clearable></t-select></t-col>
                        <t-col><t-button size="small">保持</t-button></t-col>
                        <t-col><t-button size="small">上升</t-button></t-col>
                        <t-col><t-button size="small">下降</t-button></t-col>
                    </t-row>
                    <t-row style="margin-top: 10px;" :gutter="5">
                        <t-col>航路区快捷操作：</t-col>
                        <t-col><t-select size="small" style="width: 110px;" clearable placeholder="角度或距离"></t-select></t-col>
                        <t-col><t-button size="small">左转</t-button></t-col>
                        <t-col><t-button size="small">右转</t-button></t-col>
                        <t-col><t-button size="small">左偏</t-button></t-col>
                        <t-col><t-button size="small">右偏</t-button></t-col>

                    </t-row>
                    <t-row style="margin-top:10px;" :gutter="5">
                    <t-col>协调区快捷操作：</t-col>
                    <t-col ><t-button size="small" variant="outline">冲突标志</t-button></t-col>
                    <t-col ><t-button size="small"  variant="outline">备降</t-button></t-col>
                    <t-col ><t-button size="small" variant="outline">返航</t-button></t-col>
                    <t-col ><t-button size="small" variant="outline">VIP</t-button></t-col>
                    <t-col ><t-button size="small" variant="outline">设置为当前时间</t-button></t-col>
                    
                </t-row>
                </t-row>
                <t-row style="margin: 10px;background-color:beige;padding: 10px;border-radius: 10px;">
                    <t-col>飞行指令：</t-col>
                    <t-col>
                        <t-input size="small" style="width: 120px;" clearable></t-input>
                    </t-col>
                    <t-col><t-button size="small">发送</t-button></t-col>
                </t-row>
                
                <t-row :gutter="5" style="margin: 10px;">
                    <t-col><t-button theme="success" shape="round">测试</t-button></t-col>
                    <t-col><t-button shape="round">移交</t-button></t-col>
                    <t-col><t-button theme="warning" shape="round">导出</t-button></t-col>
                </t-row>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import areaEfps from './areaEfps.vue';
import runway from './runway.vue'
import airspace from './airspace.vue'
import { ref } from 'vue'

const processingBackgroundColor = ref('lightskyblue')
interface User {
    date: string
    name: string
    address: string
}
const prepareEfps: User[] = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
</script>
<style lang="scss" scoped>
.right {
    display: flex;
    flex-direction: column;
}

.control-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 590px;
    width: 500px;
    background-color: white;
    border-radius: 15px;
    margin-left: 10px;
    padding: 5px;
}

.processing {

    height: 150px;
    width: 490px;
    background-color: rgba(223, 223, 223, 0.683);
    border-radius: 10px;
    padding: 5px;
}

.area-efps {
    display: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
}

.runway-overview {
    height: 150px;
    width: 490px;
    background-color: rgba(223, 223, 223, 0.683);
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
}

.area-overview {
    height: 150px;
    width: 490px;
    background-color: rgba(223, 223, 223, 0.683);
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
}

.stop-overview {
    height: 150px;
    width: 490px;
    background-color: rgba(223, 223, 223, 0.683);
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
}

.operations {
    height: 450px;
    width: 490px;
    background-color: rgba(223, 223, 223, 0.683);
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
}
</style>