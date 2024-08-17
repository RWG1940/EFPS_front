<template>
    <div class="header">
            <t-head-menu theme="dark" height="120px">
                <template #logo>
                    <t-icon name="user" color="yellow"></t-icon>
                    <p style="color: white;margin-left: 2px;">用户：<span style="color: blue;
                color: white;">RWG</span></p>
                <t-icon name="assignment-user" color="lightgreen"></t-icon> 
                    <p style="color: white;margin-left: 2px;">角色：<span style="color: blue;
                color: white;">区域管制席</span></p>
                </template>
                <t-icon name="time" color="white" style="margin-left: 400px;"></t-icon>
                <p style="color: white;">北京时间&ensp;
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
</template>
<script lang="ts" setup>

</script>
<style lang="scss">
    
</style>