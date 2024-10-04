<template>
    <div class="footer">
        <p><t-button shape="circle" theme="success" size="small">1</t-button>&ensp;就绪</p>
        <p><t-button shape="circle" theme="warning" size="small">1</t-button>&ensp;已移交</p>
        <p><t-button shape="circle" theme="primary" size="small">1</t-button>&ensp;管制中</p>
        <p><t-button shape="circle" theme="danger" size="small">1</t-button>&ensp;告警</p>
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.footer {
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    height: 27px;
    font-size: smaller;
    align-items: center;
    backdrop-filter: blur(15px);
}
.footer p {
    margin-left: 20px;
}    
</style>