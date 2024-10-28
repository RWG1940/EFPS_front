<template>
  <!-- 修改个人信息 -->
  <userEdit :visible="visible" header="个人资料修改" @update:visible="handleEditVisibleChange">
    <template #main>
      <div style="display: flex;">
        <p style="margin-right: 10px;">头像</p>
        <t-upload ref="store.uploadRef" v-model="store.file1" :image-viewer-props="store.imageViewerProps"
          :size-limit="store.sizeLimit" :action="store.avatarUrl" theme="image" tips="上传头像大小不超过5500KB" accept="image/*"
          :disabled="store.disabled" :auto-upload="store.autoUpload" :show-image-file-name="store.showImageFileName"
          :upload-all-files-in-one-request="store.uploadAllFilesInOneRequest" :locale="{
            triggerUploadText: {
              image: '请选择图片',
            },
          }" @success="store.myInfoEditHandleSuccess" @fail="store.handleFail">
        </t-upload>
      </div>
      <t-form ref="form" :data="store.myDataFormData" :rules="store.MYDATA_FORM_RULES" :label-width="0"
        @submit="addBtn">

        <t-form-item name="emp.eUsername">
          <t-input-adornment prepend="账号">
            <t-input v-model="store.myDataFormData.emp.eUsername" disabled clearable />
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="emp.ePassword">
          <t-input-adornment prepend="密码">
            <t-input v-model="store.myDataFormData.emp.ePassword" type="password" clearable />
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="emp.eName">
          <t-input-adornment prepend="姓名">
            <t-input v-model="store.myDataFormData.emp.eName" clearable />
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="emp.eId">
          <t-input-adornment prepend="身份证号">
            <t-input v-model="store.myDataFormData.emp.eId" clearable />
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="emp.ePhone">
          <t-input-adornment prepend="手机号">
            <t-input v-model="store.myDataFormData.emp.ePhone" clearable />
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="emp.eAge">
          <t-input-adornment prepend="年龄">
            <t-input v-model="store.myDataFormData.emp.eAge" clearable />
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="emp.eGender">
          <t-input-adornment prepend="性别">
            <t-select v-model="store.myDataFormData.emp.eGender" :options="store.options2" clearable></t-select>
          </t-input-adornment>
        </t-form-item>
      </t-form>
    </template>
    <template #footer>
      <t-button theme="primary" @click="submitBtn" block>提交</t-button>
      <t-button theme="default" @click="cancelButton" block style="margin-left: 10px;">取消</t-button>
    </template>
  </userEdit>
</template>
<script lang="ts" setup>
import  userEdit  from '@/components/userManage/userEdit.vue';
import { useUserStore } from "@/stores/user-store";
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

const store = useUserStore()
const form = ref<FormInstanceFunctions>();
const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleEditVisibleChange = () => {
  emit('update:visible');
};
const cancelButton: FormProps['onReset'] = () => {
  store.avatarPath = null
  store.file1 = store.Nullfile1;
  emit('update:visible')
}

const submitBtn = async () => {
  form.value?.submit();
}

const addBtn: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
  if (validateResult === true) {
    await store.handleUpdateMe().then(() => {
      emit('update:visible')
    })
  } else {
    if (firstError) {
      MessagePlugin.warning(firstError);
    } else {
      MessagePlugin.warning('验证失败');
    }
  }
};
</script>
<style scoped></style>
  
  