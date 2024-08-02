<template>
    <!-- 修改用户信息 -->
  <userEdit :visible="visible" header="用户资料修改" @update:visible="handleEditVisibleChange">
    <template #main>
      <div style="display: flex;">
        <p style="margin-right: 10px;">头像</p>
        <t-upload ref="uploadRef1" v-model="file1" :image-viewer-props="imageViewerProps" :size-limit="sizeLimit"
          :action=avatarUrl theme="image"
          tips="上传头像大小不超过500KB" accept="image/*" :disabled="disabled" :auto-upload="autoUpload"
          :show-image-file-name="showImageFileName" :upload-all-files-in-one-request="uploadAllFilesInOneRequest" :locale="{
            triggerUploadText: {
              image: '请选择图片',
            },
          }" @fail="handleFail">
        </t-upload>
      </div>
      <t-input-adornment prepend="姓名">
        <t-input v-model="userData.eName" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="账号">
        <t-input v-model="userData.eUsername" disabled showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="密码">
        <t-input v-model="userData.ePassword" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="证件号">
        <t-input v-model="userData.eId" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="手机号">
        <t-input v-model="userData.ePhone" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="年龄">
        <t-input v-model="userData.eAge" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="部门">
        <t-input v-model="userData.eDeptid" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="职位">
        <t-input v-model="userData.eRole" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="性别">
        <t-input v-model="userData.eGender" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      <t-input-adornment prepend="状态">
        <t-input v-model="userData.eIsenabled" showClearIconOnEmpty placeholder="请输入内容" />
      </t-input-adornment>
      
    </template>
    <template #footer>
      <t-button theme="default" @click="cancelButton">取消</t-button>
      <t-button @click="saveButton">保存</t-button>
    </template>
  </userEdit>
</template>
<script lang="ts" setup>
import { ref,watch } from "vue";
import type { UploadProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { updateUser } from "@/api/user-api";
import userEdit from './userEdit.vue'

const autoUpload = ref(true);
const showImageFileName = ref(true);
const disabled = ref(false);
const uploadAllFilesInOneRequest = ref(false);
const file1 = ref<UploadProps['value']>([]);
const avatarUrl = ref()

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
const props = defineProps<{
  visible: boolean;
  userData: UserData;
}>();
const userData = ref<UserData>({ ...props.userData });

// 监听 props.userData 的变化，并更新到本地的 userData
watch(() => props.userData, (newUserData) => {
  userData.value = { ...newUserData };
}, { immediate: true });

const emit = defineEmits(['update:visible', 'userEdited']);

// 头像上传失败回调
const handleFail: UploadProps['onFail'] = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const imageViewerProps = ref<UploadProps['imageViewerProps']>({
  closeOnEscKeydown: false,
});
// 头像大小限制
const sizeLimit = ref<UploadProps['sizeLimit']>({
  size: 500,
  unit: 'KB',
});
const handleEditVisibleChange = () => {
    emit('update:visible', false);
}
// 保存按钮回调
const saveButton = async () => {
  try {
    await updateUser(userData.value);
    MessagePlugin.success('用户信息更新成功');
    emit('userEdited'); 
    emit('update:visible', false);
    
  } catch (error) {
    MessagePlugin.error('更新用户信息失败');
  }
}
// 取消按钮回调
const cancelButton = () => {
    emit('update:visible', false);
}

</script>
<style scoped>
    
</style>