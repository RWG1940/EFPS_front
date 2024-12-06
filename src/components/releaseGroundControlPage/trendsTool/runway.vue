<template>
    <div class="wrap">
        <el-row class="runway1">
            <el-col>
                <p style="color: rgb(255, 255, 255);margin: 0;font-size: xx-small;">跑道1</p>
                <el-row>
                    <el-col :span="2" class="plane1">
                    </el-col>
                    <el-col :span="5">
                        <p style="font-size: small;margin: 0;background-color: red;margin-left: 5px;color:white;">起飞中,该跑道被占用
                        </p>
                    </el-col>
                    <el-col :span="10" style="background-color: antiquewhite;">
                        <el-row>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                        </el-row> 
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="runway2">
            <el-col>
                <p style="color: rgb(255, 255, 255);margin: 0;font-size: xx-small;">跑道2</p>
                <el-row>
                    <el-col :span="2" class="plane1">
                    </el-col>
                    <el-col :span="5">
                        <p style="font-size: small;margin: 0;background-color: red;margin-left: 5px;color:white;">降落中,该跑道被占用
                        </p>
                    </el-col>
                    <el-col :span="10" style="background-color: antiquewhite;">
                        <el-row>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                        </el-row> 
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="runway3">
            <el-col>
                <p style="color: rgb(255, 255, 255);margin: 0;font-size: xx-small;">跑道3</p>
                <el-row>
                    <el-col :span="2" class="plane1">
                    </el-col>
                    <el-col :span="5">
                        <p style="font-size: small;margin: 0;background-color: red;margin-left: 5px;color:white;">降落中,该跑道被占用
                        </p>
                    </el-col>
                    <el-col :span="10" style="background-color: antiquewhite;">
                        <el-row>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                            <el-col :span="6"><p style="font-size: small;margin: 0;">12</p></el-col>
                        </el-row> 
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.runway1 {
    margin-top: 10px;
    height: 50px;
    background: url("../../../assets/img/areaControlPage/runway.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 5px;
}

.runway2 {
    margin-top: 10px;
    height: 50px;
    background: url("../../../assets/img/areaControlPage/runway.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 5px;
}
.runway3 {
    margin-top: 10px;
    height: 50px;
    background: url("../../../assets/img/areaControlPage/runway.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 5px;
}

.plane1 {
    height: 20px;
    background: url("../../../assets/img/areaControlPage/plane.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 5px;
}
</style>