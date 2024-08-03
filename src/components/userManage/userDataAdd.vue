<template>
  <!-- 新增用户信息 -->
  <userEdit :visible="visible" header="添加用户" @update:visible="handleAddVisibleChange">
    <template #main>
      <div style="display: flex;">
        <p style="margin-right: 10px;">头像</p>
        <t-upload ref="uploadRef1" v-model="store.file1" :image-viewer-props="store.imageViewerProps"
          :size-limit="store.sizeLimit" :action=store.avatarUrl theme="image" tips="上传头像大小不超过500KB" accept="image/*"
          :disabled="store.disabled" :auto-upload="store.autoUpload" :show-image-file-name="store.showImageFileName"
          :upload-all-files-in-one-request="store.uploadAllFilesInOneRequest" :locale="{
            triggerUploadText: {
              image: '请选择图片',
            },
          }" @fail="store.handleFail">
        </t-upload>
      </div>
      <t-input-adornment prepend="姓名">
        <t-input v-model="store.userData.eName" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="账号">
        <t-input v-model="store.userData.eUsername" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="密码">
        <t-input v-model="store.userData.ePassword" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="证件号">
        <t-input v-model="store.userData.eId" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="手机号">
        <t-input v-model="store.userData.ePhone" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="年龄">
        <t-input v-model="store.userData.eAge" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="部门">
        <t-input v-model="store.userData.eDeptid" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="职位">
        <t-input v-model="store.userData.eRole" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="性别">
        <t-input v-model="store.userData.eGender" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
    </template>
    <template #footer>
      <t-button theme="default" @click="cancelButton">取消</t-button>
      <t-button @click="submitButton">提交</t-button>
    </template>
  </userEdit>
</template>
<script lang="ts" setup>
import userEdit from './userEdit.vue'
import { useUserStore } from "@/stores/user-store";

const store = useUserStore()
const props = defineProps<{
  visible: boolean;
}>();
//  通知父组件(table) 事件
const emit = defineEmits(['update:visible', 'userAdded']);

// visible更新后通知父组件 通知面板原本就能控制visible值
const handleAddVisibleChange = () => {
  emit('update:visible');
};
const cancelButton = () => {
  emit('update:visible')
}
// 提交用户数据
const submitButton = async () => {
  store.submitButton()
  emit('update:visible');
}


</script>
<style scoped></style>