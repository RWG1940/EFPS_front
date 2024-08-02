<template>
    <div class="login">

        <t-form ref="form" :data="formData" :rules="FORM_RULES" :label-width="0" @submit="onSubmit">
            <t-form-item name="account">
                <t-input v-model="formData.account" clearable placeholder="账号/手机号">
                    <template #prefix-icon>
                        <user-icon />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item name="password">
                <t-input v-model="formData.password" type="password" clearable placeholder="密码">
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

import { reactive, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { FormProps } from 'tdesign-vue-next';
import { LockOnIcon } from 'tdesign-icons-vue-next';
import { userLogin, userLoginBytoken } from '@/api/login-api';
import { useRouter } from 'vue-router'

const router = useRouter()
const FORM_RULES = { account: [{ required: true, message: '账户必填' }], password: [{ required: true, message: '密码必填' }] };
const formData: FormProps['data'] = reactive({
    account: '',
    password: '',
});

const onSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    const msg = MessagePlugin.loading('登陆中')
    await new Promise(resolve => setTimeout(resolve, 200));
    if (validateResult === true) {
        try {
            const user = { eUsername: formData.account, ePassword: formData.password };
            const response = await userLogin(user);
            MessagePlugin.close(msg)
            if (response.code === 1) {
                localStorage.setItem('token', response.data);
                MessagePlugin.success('登录成功');
                router.push('/home');
            } else {
                MessagePlugin.error(response.msg || '登录失败');
            }
        } catch (error) {
            console.error('登录失败:', error);
            MessagePlugin.error('登录失败，请检查账号和密码');
        }
    } else {
        console.log('Validate Errors: ', firstError, validateResult);
        if (firstError) {
            MessagePlugin.warning(firstError);
        } else {
            MessagePlugin.warning('验证失败');
        }
    }
};
// 自动登录处理
onMounted(async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const msg = MessagePlugin.loading('自动登陆中')
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await userLoginBytoken(token);
            if (response.code === 1) {
                MessagePlugin.close(msg)
                MessagePlugin.success('登录成功');
                router.push('/home');
            } else {
                MessagePlugin.error(response.msg || '登录失败');
            }
        } catch (error) {
            console.error('登录失败:', error);
            MessagePlugin.error('登录失败，请检查账号和密码');
        }
    }
});
</script>
<style scoped>
.login {
    padding: 50px;
    width: 200px;
    height: 200px;
}
</style>