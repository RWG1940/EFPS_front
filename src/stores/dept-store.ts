import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TableColumnCtx } from 'element-plus'
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { UploadInstanceFunctions, DropdownProps, UploadProps } from 'tdesign-vue-next';
import { fetchDeptDataBySearch, fetchDeptDataPages, deleteDepts, deleteDept, addDept, updateDept } from '@/api/services/dept-api';


// 定义部门数据类型
export interface DeptData {
  id?: number;
  dAvatarpath?: string;
  dName?: string;
  dTotal?: string;
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
  // 数据下拉条件
  const options: DropdownProps['options'] = [
    { content: '所有', value: 'all' },
    { content: 'id', value: 'id' },
    { content: '部门名', value: 'dName' },
  ];
  const condition = ref(options[0].content);
  const searchCondition = ref<string>('id');
  const searchInput = ref<string>('');
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

  /*
  *动作
  */
  // 部门数据查找
  const searchDept = async () => {
    await fetchDeptDataBySearch({
      [searchCondition.value]: searchInput.value,
    }).then((resp) => {
      tableData.value = resp.data.result;
    })
  };
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
  // 查询条件修改
  const clickHandler = (data: { content: string, value: string }) => {
    condition.value = data.content;
    searchCondition.value = data.value;
  };
  // 多选
  const handleSelectionChange = (selection: DeptData[]) => {
    selectedIds.value = selection.map(item => item.id!);
  };
  // 筛选
  const filterHandler = (
    value: string,
    row: DeptData,
    column: TableColumnCtx<DeptData>
  ) => {
    const property = column['property'] as keyof DeptData;
    return row[property] === value;
  }
  const idFilters = computed(() => {
    return tableData.value.map(item => ({
      text: item.id?.toString() || '',
      value: item.id
    }));
  });
  // 图片上传失败回调
  const handleFail: UploadProps['onFail'] = ({ file }) => {
    MessagePlugin.error(`图片 ${file.name} 上传失败`);
  };
  const handleSuccess = (response: any, file: File) => {
    if (response.response.code == 1) {
      deptData.value.dAvatarpath = response.response.result;
      console.log('图片上传成功:', response.response.result);
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


  return {
    tableData,
    searchInput,
    total,
    current,
    pageSize,
    selectedIds,
    condition,
    options,
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


    searchDept,
    handlePageChange,
    handleBatchDelete,
    handleDelete,
    clickHandler,
    handleSelectionChange,
    idFilters,
    filterHandler,
    handleFail,
    saveButton,
    submitButton,
    handleSuccess,
    cleanDeptData,
  };
});
