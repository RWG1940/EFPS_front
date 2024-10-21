<template>
  <!-- 修改用户信息 -->
  <userEdit :visible="visible" header="用户资料修改" @update:visible="handleEditVisibleChange">
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
        <t-form ref="form" :data="store.userDataFormData" :rules="store.USERDATA_FORM_RULES" :label-width="0"
          @submit="saveButton">

          <t-form-item name="account">
            <t-input-adornment prepend="账号">
              <t-input v-model="store.userDataFormData.emp.account" disabled clearable
                :placeholder="store.userData.emp.eUsername" />
            </t-input-adornment>
          </t-form-item>

          <t-form-item name="password">
            <t-input-adornment prepend="密码">
              <t-input v-model="store.userDataFormData.emp.password" type="password" clearable
                :placeholder="store.userData.emp.ePassword" />
            </t-input-adornment>
          </t-form-item>

          <t-form-item name="name">
            <t-input-adornment prepend="姓名">
              <t-input v-model="store.userDataFormData.emp.name" clearable :placeholder="store.userData.emp.eName" />
            </t-input-adornment>
          </t-form-item>

          <t-form-item name="eid">
            <t-input-adornment prepend="身份证号">
              <t-input v-model="store.userDataFormData.emp.eid" clearable :placeholder="store.userData.emp.eId" />
            </t-input-adornment>
          </t-form-item>

          <t-form-item name="phone">
            <t-input-adornment prepend="手机号">
              <t-input v-model="store.userDataFormData.emp.phone" clearable :placeholder="store.userData.emp.ePhone" />
            </t-input-adornment>
          </t-form-item>

          <t-form-item name="role">
            <t-input-adornment prepend="角色">
              <t-select v-model="store.userDataFormData.role.rid" placeholder="请选择角色" clearable>
                <t-option :value="item.rId" :label="item.rInfo" v-for="(item, index) in roleStore.roleList"
                  :key="index"></t-option>

              </t-select>
            </t-input-adornment>
          </t-form-item>

          <t-form-item name="deptid">
            <t-input-adornment prepend="部门">
              <t-select v-model="store.userDataFormData.emp.deptid" placeholder="请选择部门"
                clearable>
                <t-option :value="item.id" :label="item.dName" v-for="(item, index) in deptStore.tableData"
                  :key="index"></t-option>
              </t-select>
            </t-input-adornment>
          </t-form-item>

          <t-form-item name="isEnabled">
            <t-input-adornment prepend="账号状态">
              <t-select v-model="store.userDataFormData.emp.isEnabled" :options="store.options4" placeholder="请选择状态"
                clearable></t-select>
            </t-input-adornment>
          </t-form-item>

          <t-form-item name="age">
            <t-input-adornment prepend="年龄">
              <t-input v-model="store.userDataFormData.emp.age" clearable
                :placeholder="String(store.userData.emp.eAge)" />
            </t-input-adornment>
          </t-form-item>

          <t-form-item name="gender">
            <t-input-adornment prepend="性别">
              <t-select v-model="store.userDataFormData.emp.gender" :options="store.options2" placeholder="请选择性别"
                clearable></t-select>
            </t-input-adornment>
          </t-form-item>


          <t-form-item>
            <t-button theme="primary" type="submit" block>提交</t-button>
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
import { useDeptStore } from "@/stores/dept-store";
import { useRoleStore } from "@/stores/role-store";

const store = useUserStore()
const deptStore = useDeptStore()
const roleStore = useRoleStore()

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
  // 清空表单数据
  store.userDataFormData = JSON.parse(JSON.stringify(store.NulluserDataFormData));
  emit('update:visible', false);
}

</script>

<style scoped></style>
