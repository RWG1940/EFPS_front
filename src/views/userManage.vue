<template>
  <div class="wrap">
    <div class="search">
      <userSort @updateSearchCondition="updateSearchCondition" />
      <t-input placeholder="搜索用户" v-model:="searchInput" clearable style="width: 15%;"></t-input>
      <t-button theme="default" @click="searchUser"><template #icon><search-icon /></template>
      </t-button>
      <div class="operations">
        <t-button theme="primary" @click="addButton">
          <template #icon><add-icon /></template>
          新增
        </t-button>
        <t-button @click="handleBatchDelete"><template #icon><delete-icon /></template>
          批量删除</t-button>
      </div>
    </div>
    <div class="table">
      <userTable v-model:addVisible="addVisible" :tableData="tableData" @update:tableData="handlePageChange(current,pageSize)"
        @update:addVisible="handleUpdateAddVisible" @selection-change="updateSelectedIds" />
      <pagination class="pag" :current="current" :pageSize="pageSize" :total="total" @pageChange="handlePageChange" @eleChange="handleEleChange"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import userSort from '../components/userManage/userSortDropdown.vue'
import userTable from '../components/userManage/userTable.vue'
import { ref, onMounted } from "vue";
import { fetchUserDataBySearch, fetchUserDataPages,deleteUsers } from "@/api/user-api";
import pagination from "@/components/userManage/pagination.vue";
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
const searchCondition = ref<string>('id');
const searchInput = ref<string>('');
const tableData = ref<UserData[]>([])
const current = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);

const updateSearchCondition = (condition: string) => {
  searchCondition.value = condition;
};
const searchUser = async () => {
  try {
    const response = await fetchUserDataBySearch({
      [searchCondition.value]: searchInput.value,
    });
    if (response && response.data && Array.isArray(response.data)) {
      tableData.value = response.data;
    } else {
      console.error('Unexpected data format:', response);
    }
  } catch (error) {
    console.error('Failed to search user data:', error);
  }
};
const handlePageChange = async (current: number, pageSize: number) => {
  
  try {
    const response = await fetchUserDataPages(current, pageSize);
    console.log('Fetched user dataPages:', response);
    if (response && response.data && Array.isArray(response.data.rows)) {
      tableData.value = response.data.rows;
      total.value = response.data.total;
    } else {
      console.error('Unexpected data format:', response);
    }
  } catch (error) {
    console.error('Failed to load user data:', error);
  }
};

// 组件挂载后加载
onMounted(() => {
  handlePageChange(current.value, pageSize.value)
});

//新增用户面板的可视化以及回调
const addVisible = ref(false)
const addButton = () => {
  addVisible.value = true
}
const handleUpdateAddVisible = () => {
  addVisible.value = false;
  console.log(addVisible)
};

// 更新选中的用户ID
const updateSelectedIds = (ids: number[]) => {
  selectedIds.value = ids;
};

// 批量删除用户
const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    MessagePlugin.warning('请先选择要删除的用户');
    return;
  }
  const msg = MessagePlugin.loading('批量删除中')
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    await deleteUsers(selectedIds.value);
    MessagePlugin.close(msg);
    MessagePlugin.success('批量删除成功');
    // 重新加载用户数据
    handlePageChange(current.value, pageSize.value);
  } catch (error) {
    MessagePlugin.error('批量删除失败');
  }
};
const handleEleChange = (rwg:number,sjm:number) => {
  current.value=rwg
  pageSize.value=sjm
}
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
