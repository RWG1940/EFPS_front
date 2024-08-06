import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TableColumnCtx } from 'element-plus'
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { UploadInstanceFunctions, DropdownProps, UploadProps } from 'tdesign-vue-next';
import { BASE_URL } from "@/api/user-api";
import { fetchDeptDataBySearch, fetchDeptDataPages, deleteDepts, deleteDept, addDept, updateDept } from '@/api/dept-api';


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
  const avatarUrl = ref(`${BASE_URL}/upload`);
  const uploadRef = ref<UploadInstanceFunctions>();

  /*
  *动作
  */
  // 部门数据查找
  const searchDept = async () => {
    try {
      const response = await fetchDeptDataBySearch({
        [searchCondition.value]: searchInput.value,
      });
      if (response.code == 1) {
        tableData.value = response.data;
      } else {
        console.error(response.msg);
      }
    } catch (error) {
      console.error('查找用户数据失败');
    }
  };
  // 部门分页数据获取
  const handlePageChange = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetchDeptDataPages(current.value, pageSize.value, token);
        if (response.code == 1) {
          tableData.value = response.data.rows;
          total.value = response.data.total;
        } else {
          console.error(response.msg);
        }
      } catch (error) {
        console.error('加载部门数据出错');
      }
    } else {
      MessagePlugin.error('token不存在')
    }

  };
  // 批量删除部门
  const handleBatchDelete = async () => {
    if (selectedIds.value.length === 0) {
      MessagePlugin.warning('请先选择要删除的部门');
      return;
    }
    const msg = MessagePlugin.loading('批量删除中')
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await deleteDepts(selectedIds.value);
      if (response.code == 1) {
        MessagePlugin.close(msg);
        MessagePlugin.success('批量删除成功');
        handlePageChange();
      } else {
        MessagePlugin.close(response.msg);
      }
    } catch (error) {
      MessagePlugin.error('批量删除失败');
    }
  };
  // 删除单条部门BY id
  const handleDelete = async (id: number) => {
    const msg = MessagePlugin.info('删除中');
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const response = await deleteDept(id);
      if (response.code == 1) {
        MessagePlugin.close(msg);
        MessagePlugin.success('部门删除成功');
        handlePageChange();
      } else {
        MessagePlugin.close(response.msg);
      }
    } catch (error) {
      MessagePlugin.error('删除部门失败');
    }
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
    if (response.response.code === 1) {
      deptData.value.dAvatarpath = response.response.data;
      console.log('图片上传成功:', response.response.data);
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
    try {
      const response = await updateDept(deptData.value);
      if (response.code == 1) {
        MessagePlugin.success('部门信息更新成功');
        handlePageChange()
      }else{
        MessagePlugin.error(response.msg);
      }
    } catch (error) {
      MessagePlugin.error('更新部门信息失败');
    }
  }
  // 添加部门添加按钮
  const submitButton = async () => {
    try {
      const response = await addDept(deptData.value);
      if (response.code == 1) {
        MessagePlugin.success('添加部门成功');
        handlePageChange()
      } else {
        MessagePlugin.error('添加部门失败');
      }
    } catch (error) {
      MessagePlugin.error('添加部门失败');
    }
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
