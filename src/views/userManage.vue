<template>
  <div class="wrap">
    <div class="search">
      <userSort />
      <t-input placeholder="搜索用户" v-model:="store.searchInput" clearable style="width: 15%;"></t-input>
      <t-button theme="default" @click="store.searchUser();"><template #icon><search-icon /></template>
      </t-button>
      <div class="operations">
        <t-button theme="primary" @click="addButton">
          <template #icon><add-icon /></template>
          新增
        </t-button>
        <t-button @click="store.handleBatchDelete()"><template #icon><delete-icon /></template>
          批量删除</t-button>
      </div>
    </div>
    <div class="table">
      <userTable v-model:addVisible="addVisible" @update:addVisible="handleUpdateAddVisible" />
      <pagination class="pag" />
    </div>
  </div>
</template>
<script setup lang="ts">
import userSort from '../components/userManage/userSortDropdown.vue'
import userTable from '../components/userManage/userTable.vue'
import { ref, onMounted } from "vue";
import pagination from "@/components/userManage/pagination.vue";
import { useUserStore } from "@/stores/user-store";

const store = useUserStore()

// 组件挂载后加载用胡数据ByToken
onMounted(() => {
  store.handlePageChange()
});

//新增用户面板的可视化以及回调
const addVisible = ref(false)
const addButton = () => {
  store.cleanUserData();
  addVisible.value = true
}
const handleUpdateAddVisible = () => {
  addVisible.value = false;
};

</script>
<style lang="scss" scoped>
.wrap {
    background-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 98%;
}

.search {
  display: flex;
}

.operations {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

.table {
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pag {
  margin-top: 20px;
}
</style>
