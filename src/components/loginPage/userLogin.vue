<template>
    <div class="login">

        <t-form ref="form" :data="store.loginFormData" :rules="store.LOGIN_FORM_RULES" :label-width="0" @submit="store.loginOnSubmit">
            <t-form-item name="account">
                <t-input v-model="store.loginFormData.account" clearable placeholder="账号/手机号">
                    <template #prefix-icon>
                        <user-icon />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item name="password">
                <t-input v-model="store.loginFormData.password" type="password" clearable placeholder="密码">
                    <template #prefix-icon>
                        <lock-on-icon />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item>
                <t-button theme="primary" type="submit" block>登录</t-button>
            </t-form-item>
        </t-form>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user-store'
import { onMounted } from 'vue';
import { LockOnIcon } from 'tdesign-icons-vue-next';

const store = useUserStore()

// 自动登录处理
onMounted(()=>{
    if (localStorage.getItem('token') != null){
    store.autoLogin()
    }
});
</script>
<style scoped>
.login {
    padding: 40px;
    width: 200px;
    height: 220px;
}
</style>