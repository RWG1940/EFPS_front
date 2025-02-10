<template>
    <div class="areaEfps" @click="handleSelected">
        <el-row class="wrap">
            <t-popup content="标牌区" placement="top" show-arrow destroy-on-close>
                <el-col :span="6" class="signage-area" :style="{ backgroundColor: BackgroundColor }">
                    <t-tooltip :content="'航空器呼号: ' + efpsData.a1" placement="top" show-arrow destroy-on-close>
                        <el-row style="font-weight: bolder;">{{ efpsData.a1 }}</el-row>
                    </t-tooltip>
                    <el-row>
                        <t-tooltip :content="'航空器机型: ' + efpsData.b1" placement="top" show-arrow destroy-on-close>
                            <el-col :span="8">{{ efpsData.b1 }}</el-col>
                        </t-tooltip>
                        <t-tooltip :content="'尾流标志: ' + efpsData.c1" placement="top" show-arrow destroy-on-close>
                            <el-col :span="8">{{ efpsData.c1 }}</el-col>
                        </t-tooltip>
                        <t-tooltip :content="'二次雷达应答机模式及编码: ' + efpsData.d1" placement="top" show-arrow destroy-on-close>
                            <el-col :span="8">{{ efpsData.d1 }}</el-col>
                        </t-tooltip>
                    </el-row>
                    <el-row>
                        <t-tooltip :content="'起飞机场: ' + efpsData.e1" placement="bottom" show-arrow destroy-on-close>
                            <el-col :span="12">{{ efpsData.e1 }}</el-col>
                        </t-tooltip>
                        <t-tooltip :content="'预计起飞/降落时刻: ' + efpsData.fg1" placement="bottom" show-arrow destroy-on-close>
                            <el-col :span="12">{{ efpsData.fg1 }}</el-col>
                        </t-tooltip>
                    </el-row>
                    <el-row>
                        <t-tooltip :content="'目的地机场: ' + efpsData.h1" placement="bottom" show-arrow destroy-on-close>
                            <el-col :span="24">{{ efpsData.h1 }}</el-col>
                        </t-tooltip>
                    </el-row>
                </el-col>
            </t-popup>
            <t-popup content="指令区" placement="top" show-arrow destroy-on-close>
                <el-col :span="4" class="command-area" :style="{ backgroundColor: BackgroundColor }">
                    <t-tooltip :content="'申请的巡航高度层: ' + efpsData.a2" placement="top" show-arrow destroy-on-close>
                        <el-row>{{ efpsData.a2 }}</el-row>
                    </t-tooltip>
                    <t-tooltip :content="'高度变化1: ' + efpsData.b21" placement="left" show-arrow destroy-on-close>
                        <el-row>{{ efpsData.b21 }}</el-row>
                    </t-tooltip>
                    <t-tooltip :content="'高度变化2: ' + efpsData.b22" placement="left" show-arrow destroy-on-close>
                        <el-row>{{ efpsData.b22 }}</el-row>
                    </t-tooltip>
                    <t-tooltip :content="'高度变化3: ' + efpsData.b23" placement="left" show-arrow destroy-on-close>
                        <el-row>{{ efpsData.b23 }}</el-row>
                    </t-tooltip>
                    <t-tooltip :content="'其他指令: ' + efpsData.c2" placement="bottom" show-arrow destroy-on-close>
                        <el-row>{{ efpsData.c2 }}</el-row>
                    </t-tooltip>
                </el-col>
            </t-popup>
            <t-popup content="航路区" placement="top" show-arrow destroy-on-close>
                <el-col :span="8" class="route-area" :style="{ backgroundColor: BackgroundColor }">
                    <el-row>
                        <el-col :span="8">
                            <t-tooltip :content="'位置报告点名称: ' + efpsData.a31" placement="top" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.a31 }}</el-row>
                            </t-tooltip>
                            <t-tooltip :content="'位置报: ' + efpsData.b31" placement="bottom" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.b31 }}</el-row>
                            </t-tooltip>
                        </el-col>
                        <el-col :span="8">
                            <t-tooltip :content="'位置报告点名称: ' + efpsData.a32" placement="top" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.a32 }}</el-row>
                            </t-tooltip>
                            <t-tooltip :content="'位置报: ' + efpsData.b32" placement="bottom" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.b32 }}</el-row>
                            </t-tooltip>
                        </el-col>
                        <el-col :span="8">
                            <t-tooltip :content="'位置报告点名称: ' + efpsData.a33" placement="top" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.a33 }}</el-row>
                            </t-tooltip>
                            <t-tooltip :content="'位置报: ' + efpsData.b33" placement="bottom" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.b33 }}</el-row>
                            </t-tooltip>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <t-tooltip :content="'位置报告点名称: ' + efpsData.a34" placement="top" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.a34 }}</el-row>
                            </t-tooltip>
                            <t-tooltip :content="'位置报: ' + efpsData.b34" placement="bottom" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.b34 }}</el-row>
                            </t-tooltip>
                        </el-col>
                        <el-col :span="8">
                            <t-tooltip :content="'位置报告点名称: ' + efpsData.a35" placement="top" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.a35 }}</el-row>
                            </t-tooltip>
                            <t-tooltip :content="'位置报: ' + efpsData.b35" placement="bottom" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.b35 }}</el-row>
                            </t-tooltip>
                        </el-col>
                        <el-col :span="8">
                            <t-tooltip :content="'位置报告点名称: ' + efpsData.a36" placement="top" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.a36 }}</el-row>
                            </t-tooltip>
                            <t-tooltip :content="'位置报: ' + efpsData.b36" placement="bottom" show-arrow destroy-on-close>
                                <el-row>{{ efpsData.b36 }}</el-row>
                            </t-tooltip>
                        </el-col>
                    </el-row>
                </el-col>
            </t-popup>
            <t-popup content="协调区" placement="top" show-arrow destroy-on-close>
                <el-col :span="6" class="coordination-area" :style="{ backgroundColor: BackgroundColor }">
                    <el-row>
                        <el-col :span="10">
                            <t-tooltip :content="'进程单生成日期和时刻: ' + formatDate(efpsData.createtime || '')" placement="top"
                                show-arrow destroy-on-close>
                                <el-col class="createtime">{{ formatDate(efpsData.createtime || '').slice(0, 10) }}</el-col>
                            </t-tooltip>
                            <t-tooltip :content="'其他信息: ' + efpsData.c4" placement="bottom" show-arrow destroy-on-close>
                                <el-col>
                                    <template v-if="efpsData.c4 === 'W'">
                                        <el-tag type="danger">W</el-tag>
                                    </template>
                                    <template v-else>
                                        {{ efpsData.c4 }}
                                    </template>
                                </el-col>
                            </t-tooltip>
                        </el-col>
                        <el-col :span="14">
                            <el-row>
                                <t-tooltip :content="'航空器收到本场ATIS信息: ' + efpsData.m" placement="top" show-arrow
                                    destroy-on-close>
                                    <el-col :span="12">
                                        <template v-if="efpsData.m === '0'">
                                            N
                                        </template>
                                        <template v-else>
                                            Y
                                        </template>
                                    </el-col>
                                </t-tooltip>
                                <t-tooltip :content="'扇区号: ' + efpsData.a4" placement="top" show-arrow destroy-on-close>
                                    <el-col :span="12">{{ efpsData.a4 }}</el-col>
                                </t-tooltip>
                            </el-row>
                            <t-tooltip :content="'对过境航班，拍发EST报: ' + efpsData.e" placement="right" show-arrow
                                destroy-on-close>
                                <el-row>
                                    <template v-if="efpsData.e === '0'">
                                        N
                                    </template>
                                    <template v-else>
                                        Y
                                    </template>
                                </el-row>
                            </t-tooltip>
                            <t-tooltip :content="'与空军协调完毕: ' + efpsData.a" placement="right" show-arrow destroy-on-close>
                                <el-row>
                                    <template v-if="efpsData.a === '0'">
                                            N
                                        </template>
                                        <template v-else>
                                            Y
                                        </template>
                                </el-row>
                            </t-tooltip>
                            <t-tooltip :content="'航空器被雷达识别: ' + efpsData.i" placement="right" show-arrow destroy-on-close>
                                <el-row>
                                    <template v-if="efpsData.i === '0'">
                                            N
                                        </template>
                                        <template v-else>
                                            Y
                                        </template>
                                </el-row>
                            </t-tooltip>
                        </el-col>
                    </el-row>
                </el-col>
            </t-popup>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue';
import type { AreaEfpsData } from '@/types/areaEfpsDataTypes';
import { formatDate } from '@/utils/moment'

const handleSelected = () => {
    console.log('i love u')

}
defineProps({
    BackgroundColor: {
        type: String,
        required: true,
    },
    efpsData: {
        type: Object as PropType<AreaEfpsData>,
        required: true,
    },
});
</script>
<style lang="scss" scoped>
.areaEfps :hover {
    transform: scale(0.95);
    transition-duration: 0.5s;
    box-shadow: 1px 1px 20px rgb(0, 0, 0);
    border-radius: 10px;
    cursor: pointer;
}

.areaEfps :active {
    transform: scale(1.2);
}

.el-col {
    transition-duration: 0.3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.el-row {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.el-col :hover{
    background-color: rgba(255, 255, 255, 0.514);
    color:rgb(0, 0, 0);
    transition-duration: 0.1s;
    

}
.el-row :hover {
    box-shadow: 1px 1px 10px rgb(138, 138, 138);
}

.wrap {
    height: 120px;
    max-height: 130px;
    width: 490px;
    transition-duration: 1s;
    font-size: xx-small;
}

.signage-area {
    padding: 10px;
    border-right: solid 1px darkgray;

}

.command-area {
    padding: 10px;
    border-right: solid 1px darkgray;
}

.route-area {
    padding: 10px;
    border-right: solid 1px darkgray;
}

.coordination-area {
    padding: 10px;
}

.createtime {
    transition-duration: 0.5s;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>