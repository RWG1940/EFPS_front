<template>
    <div class="tool">
        <div class="msg">
            消息组件
        </div>
        <div class="weather">
            天气组件
        </div>
    </div>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.tool {
    display: flex;
    margin-top: 10px;
}

.msg {
    height: 150px;
    width: 480px;
    background-color: white;
    border-radius: 15px;
    padding: 5px;
}

.weather {
    height: 150px;
    width: 480px;
    background-color: white;
    border-radius: 15px;
    margin-left: 10px;
    padding: 5px;
}
    
</style>