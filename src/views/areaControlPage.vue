<template>
    <div class="wrap">
        <div class="header">
            <t-head-menu theme="dark" height="120px">
                <template #logo>
                    <p style="color: white;">用户：<span style="color: blue;
                color: white;">RWG</span></p>
                    <p style="color: white;">角色：<span style="color: blue;
                color: white;">区域管制席</span></p>
                </template>
                <p style="margin-left: 450px;color: white;">北京时间&ensp;
                    <span style="font-weight: bold;color: white;">13:14:52</span>
                </p>

                <template #operations>
                    <p
                        style="margin-right: 10px; color: rgb(255, 255, 255);padding: 5px;border-radius: 3px; font-weight: bolder;font-style: italic;">
                        EFPS-SYSTEM</p>
                    <t-button theme="danger" shape="square" style="margin-right: 20px;">
                        <template #icon><t-icon name="logout" color="white" /></template>
                    </t-button>
                </template>
            </t-head-menu>
        </div>

        <div class="content">
            <div class="left">
                <el-scrollbar height="600px">
                    <p style="margin-top: 0;text-decoration: underline blue 10px;font-weight: bold;">进港</p>
                    <div class="arrival-fps-container">
                        <div class="arrival-prepare-container">
                            准备中的进程单
                        </div>
                        <div class="arrival-handled-container">
                            已移交的进程单
                        </div>
                    </div>
                    <p style="margin-top: 10px;text-decoration: underline blue 10px;font-weight: bold;">出港</p>
                    <div class="departure-fps-container">
                        <div class="departure-prepare-container">
                            准备中的进程单
                        </div>
                        <div class="departure-handled-container">
                            已移交的进程单
                        </div>
                    </div>
                    <p style="margin-top: 10px;text-decoration: underline blue 10px;font-weight: bold;">信息</p>
                    <div class="tool">
                        <div class="msg">
                            消息组件
                        </div>
                        <div class="weather">
                            天气组件
                        </div>
                    </div>
                </el-scrollbar>
            </div>
            <div class="right">
                <div class="control-center">
                    <p style="margin-top: 0px;margin-bottom: 2px;font-weight: bold;">控制中心</p>
                <el-scrollbar height="300px">
                    <div class="processing">
                        正在管制
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
        </div>
        <div class="footer">
                <p><t-button shape="circle" theme="success" size="small">1</t-button>&ensp;就绪</p>
                <p><t-button shape="circle" theme="warning" size="small">1</t-button>&ensp;已移交</p>
                <p><t-button shape="circle" theme="primary" size="small">1</t-button>&ensp;管制中</p>
                <p><t-button shape="circle" theme="danger" size="small">1</t-button>&ensp;告警</p>
        </div>
    </div>
</template>
<script lang="ts" setup>

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



.right {
    display: flex;
    flex-direction: column;
}

.arrival-fps-container {
    display: flex;
}

.arrival-prepare-container {
    height: 250px;
    width: 500px;
    background-color: white;
    border-radius: 15px;
    padding: 5px;


}

.arrival-handled-container {
    height: 250px;
    width: 500px;
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
    width: 500px;
    background-color: white;
    border-radius: 15px;
    padding: 5px;
}

.departure-handled-container {
    height: 250px;
    width: 500px;
    background-color: white;
    border-radius: 15px;
    margin-left: 10px;
    padding: 5px;

}

.tool {
    display: flex;
    margin-top: 10px;
}

.msg {
    height: 150px;
    width: 500px;
    background-color: white;
    border-radius: 15px;
    padding: 5px;
}

.weather {
    height: 150px;
    width: 500px;
    background-color: white;
    border-radius: 15px;
    margin-left: 10px;
    padding: 5px;
}

.control-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 590px;
    width: 460px;
    background-color: white;
    border-radius: 15px;
    margin-left: 10px;
    padding: 5px;
}
.processing {
    height: 150px;
    width: 450px;
    background-color: rgba(223, 223, 223, 0.683);
    border-radius: 10px;
    padding: 5px;
}
.runway-overview {
    height: 150px;
    width: 450px;
    background-color: rgba(223, 223, 223, 0.683);
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
}
.area-overview {
    height: 150px;
    width: 450px;
    background-color: rgba(223, 223, 223, 0.683);
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
}
.stop-overview {
    height: 150px;
    width: 450px;
    background-color: rgba(223, 223, 223, 0.683);
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
}
.operations {
    height: 450px;
    width: 450px;
    background-color: rgba(223, 223, 223, 0.683);
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
}
.footer {
    background-color: white;
    border-radius: 15px;
    display: flex;
    height: 25px;
    font-size: smaller;
    align-items: center;
}
.footer p {
    margin-left: 20px;
    
}

;</style>