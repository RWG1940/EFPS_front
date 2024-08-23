<template>
  <!-- 新增用户信息 -->
  <userEdit :visible="visible" header="添加用户" @update:visible="handleAddVisibleChange">
    <template #main>
      <el-scrollbar height="520px" style="margin-bottom: 10px;">
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
      <t-form ref="form" :data="store.userAddFormData" :rules="store.USERADD_FORM_RULES" :label-width="0" @submit="store.submitButton">
        
        <t-form-item name="emp.account">
          <t-input-adornment prepend="账号" >
            <t-input v-model="store.userAddFormData.emp.account" clearable />
          </t-input-adornment>
        </t-form-item>
        
        <t-form-item name="emp.password">
          <t-input-adornment prepend="密码">
            <t-input v-model="store.userAddFormData.emp.password" type="password" />
          </t-input-adornment>
        </t-form-item>
        
        <t-form-item name="emp.name">
          <t-input-adornment prepend="姓名">
            <t-input v-model="store.userAddFormData.emp.name" clearable />
          </t-input-adornment>
        </t-form-item>
        
        <t-form-item name="emp.eid">
          <t-input-adornment prepend="身份证号">
            <t-input v-model="store.userAddFormData.emp.eid" clearable/>
          </t-input-adornment>
        </t-form-item>
        
        <t-form-item name="emp.phone">
          <t-input-adornment prepend="手机号">
            <t-input v-model="store.userAddFormData.emp.phone" clearable />
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="role.rid">
          <t-input-adornment prepend="角色">
            <t-select v-model="store.userAddFormData.role.rid" :options="store.options3" placeholder="请选择角色" clearable></t-select>
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="emp.deptid">
          <t-input-adornment prepend="部门">
            <t-select v-model="store.userAddFormData.emp.deptid" :options="store.options1" placeholder="请选择部门" clearable></t-select>
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="emp.isEnabled">
          <t-input-adornment prepend="账号状态">
            <t-select v-model="store.userAddFormData.emp.isEnabled" :options="store.options4" placeholder="请选择状态" clearable></t-select>
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="emp.age">
          <t-input-adornment prepend="年龄">
            <t-input v-model="store.userAddFormData.emp.age" clearable  />
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="emp.gender">
          <t-input-adornment prepend="性别">
            <t-select v-model="store.userAddFormData.emp.gender" :options="store.options2" placeholder="请选择性别" clearable></t-select>
          </t-input-adornment>
        </t-form-item>
        
        <t-form-item>
          <t-button theme="primary" type="submit" @click="addButton" block>提交</t-button>
          <t-button theme="default" @click="cancelButton" block style="margin-left: 10px;">取消</t-button>
        </t-form-item>
        
      </t-form>
    </el-scrollbar>
    </template>
    <template #footer>
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
  // 清空表单数据
  store.userAddFormData = JSON.parse(JSON.stringify(store.NulluserAddFormData));
  emit('update:visible')
}
// 提交用户数据
const addButton = async () => {
  emit('update:visible');
}


</script>
<style scoped></style>