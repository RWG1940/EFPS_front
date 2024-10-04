<template>
    <div class="asw" v-for="item in 8">
        <el-row class="row">
            <div class="aswi">
                <el-scrollbar>
                    <t-row>空域：</t-row>
                    <t-row>经纬度：</t-row>
                    <hr>
                    <t-row>风力等级：</t-row>
                    <t-row>风向描述：</t-row>
                    <hr>
                    <t-row>1小时累计降水量(mm)：</t-row>
                    <t-row>相对湿度：</t-row>
                    <hr>
                    <t-row>云量(%)：</t-row>
                    <t-row>云层高度：</t-row>
                    <t-row>能见度(m)：</t-row>
                    <t-row>pm2.5浓度(μg/m3)：</t-row>
                    <hr>
                    <t-row>温度：</t-row>
                    <t-row>最高温度：</t-row>
                    <t-row>最低温度：</t-row>
                    <hr>
                </el-scrollbar>
            </div>
            <div class="aswii">
                <t-row>气象预警数据</t-row>
          
            </div>
        </el-row>
    </div>
</template>
    
<script setup lang='ts'>

</script>
    
<style scoped>
.asw {
    padding: 10px;
    
}

.aswi {
    padding: 10px;
    width: 240px;
    height: 200px;
    background-color: aliceblue;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.aswii {
    padding: 10px;
    width: 310px;
    height: 200px;
    background-color: rgb(248, 246, 231);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
.row {
    transition-duration: 0.5s;
    border-radius: 10px;
}
.row:hover {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    transition-duration: 0.5s;
    transform: scale(1.02);
}

</style>