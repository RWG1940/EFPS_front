import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import type { TableColumnCtx } from 'element-plus'
import { computed } from 'vue';
import { userLogin, userLoginBytoken } from '@/api/login-api';
import { regUser } from '@/api/reg-api';
import { fetchUserDataBySearch, fetchUserDataPages, deleteUsers, deleteUser, updateUser, addUser } from '@/api/user-api'
import { MessagePlugin } from 'tdesign-vue-next';
import type { DropdownProps, UploadProps, FormProps } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';

// 定义用户数据类型
export interface UserData {
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
export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  /*
  *状态
  */
  // 用户登陆状态
  const token = ref(localStorage.getItem('token') || '');
  // 用户数据体、集合
  const userData = ref<UserData>({});
  const tableData = ref<UserData[]>([]);
  // 用户数据查询条件
  const options: DropdownProps['options'] = [
    { content: '所有', value: 'all' },
    { content: 'id', value: 'id' },
    { content: '姓名', value: 'eName' },
    { content: '账号', value: 'eUsername' },
    { content: '手机号', value: 'ePhone' },
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
  // 用户头像显示组件配置
  const autoUpload = ref(true);
  const showImageFileName = ref(true);
  const disabled = ref(false);
  const uploadAllFilesInOneRequest = ref(false);
  const file1 = ref<UploadProps['value']>([]);
  const avatarUrl = ref()
  // 登陆表单
  const LOGIN_FORM_RULES = { account: [{ required: true, message: '账户必填' }], password: [{ required: true, message: '密码必填' }] };
  const loginFormData: FormProps['data'] = reactive({
    account: '',
    password: ''
  });
  // 注册表单
  const REG_FORM_RULES = { account: [{ required: true, message: '账户必填' }], password: [{ required: true, message: '密码必填' }], eid: [{ required: true, message: '身份证号必填' }], phone: [{ required: true, message: '手机号必填' }] };
  const regFormData: FormProps['data'] = reactive({
    account: '',
    password: '',
    eid: '',
    phone: ''
  });
  /*
  *动作
  */
  // 用户数据查找
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
  // 用户分页数据获取
  const handlePageChange = async () => {
    try {
      const response = await fetchUserDataPages(current.value, pageSize.value);
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
      handlePageChange();
    } catch (error) {
      MessagePlugin.error('批量删除失败');
    }
  };
  // 删除单条用户BY id
  const handleDelete = async (id: number) => {
    const msg = MessagePlugin.info('删除中');
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      await deleteUser(id);
      MessagePlugin.close(msg);
      MessagePlugin.success('用户删除成功');
      handlePageChange();
    } catch (error) {
      MessagePlugin.error('删除用户失败');
    }
  };
  // 查询条件修改
  const clickHandler = (data: { content: string, value: string }) => {
    condition.value = data.content;
    searchCondition.value = data.value;
  };
  // 多选
  const handleSelectionChange = (selection: UserData[]) => {
    selectedIds.value = selection.map(item => item.id!);
  };
  // 筛选
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
  // 头像上传失败回调
  const handleFail: UploadProps['onFail'] = ({ file }) => {
    MessagePlugin.error(`文件 ${file.name} 上传失败`);
  };
  const imageViewerProps = ref<UploadProps['imageViewerProps']>({
    closeOnEscKeydown: false,
  });
  // 头像大小限制
  const sizeLimit = ref<UploadProps['sizeLimit']>({
    size: 500,
    unit: 'KB',
  });
  // 修改用户保存按钮
  const saveButton = async () => {
    try {
      await updateUser(userData.value);
      MessagePlugin.success('用户信息更新成功');
      handlePageChange()
    } catch (error) {
      MessagePlugin.error('更新用户信息失败');
    }
  }
  // 添加用户添加按钮
  const submitButton = async () => {
    try {
      await addUser(userData.value);
      MessagePlugin.success('添加用户成功');
      handlePageChange()
    } catch (error) {
      MessagePlugin.error('添加用户失败');
    }
  }
  // 手动登录提交按钮
  const loginOnSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    const msg = MessagePlugin.loading('登陆中')
    await new Promise(resolve => setTimeout(resolve, 200));
    if (validateResult === true) {
      try {
        const user = { eUsername: loginFormData.account, ePassword: loginFormData.password };
        const response = await userLogin(user);
        MessagePlugin.close(msg)
        if (response.code === 1) {
          token.value = response.data
          localStorage.setItem('token', response.data);
          MessagePlugin.success('登录成功');
          router.push('/home');
        } else {
          MessagePlugin.error(response.msg || '登录失败');
        }
      } catch (error) {
        console.error('登录失败:', error);
        MessagePlugin.error('登录失败，请检查账号和密码');
      }
    } else {
      console.log('Validate Errors: ', firstError, validateResult);
      if (firstError) {
        MessagePlugin.warning(firstError);
      } else {
        MessagePlugin.warning('验证失败');
      }
    }
  };
  // 自动登录
  const autoLogin = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const msg = MessagePlugin.loading('自动登陆中')
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await userLoginBytoken(token);
        if (response.code === 1) {
          MessagePlugin.close(msg)
          MessagePlugin.success('登录成功');
          router.push('/home');
        } else {
          MessagePlugin.error(response.msg || '登录失败');
        }
      } catch (error) {
        console.error('登录失败:', error);
        MessagePlugin.error('登录失败，请检查账号和密码');
      }
    }
  }
  // 注册提交按钮
  const regOnSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    const msg = MessagePlugin.loading('注册中');
    await new Promise(resolve => setTimeout(resolve, 200));
    if (validateResult === true) {
      try {
        const user = { eUsername: regFormData.account, ePassword: regFormData.password, eId: regFormData.eid, ePhone: regFormData.phone };
        const response = await regUser(user);
        MessagePlugin.close(msg);
        if (response.code === 1) {
          MessagePlugin.success('注册成功');
          token.value = response.data
          localStorage.setItem('token', response.data);
          router.push('/home');
        } else {
          MessagePlugin.error(response.msg || '注册失败');
        }
      } catch (error) {
        MessagePlugin.close(msg);
        console.error('注册失败:', error);
        MessagePlugin.error('注册失败，请重试');
      }
    } else {
      console.log('Validate Errors: ', firstError, validateResult);
      if (firstError) {
        MessagePlugin.warning(firstError);
      } else {
        MessagePlugin.warning('验证失败');
      }
    }
  };
  const logout = () => {
    token.value = '';
    localStorage.removeItem('token');
    router.push('/login');
  };

  return {
    token,
    userData,
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
    loginFormData,
    LOGIN_FORM_RULES,
    regFormData,
    REG_FORM_RULES,



    searchUser,
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
    autoLogin,
    loginOnSubmit,
    regOnSubmit,
    logout,
  };
});
