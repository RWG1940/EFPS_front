<template>
  <!-- 修改部门信息 -->
  <userEdit :visible="visible" header="部门资料修改" @update:visible="handleEditVisibleChange">
    <template #main>
      <div style="display: flex;">
        <p style="margin-right: 10px;">部门图片</p>
        <t-upload ref="store.uploadRef" v-model="store.file1" :image-viewer-props="store.imageViewerProps" :size-limit="store.sizeLimit"
          :action="store.avatarUrl" theme="image" tips="上传头像大小不超过5500KB" accept="image/*" :disabled="store.disabled"
          :auto-upload="store.autoUpload" :show-image-file-name="store.showImageFileName"
          :upload-all-files-in-one-request="store.uploadAllFilesInOneRequest" :locale="{
            triggerUploadText: {
              image: '请选择图片',
            },
          }" @success="store.handleSuccess" @fail="store.handleFail">
        </t-upload>
      </div>
      <t-input-adornment prepend="部门名">
        <t-input v-model="store.deptData.dName" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="部门编号">
        <t-input v-model="store.deptData.dId" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>

    </template>
    <template #footer>
      <t-button theme="default" @click="cancelButton">取消</t-button>
      <t-button @click="saveButton">保存</t-button>
    </template>
  </userEdit>
</template>
<script lang="ts" setup>
import userEdit from '@/components/userManage/userEdit.vue'
import { useDeptStore } from "@/stores/dept-store";

const store = useDeptStore()

const props = defineProps<{
  visible:boolean;
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

