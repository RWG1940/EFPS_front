<template>
  <div class="t-suf-container">
    <t-drawer class="panel" v-model:visible="homeStore.myInfoVisible" :placement="placement" :mode="mode" :confirm-btn="{
      content: 'OK',
      disabled: true,
    }" header="个人中心" show-in-attached-element>
      <div class="wrap">
        <div class="avatar">
          <t-avatar :image="userStore.myData.emp.eAvatarpath" size="100px" />
        </div>
        <div class="content">
          <span>
            <p class="rwg">用户名：</p>
            <p>{{ userStore.myData.emp.eName }}</p>
          </span>
          <span>
            <p class="rwg">账号：</p>
            <p>{{ userStore.myData.emp.eUsername }}</p>
          </span>
          <span>
            <p class="rwg">id：</p>
            <p>{{ userStore.myData.emp.id }}</p>
          </span>
          <span>
            <p class="rwg">手机号：</p>
            <p>{{ userStore.myData.emp.ePhone }}</p>
          </span>
          <span>
            <p class="rwg">入职日期：</p>
            <p>{{ formatDate(userStore.myData.emp.eCreatetime || '') }}</p>
          </span>
          <span>
            <p class="rwg">部门：</p>
            <p>{{ userStore.myData.dept.dName }}</p>
          </span>
          <span>
            <p class="rwg">角色：</p>
            <p>{{ userStore.myData.role.rInfo }}</p>
          </span>
          <t-button theme="default" style="margin-top: 15px;" size="small" @click="handleEditClick">修改资料</t-button>
        </div>
      </div>
    </t-drawer>
    <myInfoEdit :visible="editVisible" @update:visible="handleEditVisibleChange" />
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import { useHomeStore } from "@/stores/home-store";
import { useUserStore } from "@/stores/user-store";
import myInfoEdit from "@/layout/components/myInfoEdit.vue";
import { formatDate } from "@/utils/moment";

const userStore = useUserStore()
const homeStore = useHomeStore()
const placement = ref('top');
const mode = ref('overlay');
const editVisible = ref(false)

// myInfoEdit保存按钮的回调
const handleEditVisibleChange = () => {
  editVisible.value = false;
}
// 编辑按钮事件
const handleEditClick = () => {
  editVisible.value = true;
}

</script>
<style scoped>
.wrap {
  display: flex;
  align-items: center;
}

.avatar {
  margin-right: 15px;
  display: flex;
  flex-direction: column;
}

.content {
  margin-left: 20px;
  display: flex;
}

.content span {
  display: flex;
  height: 27px;
  margin-right: 20px;

}

.rwg {
  color: blue;
  font-weight: bold;
}</style>
  