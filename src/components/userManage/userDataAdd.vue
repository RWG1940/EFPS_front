<template>
    <!-- 新增用户信息 -->
  <userEdit :visible="visible" header="添加用户" @update:visible="handleAddVisibleChange">
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
        <t-input v-model="userData.eUsername" showClearIconOnEmpty placeholder="请输入内容" />
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
    </template>
    <template #footer>
      <t-button theme="default" @click="cancelButton">取消</t-button>
      <t-button @click="submitButton">提交</t-button>
    </template>
  </userEdit>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import userEdit from './userEdit.vue'
import type { UploadProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { addUser } from "@/api/user-api";


const autoUpload = ref(true);
const showImageFileName = ref(true);
const disabled = ref(false);
const uploadAllFilesInOneRequest = ref(false);
const file1 = ref<UploadProps['value']>([]);
const userData = ref<UserData>({});
const avatarUrl = ref()
const props = defineProps<{
  visible:boolean;
}>();
//  通知父组件(table) 事件
const emit = defineEmits(['update:visible', 'userAdded']);

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
// visible更新后通知父组件 通知面板原本就能控制visible值
const handleAddVisibleChange = () => {
  emit('update:visible');
};
const cancelButton = () => {
  emit('update:visible')
}
// 提交用户数据
const submitButton = async () => {
  try {
    await addUser(userData.value);
    MessagePlugin.success('添加用户成功');
    // 重新加载用户数据,通知userTable
    emit('userAdded');
    emit('update:visible');
  } catch (error) {
    MessagePlugin.error('添加用户失败');
  }
}
</script>
<style scoped>
    
</style>