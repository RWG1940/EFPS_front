<template>
    <div class="reg">
    <t-form ref="form" :data="store.regFormData" :rules="store.REG_FORM_RULES" :label-width="0" @submit="store.regOnSubmit">
            <t-form-item name="account">
                <t-input v-model="store.regFormData.account" clearable placeholder="账号">
                    <template #prefix-icon>
                        <user-icon />
                    </template>
                </t-input>
            </t-form-item>
            <t-form-item name="password">
                <t-input v-model="store.regFormData.password" type="password" clearable placeholder="密码">
                    <template #prefix-icon>
                        <lock-on-icon />
                    </template>
                </t-input>
            </t-form-item>
            <t-form-item name="eid">
                <t-input v-model="store.regFormData.eid" clearable placeholder="身份证号">
                    <template #prefix-icon>
                        <verify-icon />
                    </template>
                </t-input>
            </t-form-item>
            <t-form-item name="phone">
                <t-input v-model="store.regFormData.phone" clearable placeholder="手机号">
                    <template #prefix-icon>
                        <call-icon />
                    </template>
                </t-input>
            </t-form-item>
            <t-form-item>
                <t-button theme="primary" type="submit" block>注册</t-button>
            </t-form-item>
        </t-form>
</div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user-store'

const store = useUserStore()

</script>
<style scoped>
.reg {
    padding: 50px;
    width: 200px;
    height: 200px;
    margin-bottom: 30px;
}   
</style>
