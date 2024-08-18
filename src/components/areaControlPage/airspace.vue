<template>
    <div class="wrap">
        <el-row :gutter="5">
            <el-col :span="12">
                <el-row>
                    <el-col style="background-color: lightskyblue;height: 28px;"><p>东高空</p></el-col>
                    <el-col style="background-color: lightsalmon;height: 27px;"><p>西高空</p></el-col>
                </el-row>
                <el-row>
                    <el-col style="background-color: aquamarine;height: 28px;"><p>南高空</p></el-col>
                    <el-col style="background-color: lightsteelblue;height: 28px;"><p>北高空</p></el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col style="background-color: lightskyblue;height: 28px;"><p>东低空</p></el-col>
                    <el-col style="background-color: lightsalmon;height: 28px;"><p>西低空</p></el-col>
                </el-row>
                <el-row>
                    <el-col style="background-color: aquamarine;height: 28px;"><p>南低空</p></el-col>
                    <el-col style="background-color: lightsteelblue;height: 28px;"><p>北低空</p></el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.wrap {
    margin-top: 10px;
}
p {
    margin: 0;
}
</style>