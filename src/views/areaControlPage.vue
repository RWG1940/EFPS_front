<template>
    <div class="wrap">
        <pageHeader />
        <div class="content">
            <div class="left">
                <el-scrollbar height="600px">
                    <p style="margin-top: 0;text-decoration: underline blue 10px;font-weight: bold;">进港
                        <t-button class="rround" theme="default" shape="circle" style="margin-left: 10px;"><t-icon name='refresh'></t-icon></t-button>
                        <t-button class="rround" theme="default" shape="circle"><t-icon name='add'></t-icon></t-button>
                    </p>
                    <div class="arrival-fps-container">
                        <div class="arrival-prepare-container">
                            <el-table :data="prepareEfps" style="width: 100%" max-height="250">
                                <el-table-column label="准备中的进程单" width="480" sortable>
                                    <template #default="scope">
                                        <div style="display: flex; align-items: center;flex-direction: column;">
                                            <areaEfps :BackgroundColor="prepareBackgroundColor" />
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="arrival-handled-container">
                            <el-table :data="prepareEfps" style="width: 100%" max-height="250">
                                <el-table-column label="已移交的进程单" width="480" sortable>
                                    <template #default="scope">
                                        <div style="display: flex; align-items: center;flex-direction: column;">
                                            <areaEfps :BackgroundColor="handledBackgroundColor" />
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <p style="margin-top: 10px;text-decoration: underline blue 10px;font-weight: bold;">出港
                        <t-button class="rround" theme="default" shape="circle" style="margin-left: 10px;"><t-icon name='refresh'></t-icon></t-button>
                        <t-button class="rround" theme="default" shape="circle"><t-icon name='add'></t-icon></t-button>
                    </p>
                    <div class="departure-fps-container">
                        <div class="departure-prepare-container">
                            <el-table :data="prepareEfps" style="width: 100%" max-height="250">
                                <el-table-column label="准备中的进程单" width="480" sortable>
                                    <template #default="scope">
                                        <div style="display: flex; align-items: center;flex-direction: column;">
                                            <areaEfps :BackgroundColor="prepareBackgroundColor" />
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="departure-handled-container">
                            <el-table :data="prepareEfps" style="width: 100%" max-height="250">
                                <el-table-column label="已移交的进程单" width="480" sortable>
                                    <template #default="scope">
                                        <div style="display: flex; align-items: center;flex-direction: column;">
                                            <areaEfps :BackgroundColor="handledBackgroundColor" />
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <p style="margin-top: 10px;text-decoration: underline blue 10px;font-weight: bold;">信息
                        <t-button class="rround" theme="default" shape="circle"><t-icon name='refresh'></t-icon></t-button>
                    </p>
                    <msgTool />
                </el-scrollbar>
            </div>
            <rightControlCenter />
        </div>
        <pageFooter />
    </div>
</template>
<script lang="ts" setup>
import pageHeader from '@/components/areaControlPage/pageHeader.vue'
import pageFooter from '@/components/areaControlPage/pageFooter.vue'
import rightControlCenter from '@/components/areaControlPage/rightControlCenter.vue'
import msgTool from '@/components/areaControlPage/msgTool.vue'
import areaEfps from '@/components/areaControlPage/areaEfps.vue'
import { ref } from 'vue'

const prepareBackgroundColor = ref('antiquewhite')
const handledBackgroundColor = ref('lightgreen')
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
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]


</script>
<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: rgba(220, 220, 220, 0.594);
}

.content {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
}

.rround {
    transition-duration: 0.3s;
}
.rround:hover {
    transition-duration: 0.3s;
    transform: rotate(180deg);
}
.arrival-fps-container {
    display: flex;
}

.arrival-prepare-container {
    height: 250px;
    width: 480px;
    background-color: white;
    border-radius: 15px;
    padding: 5px;


}

.arrival-handled-container {
    height: 250px;
    width: 480px;
    background-color: white;
    border-radius: 15px;
    margin-left: 10px;
    padding: 5px;

}

.departure-fps-container {
    display: flex;
    margin-top: 10px;
}

.departure-prepare-container {
    height: 250px;
    width: 480px;
    background-color: white;
    border-radius: 15px;
    padding: 5px;
}

.departure-handled-container {
    height: 250px;
    width: 480px;
    background-color: white;
    border-radius: 15px;
    margin-left: 10px;
    padding: 5px;
}
</style>