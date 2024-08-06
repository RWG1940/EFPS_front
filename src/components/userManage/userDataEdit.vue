<template>
  <!-- 修改用户信息 -->
  <userEdit :visible="visible" header="用户资料修改" @update:visible="handleEditVisibleChange">
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
          }" @success="store.handleSuccess" @fail="store.handleFail">
        </t-upload>
      </div>
      <t-input-adornment prepend="姓名">
        <t-input v-model="store.userData.eName" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="账号">
        <t-input v-model="store.userData.eUsername" disabled showClearIconOnEmpty placeholder="请输入内容" />
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
        <t-select v-model="store.userData.eDeptid" :options="store.options1" placeholder="请选择部门" clearable></t-select>
      </t-input-adornment>
      <t-input-adornment prepend="职位">
        <t-input v-model="store.userData.eRole" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="性别">
        <t-select v-model="store.userData.eGender" :options="store.options2" placeholder="请选择性别" clearable></t-select>
      </t-input-adornment>
      <t-input-adornment prepend="状态">
        <t-input v-model="store.userData.eIsenabled" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>

    </template>
    <template #footer>
      <t-button theme="default" @click="cancelButton">取消</t-button>
      <t-button @click="saveButton">保存</t-button>
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
const emit = defineEmits(['update:visible']);

const handleEditVisibleChange = () => {
  emit('update:visible', false);
}
const saveButton = () => {
  store.saveButton()
  emit('update:visible', false);
}

// 取消按钮回调
const cancelButton = () => {
  emit('update:visible', false);
}

</script>
<style scoped></style>

