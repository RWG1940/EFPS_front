<template>
  <el-table :data="tableData" stripe border style="width: 170vh" max-height="60vh"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column fixed prop="eAvatarpath" label="头像" width="80" />
    <el-table-column
    fixed prop="id"
      label="ID"
      sortable
      width="60"
      column-key="id"
      :filters="idFilters"
      :filter-method="filterHandler"
    />
    <el-table-column fixed prop="eName" label="姓名" width="100" show-overflow-tooltip>
      <template #default="scope"><el-tag>{{ scope.row.eName }}</el-tag></template>
    </el-table-column>
    <el-table-column prop="eUsername" label="账号" width="120" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="ePassword" label="密码" width="80" show-overflow-tooltip>
      <template #default="scope">
        <el-popover trigger="hover" placement="top-start" v-model:visible="showPasswordState[scope.row.id]" width="auto">
          <template #reference>
            <div style="display: flex; align-items: center">

              <span style="margin-left: 10px">{{ showPasswordState[scope.row.id] ? scope.row.ePassword : maskedPassword
              }}</span>
            </div>
          </template>
          <div>{{ scope.row.ePassword }}</div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="eIsenabled" label="帐号状态" width="100">
      <template #default="scope"><el-tag :type="scope.row.eIsenabled == '0' ? 'success' : 'danger'">{{
        scope.row.eIsenabled == '0' ? '正常' : '禁用'
      }}</el-tag></template>
    </el-table-column>
    <el-table-column prop="ePhone" label="手机号" width="120" show-overflow-tooltip>
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon>
            <Iphone color="green" />
          </el-icon>
          <span style="margin-left: 10px">{{ scope.row.ePhone }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="eId" label="证件号" width="120" show-overflow-tooltip />
    <el-table-column prop="eRole" label="职位" width="120">
      <template #default="scope"><el-tag :type="scope.row.eRole === '管理员' ? 'warning' : 'info'">{{ scope.row.eRole
      }}</el-tag></template>
    </el-table-column>
    <el-table-column prop="eDeptid" label="部门" width="120" />
    <el-table-column prop="eAge" label="年龄" width="120" />
    <el-table-column prop="eGender" label="性别" width="120" />
    <el-table-column prop="eCreatetime" label="入职日期" width="120" show-overflow-tooltip />
    <el-table-column prop="eUpdatetime" label="更新日期" width="120" show-overflow-tooltip />
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{ row }">
        <div style="display: flex;">
          <t-button theme="default" shape="round" @click="handleEditClick(row)">修改</t-button>
          <t-button theme="danger" shape="round" @click="handleDeleteClick(row.id)">删除</t-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <userDataEdit :visible="editVisible" @update:visible="handleEditVisibleChange" :userData="userData"
    @userEdited="handleloadUserData" />
  <userDataAdd :visible="addVisible" @update:visible="handleAddVisibleChange" @userAdded="handleloadUserData" />
  <!-- 确认面板 -->
  <userEdit v-model:visible="confirmVisible" header="确认删除？" top="250px" theme="warning">
    <template #main>
      <p style="margin-left: 50px; text-shadow: 1px 1px 10px rgb(255, 0, 0); ">此操作将不可逆</p>
    </template>
    <template #footer>

      <t-button @click="handleCancel" theme="default">取消</t-button>
      <t-button @click="handleDelete(delId)">确认</t-button>
    </template>
  </userEdit>
</template>

<script lang="ts" setup>
import { watch, ref,computed } from 'vue';
import { deleteUser } from "@/api/user-api";
import { BASE_URL } from "@/api/user-api";
import userDataEdit from './userDataEdit.vue';
import userDataAdd from './userDataAdd.vue';
import { MessagePlugin } from 'tdesign-vue-next';
import userEdit from './userEdit.vue';
import type { TableColumnCtx, TableInstance } from 'element-plus'

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
const delId = ref()
const confirmVisible = ref(false)
// 定义密码显示状态对象
const showPasswordState = ref<{ [key: number]: boolean }>({});

// 掩码密码的字符串
const maskedPassword = '••••••';

// 父组件传来的值 代理 这里是用来控制 添加用户面板
const props = defineProps<{
  addVisible: boolean;
  tableData: UserData[]
}>();

const userData = ref<UserData>({});
const tableData = ref<UserData[]>([...props.tableData]);
const emit = defineEmits(['update:addVisible', 'update:tableData', 'selection-change']);

// 监听 props.tableData 的变化，并更新到本地的 tableData
watch(() => props.tableData, (newTableData) => {
  tableData.value = [...newTableData];
}, { immediate: true });

// 修改面板控制值
const editVisible = ref(false);

const avatarUrl = ref()
const url = BASE_URL

const filterHandler = (
  value: string,
  row: UserData,
  column: TableColumnCtx<UserData>
) => {
  const property = column['property'] as keyof UserData; // 使用 keyof UserData
  return row[property] === value;
}

const idFilters = computed(() => {
  return tableData.value.map(item => ({
    text: item.id?.toString() || '',
    value: item.id
  }));
});

const handleDeleteClick = (id: number) => {
  confirmVisible.value = true
  delId.value = id
}

const handleCancel = () => {
  confirmVisible.value = false
}


const handleloadUserData = () => {
  emit('update:tableData');
}
const handleAddVisibleChange = () => {
  emit('update:addVisible');
};
const handleEditVisibleChange = () => {
  editVisible.value = false;
}
// 修改按钮回调
const handleEditClick = (row: any) => {
  console.log('edit', row);
  userData.value = { ...row };
  editVisible.value = true;
  // 动态设置上传文件的URL
  avatarUrl.value = `${url}/avatar/${userData.value.eAvatarpath}`;
};

// 删除按钮回调
const handleDelete = async (id: number) => {
  const msg = MessagePlugin.info('删除中');
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    await deleteUser(id);
    MessagePlugin.close(msg);
    MessagePlugin.success('用户删除成功');
    // 重新加载用户数据
    handleloadUserData();
    confirmVisible.value = false;
  } catch (error) {
    MessagePlugin.error('删除用户失败');
  }
};


// 选择变化回调
const handleSelectionChange = (selection: UserData[]) => {
  const selectedIds = selection.map(item => item.id!);
  emit('selection-change', selectedIds);
};



</script>

<style scoped></style>
