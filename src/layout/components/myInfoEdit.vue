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
      <t-form ref="form" :data="store.myDataFormData" :rules="store.MYDATA_FORM_RULES" :label-width="0" @submit="saveButton">
        
        <t-form-item name="account">
          <t-input-adornment prepend="账号" >
            <t-input v-model="store.myDataFormData.emp.account" disabled clearable :placeholder="store.myData.emp.eUsername" />
          </t-input-adornment>
        </t-form-item>
        
        <t-form-item name="password">
          <t-input-adornment prepend="密码">
            <t-input v-model="store.myDataFormData.emp.password" type="password" clearable :placeholder="store.myData.emp.ePassword" />
          </t-input-adornment>
        </t-form-item>
        
        <t-form-item name="name">
          <t-input-adornment prepend="姓名">
            <t-input v-model="store.myDataFormData.emp.name" clearable :placeholder="store.myData.emp.eName" />
          </t-input-adornment>
        </t-form-item>
        
        <t-form-item name="eid">
          <t-input-adornment prepend="身份证号">
            <t-input v-model="store.myDataFormData.emp.eid" clearable :placeholder="store.myData.emp.eId" />
          </t-input-adornment>
        </t-form-item>
        
        <t-form-item name="phone">
          <t-input-adornment prepend="手机号">
            <t-input v-model="store.myDataFormData.emp.phone" clearable :placeholder="store.myData.emp.ePhone" />
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="age">
          <t-input-adornment prepend="年龄">
            <t-input v-model="store.myDataFormData.emp.age" clearable :placeholder="String(store.myData.emp.eAge)" />
          </t-input-adornment>
        </t-form-item>

        <t-form-item name="gender">
          <t-input-adornment prepend="性别">
            <t-select v-model="store.myDataFormData.emp.gender" :options="store.options2" placeholder="请选择性别" clearable></t-select>
          </t-input-adornment>
        </t-form-item>
        
        
        <t-form-item>
          <t-button theme="primary" type="submit" block>提交</t-button>
          <t-button theme="default" @click="cancelButton" block style="margin-left: 10px;">取消</t-button>
        </t-form-item>
        
      </t-form>
    </template>
    <template #footer>
    </template>
  </userEdit>
</template>
  <script lang="ts" setup>
  import userEdit from '@/components/userManage/userEdit.vue'
  import { useUserStore } from "@/stores/user-store";
  
  const store = useUserStore()
  
  const props = defineProps<{
    visible:boolean;
  }>();
  const emit = defineEmits(['update:visible']);
  
  const handleEditVisibleChange = () => {
    emit('update:visible', false);
  }
  const saveButton = () => {
    store.saveMyInfoButton()
    store.myDataFormData = JSON.parse(JSON.stringify(store.NullmyDataFormData));
    emit('update:visible', false);
  }
  
  // 取消按钮回调
  const cancelButton = () => {
    store.updateLoginUserData()
    store.myDataFormData = JSON.parse(JSON.stringify(store.NullmyDataFormData));
    console.log(store.myDataFormData)
    console.log(store.NullmyDataFormData)
    emit('update:visible', false);
  }
  
  </script>
  <style scoped></style>
  
  