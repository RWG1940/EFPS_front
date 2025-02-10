<template>
    <div class="msgTool">
    <el-row >
        <el-col :span="12">
            <div class="right-msg" >
                <t-icon name="chat-message"></t-icon> 重要通知
                <importantMsg/>
            </div>
      </el-col>
        <el-col :span="12" >
            <div class="right-msg" >
                <t-icon name="setting"></t-icon> 系统消息 
                <sysMsg/>
            </div>
        </el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-col :span="12">
            <div class="left-msg">
                <t-icon name="error-triangle"></t-icon> 警报
                <alertMsg/>
            </div>
      </el-col>
        <el-col :span="12" >
            <div class="right-msg" >
                <t-icon name="cooperate"></t-icon> 协调信息
                <cooperaMsg/>
            </div>
        </el-col>
    </el-row>
</div>
</template>
<script lang="ts" setup>
import importantMsg from '../areaControlPage/msgTool/importantMsg.vue';
import sysMsg from '../areaControlPage/msgTool/sysMsg.vue';
import alertMsg from './msgTool/alertMsg.vue';
import cooperaMsg from './msgTool/cooperaMsg.vue';




</script>
<style lang="scss" scoped>
.msgTool {
    margin-bottom: 40px;
}
.left-msg {
    margin-left: 10px;
    width: 480px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    border-radius: 15px;
    padding: 8px;
    transition-duration: 0.5s;
}
.left-msg:hover,.right-msg:hover {
    transition-duration: 0.5s;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
}
.right-msg {
    width: 480px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    border-radius: 15px;
    padding: 8px;
    margin-left: 10px;
    transition-duration: 0.5s;
}
    
</style>