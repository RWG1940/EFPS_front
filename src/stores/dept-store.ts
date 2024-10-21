import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TableColumnCtx } from 'element-plus'
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { UploadInstanceFunctions, DropdownProps, UploadProps } from 'tdesign-vue-next';
import { fetchDeptDataBySearch, fetchDeptDataPages, deleteDepts, deleteDept, addDept, updateDept, fetchDeptData } from '@/api/services/dept-api';


// 定义部门数据类型
export interface DeptData {
  id?: number;
  dAvatarpath?: string;
  dName?: string;
  dTotal?: string;
  dOnlineTotal?: 0;
  dCreatetime?: string;
  dUpdatetime?: string;
}

export const useDeptStore = defineStore('dept', () => {
  /*
  *状态
  */
  // 部门单条数据及集合，用于管理面板的修改
  const deptData = ref<DeptData>({});
  const emptyDeptData = ref<DeptData>({});
  const tableData = ref<DeptData[]>([]);
  const createTime1 = ref('');
  const createTime2 = ref('');
  // 查询数据
  const createEmptyUserData = () => {
    return {
      id: null,
      dName: null,
    };
  }
  const searchData = ref(createEmptyUserData())
  // 分页数据
  const current = ref<number>(1);
  const pageSize = ref<number>(10);
  const total = ref<number>(0);
  // 选中的ids
  const selectedIds = ref<number[]>([]);
  // 部门图片显示组件配置
  const autoUpload = ref(true);
  const showImageFileName = ref(true);
  const disabled = ref(false);
  const uploadAllFilesInOneRequest = ref(false);
  const file1 = ref<UploadProps['value']>([]);
  const file2 = ref<UploadProps['value']>([]);
  const avatarUrl = ref(`${import.meta.env.VITE_API_BASE_URL}/upload`);
  const uploadRef = ref<UploadInstanceFunctions>();
  // 过滤出每个部门名字对应的员工人数
  const deptTotal = computed(() => {
    return tableData.value.map(item => {
      return {
        dName: item.dName,
        dTotal: item.dTotal,
        dOnlineTotal: item.dOnlineTotal,
      }
    })
  })
  /*
  *动作
  */
  // 部门数据获取
  const getAllDeptData = async () => {
    await fetchDeptData().then((resp) => {
      tableData.value = resp.data.result;
    })
  };
  // 部门数据查找

  // 部门分页数据获取
  const handlePageChange = async () => {
    await fetchDeptDataPages(current.value, pageSize.value).then((resp) => {
      tableData.value = resp.data.result.rows;
      total.value = resp.data.result.total;
    })
  };
  // 批量删除部门
  const handleBatchDelete = async () => {
    if (selectedIds.value.length === 0) {
      MessagePlugin.warning('请先选择要删除的部门');
      return;
    }
    const msg = MessagePlugin.loading('批量删除中')
    await new Promise(resolve => setTimeout(resolve, 500));
    await deleteDepts(selectedIds.value).then(() => {
      MessagePlugin.close(msg);
      handlePageChange();
      MessagePlugin.success('删除成功');
    })
  };
  // 删除单条部门BY id
  const handleDelete = async (id: number) => {
    const msg = MessagePlugin.info('删除中');
    await new Promise(resolve => setTimeout(resolve, 200));
    await deleteDept(id).then(() => {
      MessagePlugin.close(msg);
      handlePageChange();
      MessagePlugin.success('删除成功');
    })
  };

  // 多选
  const handleSelectionChange = (selection: DeptData[]) => {
    selectedIds.value = selection.map(item => item.id!);
  };
  // 图片上传失败回调
  const handleFail: UploadProps['onFail'] = ({ file }) => {
    MessagePlugin.error(`图片 ${file.name} 上传失败`);
  };
  const handleSuccess = (response: any, file: File) => {
    if (response.response.code == 1) {
      deptData.value.dAvatarpath = response.response.result;
    } else {
      console.error('Unexpected upload response format:', response.response);
      MessagePlugin.error('图片上传失败: 响应格式不正确');
    }
  };

  const imageViewerProps = ref<UploadProps['imageViewerProps']>({
    closeOnEscKeydown: false,
  });
  // 图片大小限制
  const sizeLimit = ref<UploadProps['sizeLimit']>({
    size: 5500,
    unit: 'KB',
  });
  // 修改部门保存按钮
  const saveButton = async () => {
    await updateDept(deptData.value).then(() => {
      MessagePlugin.success('修改部门成功');
      handlePageChange();
    })
  }
  // 添加部门添加按钮
  const submitButton = async () => {
    await addDept(deptData.value).then(() => {
      MessagePlugin.success('添加部门成功');
      handlePageChange();
    })
  }

  // 清除暂存的部门数据
  const cleanDeptData = () => {
    deptData.value = emptyDeptData.value;
    file1.value = file2.value
  }

  // 搜索部门
  const searchDept = async () => {
    await fetchDeptDataBySearch(searchData.value).then((resp) => {
      tableData.value = resp.data.result;
    })
    if (createTime1.value != '' && createTime2.value != '') {
      const startDate = new Date(createTime1.value).getTime();
      const endDate = new Date(createTime2.value).getTime();
      const filteredItems = tableData.value.filter(item => {
        const createTime = new Date(item.dCreatetime!).getTime();
        return createTime >= startDate && createTime <= endDate;
      });
      tableData.value = filteredItems;
    }
    total.value = tableData.value.length;
  }
  
  
  // 搜索部门数据体重置
  const searchDeptDataRefresh = async () => {
    await handlePageChange().then(() => {
      searchData.value = createEmptyUserData()
      createTime1.value = ''
      createTime2.value = ''
    })
  }


  return {
    tableData,
    total,
    current,
    pageSize,
    selectedIds,
    imageViewerProps,
    sizeLimit,
    avatarUrl,
    file1,
    uploadAllFilesInOneRequest,
    disabled,
    showImageFileName,
    autoUpload,
    uploadRef,
    deptData,
    deptTotal,
    createTime1,
    createTime2,
    searchData,


    handlePageChange,
    handleBatchDelete,
    handleDelete,
    handleSelectionChange,
    handleFail,
    saveButton,
    submitButton,
    handleSuccess,
    cleanDeptData,
    getAllDeptData,
    searchDept,
    searchDeptDataRefresh
    
  };
});
