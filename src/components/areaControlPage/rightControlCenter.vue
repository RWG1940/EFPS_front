<template>
    <div class="right">
        <div class="control-center">
            <p style="margin-top: 0px;margin-bottom: 2px;font-weight: bold;">控制中心</p>
            <el-scrollbar height="300px">
                <div class="processing">
                    正在处理
                    <div class="area-efps">
                    <areaEfps :BackgroundColor="processingBackgroundColor" />
                    </div>
                </div>
                <div class=" runway-overview">
                    跑道概览
                </div>
                <div class="area-overview">
                    空域概览
                </div>
                <div class="stop-overview">
                    停机位概览
                </div>
            </el-scrollbar>
            <div class="operations">
                操作
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import areaEfps from './areaEfps.vue';
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

.area-efps{
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