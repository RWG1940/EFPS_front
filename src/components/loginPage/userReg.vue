<template>
    <div class="reg">
    <t-space direction="vertical">
      <t-input-adornment prepend="账号">
        <t-input v-model="userData.eUsername" showClearIconOnEmpty placeholder="必填" />
      </t-input-adornment>
      <t-input-adornment prepend="密码">
        <t-input v-model="userData.ePassword" showClearIconOnEmpty placeholder="必填" />
      </t-input-adornment>
      <t-input-adornment prepend="证件号">
        <t-input v-model="userData.eId" showClearIconOnEmpty placeholder="必填" />
      </t-input-adornment>
      <t-input-adornment prepend="手机号">
        <t-input v-model="userData.ePhone" showClearIconOnEmpty placeholder="必填" />
      </t-input-adornment>
      <t-button @click="submitButton" style="margin-bottom: 20px;width: 100%;">提交</t-button>
    </t-space>
</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { MessagePlugin } from 'tdesign-vue-next';
import { regUser } from "@/api/reg-api";
import {useRouter} from 'vue-router'

const router = useRouter()
const userData = ref<UserData>({});

interface UserData {
  id?: number;
  eAvatarpath?: string;
  eName?: string;
  eUsername?: string;
  ePassword?: string;
  eId?: string;
  ePhone?: string;
  eAge?: number;
  eDeptid?: string;
  eRole?: string;
  eGender?: string;
  eCreatetime?: string;
  eUpdatetime?: string;
  eIsenabled?: boolean;
}

// 提交用户数据
const submitButton = async () => {
    const msg = MessagePlugin.loading('注册中')
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    const response = await regUser(userData.value);
    if (response.code === 1) {
    MessagePlugin.close(msg)
    MessagePlugin.success('注册成功');
    localStorage.setItem('token', response.data);
    router.push('/home')
    }else {
      MessagePlugin.error(response.msg || '登录失败');
    }
  } catch (error) {
    MessagePlugin.error('注册失败');
  }
}
</script>
<style scoped>
.reg {
    padding: 50px;
    width: 200px;
    height: 200px;
}   
</style>
