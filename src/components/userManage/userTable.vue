<template>
  <el-table :data="store.tableData" stripe border style="width: 170vh" max-height="60vh"
    @selection-change="store.handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column fixed prop="emp.eAvatarpath" label="头像" width="80">
      <template #default="scope">
        <t-avatar :image="scope.row.emp.eAvatarpath" size="50px" />
      </template>
    </el-table-column>
    <el-table-column fixed prop="emp.id" label="ID" sortable width="60" column-key="id" :filters="store.idFilters"
      :filter-method="store.filterHandler" />
    <el-table-column fixed prop="emp.eName" label="姓名" width="100" show-overflow-tooltip>
      <template #default="scope"><el-tag effect="plain">{{ scope.row.emp.eName }}</el-tag></template>
    </el-table-column>
    <el-table-column label="状态" width="80" show-overflow-tooltip>
      <template #default="scope">
        <el-tag :type="scope.row.isOnline == '1' ? 'success' : 'info'" effect="dark" round size="small">{{ scope.row.isOnline == '1' ?
          '在线' : '离线'
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="emp.eUsername" label="账号" width="120" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="emp.ePassword" label="密码" width="80" show-overflow-tooltip>
      <template #default="scope">
        <el-popover trigger="hover" placement="top-start" v-model:visible="showPasswordState[scope.row.emp.id]"
          width="auto">
          <template #reference>
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ showPasswordState[scope.row.emp.id] ? scope.row.emp.ePassword :
                maskedPassword
              }}</span>
            </div>
          </template>
          <div>{{ scope.row.emp.ePassword }}</div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="emp.eIsenabled" label="帐号状态" width="100">
      <template #default="scope"><el-tag :type="scope.row.emp.eIsenabled == '0' ? 'success' : 'danger'">{{
        scope.row.emp.eIsenabled == '0' ? '正常' : '禁用'
      }}</el-tag></template>
    </el-table-column>
    <el-table-column prop="emp.ePhone" label="手机号" width="120" show-overflow-tooltip>
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon>
            <Iphone color="green" />
          </el-icon>
          <span style="margin-left: 10px">{{ scope.row.emp.ePhone }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="emp.eId" label="证件号" width="120" show-overflow-tooltip />
    <el-table-column prop="role.rInfo" label="角色" width="120">
      <template #default="scope"><el-tag :type="scope.row.role.rId == 3 ? 'info' : 'warning'">{{ scope.row.role.rInfo
      }}</el-tag></template>
    </el-table-column>
    <el-table-column prop="dept.dName" label="部门" width="120">
    </el-table-column>
    <el-table-column prop="emp.eAge" label="年龄" width="120" />
    <el-table-column prop="emp.eGender" label="性别" width="120">
      <template #default="scope"><el-tag round :type="scope.row.emp.eGender == '0' ? 'primary' : 'danger'">{{
        scope.row.emp.eGender == '0' ? '♂' : '♀'
      }}</el-tag></template>
    </el-table-column>
    <el-table-column prop="emp.eCreatetime" label="入职日期" width="120" show-overflow-tooltip>
      <template #default="scope">
        {{ formatDate(scope.row.emp.eCreatetime) }}
      </template>
    </el-table-column>
    <el-table-column prop="emp.eUpdatetime" label="更新日期" width="120" show-overflow-tooltip>
      <template #default="scope">
        {{ formatDate(scope.row.emp.eUpdatetime) }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{ row }">
        <div style="display: flex;">
          <t-button theme="default" shape="round" @click="handleEditClick(row)">修改</t-button>
          <t-button theme="danger" shape="round" @click="handleDeleteClick(row.emp.id)">删除</t-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <userDataEdit :visible="editVisible" @update:visible="handleEditVisibleChange" />
  <userDataAdd :visible="addVisible" @update:visible="handleAddVisibleChange" @userAdded="store.handlePageChange" />
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
import { ref } from 'vue';
import { formatDate } from "@/utils/moment";
import userDataEdit from './userDataEdit.vue';
import userDataAdd from './userDataAdd.vue';
import userEdit from './userEdit.vue';
import { useUserStore } from "@/stores/user-store";

const store = useUserStore()

const delId = ref()
const confirmVisible = ref(false)
// 定义密码显示状态对象
const showPasswordState = ref<{ [key: number]: boolean }>({});
// 掩码密码的字符串
const maskedPassword = '已加密';

// 父组件传来的值 代理 这里是用来控制 添加用户面板
const props = defineProps<{
  addVisible: boolean;
}>();

const emit = defineEmits(['update:addVisible']);

// 修改面板控制值
const editVisible = ref(false);

const handleDeleteClick = (id: number) => {
  confirmVisible.value = true
  delId.value = id
}

const handleCancel = () => {
  confirmVisible.value = false
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
  store.userData = { ...row };
  editVisible.value = true;

};

// 删除按钮回调
const handleDelete = async (id: number) => {
  store.handleDelete(id)
  confirmVisible.value = false;
};

</script>

<style scoped></style>
