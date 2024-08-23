<template>
    <div class="wrap">
        <el-row :gutter="5">
            <el-col :span="12">
                <el-row>
                    <el-col class="ec1">
                        <p class="p-title">东高空</p>
                        <airspaceInfo/>
                    </el-col>
                    <el-col style="background-color: lightsalmon;height: 80px;">
                        <p class="p-title">西高空</p>
                        <airspaceInfo/>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="background-color: aquamarine;height: 80px;">
                        <p class="p-title">南高空</p>
                        <airspaceInfo/>
                    </el-col>
                    <el-col class="ec2">
                            <p class="p-title">北高空</p>
                            <airspaceInfo/>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                        <el-row>
                            <el-col class="ec1">
                                <p class="p-title">东低空</p>
                                <airspaceInfo/>
                            </el-col>
                            <el-col style="background-color: lightsalmon;height: 80px;">
                                <p class="p-title">西低空</p>
                                <airspaceInfo/>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="background-color: aquamarine;height: 80px;">
                                <p class="p-title">南低空</p>
                                <airspaceInfo/>
                            </el-col>
                            <el-col class="ec2">
                                <p class="p-title">北低空</p>
                                <airspaceInfo/>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
    </div>
</template>
<script lang="ts" setup>
import airspaceInfo from './airspaceInfo.vue'

</script>
<style lang="scss" scoped>
.wrap {
    margin-top: 10px;
}

.p-title {
    margin: 0;
    font-size: small;
    font-weight: bold;
}



.ec1 {
    background-color: lightskyblue;
    height: 80px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.ec2 {
    background-color: lightsteelblue;
    height: 80px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}</style>