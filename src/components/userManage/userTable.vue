<template>
  <el-table :data="tableData" style="width: 170vh">
    <el-table-column type="selection" width="55" />
    <el-table-column fixed prop="eAvatarpath" label="头像" width="80" />
    <el-table-column fixed prop="id" label="ID" width="80" />
    <el-table-column fixed prop="eName" label="姓名" width="80" />
    <el-table-column prop="eUsername" label="账号" width="120" />
    <el-table-column prop="ePassword" label="密码" width="120" />
    <el-table-column prop="eId" label="证件号" width="120" />
    <el-table-column prop="ePhone" label="手机号" width="120" />
    <el-table-column prop="eAge" label="年龄" width="120" />
    <el-table-column prop="eDeptid" label="部门" width="120" />
    <el-table-column prop="eRole" label="职位" width="120" />
    <el-table-column prop="eGender" label="性别" width="120" />
    <el-table-column prop="eCreatetime" label="入职日期" width="120" />
    <el-table-column prop="eUpdatetime" label="更新日期" width="120" />
    <el-table-column prop="eIsenabled" label="帐号状态" width="120" />
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{ row }">
        <div style="display: flex;">
          <userEdit />
          <t-button theme="default" shape="round" @click="handleEditClick(row)">修改</t-button>
          <t-button theme="danger" shape="round" @click="handleDeleteClick(row.id)">删除</t-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <!-- 修改用户信息 -->
  <userEdit v-model:visible="editVisible" header="用户资料修改">
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
  <!-- 新增用户信息 -->
  <userEdit :visible="addVisible" header="添加用户" @update:visible="handleAddVisibleChange">
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
      <t-button theme="default" @click="cancelButton1">取消</t-button>
      <t-button @click="submitButton">提交</t-button>
    </template>
  </userEdit>

  <pagination class="pag" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import pagination from "../userManage/pagination.vue";
import { fetchUserData, updateUser, deleteUser,addUser } from "@/api/user-api";
import {BASE_URL} from "@/api/user-api";
import userEdit from '@/components/userManage/userEdit.vue'
import type { UploadProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

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
  addVisible:boolean;
}>();
const emit = defineEmits(['update:addVisible']);
const avatarUrl = ref()
const userData = ref<UserData>({});
const autoUpload = ref(true);
const showImageFileName = ref(true);
const disabled = ref(false);
const uploadAllFilesInOneRequest = ref(false);
const file1 = ref<UploadProps['value']>([]);
const tableData =  ref<UserData[]>([]);
const editVisible = ref(false);
const url = BASE_URL

const handleAddVisibleChange = () => {
  emit('update:addVisible');
};
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
// 修改按钮回调
const handleEditClick = (row: any) => {
  console.log('edit', row);
  userData.value = { ...row };
  editVisible.value = true;
  // 动态设置上传文件的URL
  avatarUrl.value = `${url}/avatar/${userData.value.eAvatarpath}`;
};
const cancelButton = () => {
  editVisible.value = false;
}
const cancelButton1 = () => {
  emit('update:addVisible')
}
// 保存按钮回调
const saveButton = async () => {
  try {
    await updateUser(userData.value);
    MessagePlugin.success('用户信息更新成功');
    editVisible.value = false;
    // 重新加载用户数据
    loadUserData();
  } catch (error) {
    MessagePlugin.error('更新用户信息失败');
  }
}
// 提交用户数据
const submitButton = async () => {
  try {
    await addUser(userData.value);
    MessagePlugin.success('添加用户成功');
    // 重新加载用户数据
    loadUserData();
  } catch (error) {
    MessagePlugin.error('添加用户失败');
  }
}
// 删除按钮回调
const handleDeleteClick = async (id: number) => {
  try {
    await deleteUser(id);
    MessagePlugin.success('用户删除成功');
    // 重新加载用户数据
    loadUserData();
  } catch (error) {
    MessagePlugin.error('删除用户失败');
  }
};
// 获取用户列表
const loadUserData = async () => {
  try {
    const response = await fetchUserData();
    console.log('Fetched user data:', response);
    if (response && response.data && Array.isArray(response.data)) {
      tableData.value = response.data;
    } else {
      console.error('Unexpected data format:', response);
    }
  } catch (error) {
    console.error('Failed to load user data:', error);
  }
};
// 组件挂载后加载
onMounted(() => {
  loadUserData();
});
</script>

<style scoped>
.pag {
  margin-top: 20px;
}
</style>
