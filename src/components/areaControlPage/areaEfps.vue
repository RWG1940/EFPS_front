<template>
    <div class="areaEfps" @click="handleSelected">
        <el-row class="wrap">
            <t-popup content="标牌区" placement="top" show-arrow destroy-on-close>
                <el-col :span="6" class="signage-area" :style="{ backgroundColor: BackgroundColor }">
                    <t-popup content="航空器呼号" placement="top" show-arrow destroy-on-close>
                        <el-row>1a</el-row>
                    </t-popup>
                    <el-row>
                        <t-popup content="航空器机型" placement="top" show-arrow destroy-on-close>
                            <el-col :span="8">1b</el-col>
                        </t-popup>
                        <t-popup content="尾流标志" placement="top" show-arrow destroy-on-close>
                            <el-col :span="8">1c</el-col>
                        </t-popup>
                        <t-popup content="二次雷达应答机模式及编码" placement="top" show-arrow destroy-on-close>
                            <el-col :span="8">1d</el-col>
                        </t-popup>
                    </el-row>
                    <el-row>
                        <t-popup content="起飞机场" placement="bottom" show-arrow destroy-on-close>

                            <el-col :span="8">1e</el-col>
                        </t-popup>
                        <t-popup content="预计起飞/降落时刻" placement="bottom" show-arrow destroy-on-close>
                            <el-col :span="8">1f/g</el-col>
                        </t-popup>
                        <t-popup content="目的地机场" placement="bottom" show-arrow destroy-on-close>
                            <el-col :span="8">1h</el-col>
                        </t-popup>
                    </el-row>
                </el-col>
            </t-popup>
            <t-popup content="指令区" placement="top" show-arrow destroy-on-close>
                <el-col :span="4" class="command-area" :style="{ backgroundColor: BackgroundColor }">
                    <t-popup content="高度变化" placement="top" show-arrow destroy-on-close>
                        <el-row>2b</el-row>
                    </t-popup>
                    <t-popup content="其他指令" placement="left" show-arrow destroy-on-close>
                        <el-row>2c</el-row>
                    </t-popup>
                    <t-popup content="申请的巡航高度层" placement="bottom" show-arrow destroy-on-close>
                        <el-row>2a</el-row>
                    </t-popup>
                </el-col>
            </t-popup>
            <t-popup content="航路区" placement="top" show-arrow destroy-on-close>
                <el-col :span="8" class="route-area" :style="{ backgroundColor: BackgroundColor }">
                    <el-row>
                        <el-col :span="4">
                            <t-popup content="位置报告点名称" placement="top" show-arrow destroy-on-close>
                                <el-row>3a</el-row>
                            </t-popup>
                            <t-popup content="位置报" placement="bottom" show-arrow destroy-on-close>
                                <el-row>3b</el-row>
                            </t-popup>
                        </el-col>
                        <el-col :span="4">
                            <t-popup content="位置报告点名称" placement="top" show-arrow destroy-on-close>
                                <el-row>3a</el-row>
                            </t-popup>
                            <t-popup content="位置报" placement="bottom" show-arrow destroy-on-close>
                                <el-row>3b</el-row>
                            </t-popup>
                        </el-col>
                        <el-col :span="4">
                            <t-popup content="位置报告点名称" placement="top" show-arrow destroy-on-close>
                                <el-row>3a</el-row>
                            </t-popup>
                            <t-popup content="位置报" placement="bottom" show-arrow destroy-on-close>
                                <el-row>3b</el-row>
                            </t-popup>
                        </el-col>
                        <el-col :span="4">
                            <t-popup content="位置报告点名称" placement="top" show-arrow destroy-on-close>
                                <el-row>3a</el-row>
                            </t-popup>
                            <t-popup content="位置报" placement="bottom" show-arrow destroy-on-close>
                                <el-row>3b</el-row>
                            </t-popup>
                        </el-col>
                        <el-col :span="4">
                            <t-popup content="位置报告点名称" placement="top" show-arrow destroy-on-close>
                                <el-row>3a</el-row>
                            </t-popup>
                            <t-popup content="位置报" placement="bottom" show-arrow destroy-on-close>
                                <el-row>3b</el-row>
                            </t-popup>
                        </el-col>
                        <el-col :span="4">
                            <t-popup content="位置报告点名称" placement="top" show-arrow destroy-on-close>
                                <el-row>3a</el-row>
                            </t-popup>
                            <t-popup content="位置报" placement="bottom" show-arrow destroy-on-close>
                                <el-row>3b</el-row>
                            </t-popup>
                        </el-col>
                    </el-row>
                </el-col>
            </t-popup>
            <t-popup content="协调区" placement="top" show-arrow destroy-on-close>
                <el-col :span="6" class="coordination-area" :style="{ backgroundColor: BackgroundColor }">
                    <el-row>
                        <el-col :span="10">
                            <t-popup content="进程单生成日期和时刻" placement="top" show-arrow destroy-on-close>
                                <el-col>4b</el-col>
                            </t-popup>
                            <t-popup content="其他信息" placement="bottom" show-arrow destroy-on-close>
                                <el-col>4c</el-col>
                            </t-popup>
                        </el-col>
                        <el-col :span="14">
                            <el-row>
                                <t-popup content="航空器收到本场ATIS信息" placement="top" show-arrow destroy-on-close>
                                    <el-col :span="12">M</el-col>
                                </t-popup>
                                <t-popup content="扇区号" placement="top" show-arrow destroy-on-close>
                                    <el-col :span="12">4a</el-col>
                                </t-popup>
                            </el-row>
                            <t-popup content="对过境航班，拍发EST报" placement="right" show-arrow destroy-on-close>
                                <el-row>E</el-row>
                            </t-popup>
                            <t-popup content="与空军协调完毕" placement="right" show-arrow destroy-on-close>
                                <el-row>A</el-row>
                            </t-popup>
                            <t-popup content="航空器被雷达识别" placement="right" show-arrow destroy-on-close>
                                <el-row>I</el-row>
                            </t-popup>
                        </el-col>
                    </el-row>
                </el-col>
            </t-popup>
        </el-row>
    </div>
</template>
<script lang="ts" setup>

const handleSelected = () => {
    console.log('i love u')

}
defineProps({
    BackgroundColor: {
        type: String,
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
    transition-duration: 0.5s;
}

.el-col :hover,
.el-row :hover {
    box-shadow: 1px 1px 10px rgb(30, 0, 255);
}

.wrap {
    height: 110px;
    max-height: 110px;
    width: 490px;
    transition-duration: 1s;
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
</style>