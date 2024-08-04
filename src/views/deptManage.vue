<template>
    <div class="wrap">
      <div class="search">
        <deptSort/>
        <t-input placeholder="搜索部门" v-model:="store.searchInput" clearable style="width: 15%;"></t-input>
        <t-button theme="default" @click="store.searchDept();"><template #icon><search-icon /></template>
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
        <deptTable v-model:addVisible="addVisible" @update:addVisible="handleUpdateAddVisible" />
        <pagination class="pag" />
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import deptSort from '../components/deptManage/deptSortDropdown.vue'
  import deptTable from '../components/deptManage/deptTable.vue'
  import { ref, onMounted } from "vue";
  import pagination from "@/components/userManage/pagination.vue";
  import { useDeptStore } from "@/stores/dept-store";
  
  const store = useDeptStore()
  
  // 组件挂载后加载
  onMounted(() => {
    store.handlePageChange()
  });
  
  //新增用户面板的可视化以及回调
  const addVisible = ref(false)
  const addButton = () => {
    store.cleanDeptData();
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
    margin: 2%;
    height: 98%;
    width: 93%;
  
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
  