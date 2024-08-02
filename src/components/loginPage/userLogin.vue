<template>
    <div class="login">
        <t-space direction="vertical">
        <t-input placeholder="账号/手机号/证件号">
            <template #prefix-icon>
                <user-icon />
            </template></t-input>
        <t-input type="password" default-value="" placeholder="密码">
            <template #prefix-icon>
                <lock-on-icon />
            </template>
        </t-input>
        <div class="operations">
            <t-button>登录</t-button>
        </div>
    </t-space>
    </div>
</template>
<script setup>

</script>
<style scoped>
.login {
    padding: 50px;
    width: 200px;
    height: 200px;
}

</style>