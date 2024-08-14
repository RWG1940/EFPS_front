import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import type { TableColumnCtx } from 'element-plus'
import { computed } from 'vue';
import { userLogin, userLoginBytoken } from '@/api/login-api';
import { regUser } from '@/api/reg-api';
import { fetchUserDataBySearch, fetchUserDataPages, deleteUsers, deleteUser, updateUser, addUser } from '@/api/user-api'
import { MessagePlugin } from 'tdesign-vue-next';
import type { UploadInstanceFunctions, DropdownProps, UploadProps, FormProps } from 'tdesign-vue-next';
import { BASE_URL } from "@/api/user-api";
import { useRouter } from 'vue-router';

// 定义用户数据类型
export interface Emp {
  id?: number;
  eAvatarpath?: string;
  eName?: string;
  eUsername?: string;
  ePassword?: string;
  eId?: string;
  ePhone?: string;
  eAge?: number;
  eDeptid?: string;
  eGender?: string;
  eCreatetime?: string;
  eUpdatetime?: string;
  eIsenabled?: boolean;
}
// 定义用户角色类型
export interface Role {
  rId?: number;
  rName?: string;
  rInfo?: string;
}
// 定义用户部门类型
export interface Dept {
  dName?: string;
}
// 定义用户数据类型
export interface UserData {
  emp: Emp;
  role: Role;
  dept: Dept;
}
// 该模块用于管理用户管理页的用户数据
export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  /*
  *状态
  */
  // 用户登陆状态
  const token = ref(localStorage.getItem('token') || '');
  // 单条用户数据及集合用于管理面板的修改
  const userData = ref<UserData>({
    emp: {} as Emp,
    role: {} as Role,
    dept: {} as Dept,
  });
  const emptyUserData = ref<UserData>({
    emp: {} as Emp,
    role: {} as Role,
    dept: {} as Dept,
  });
  const tableData = ref<UserData[]>([]);
  // 用户数据体 这里用于登录的帐号 显示数据
  const myData = ref<UserData>({
    emp: {} as Emp,
    role: {} as Role,
    dept: {} as Dept,
  });
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
  // 用户修改及添加的一些状态
  const options1 = ref([
    { label: '管理部', value: '46' },
    { label: '区域管制部', value: '47' },
    { label: '塔台管制部', value: '48' },
  ])
  const options2 = ref([
    { label: '男', value: '0' },
    { label: '女', value: '1' },
  ])
  const options3 = ref([
    { label: '超级管理员', value: '1' },
    { label: '管理员', value: '2' },
    { label: '普通用户', value: '3' },
  ])
  const options4 = ref([
    { label: '正常', value: '0' },
    { label: '禁用', value: '1' },
  ])
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
  const Nullfile1 = ref<UploadProps['value']>([]);
  const avatarUrl = ref(`${BASE_URL}/upload`);
  const uploadRef = ref<UploadInstanceFunctions>();
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
  // 用户添加表单规则
  const USERADD_FORM_RULES = {
    emp: {
      account: [{ required: true, message: '账户必填' }],
      password: [{ required: true, message: '密码必填' }],
      eid: [{ required: true, message: '身份证号必填' }],
      phone: [{ required: true, message: '手机号必填' }],
      deptid: [{ required: true, message: '部门必填' }],
    },
    role: {
      rid: [{ required: true, message: '角色必填' }],
    },
  };
  // 用户添加表单
  const userAddFormData: FormProps['data'] = reactive({
    emp: {
      account: '',
      password: '',
      name: '',
      eid: '',
      phone: '',
      deptid: '',
      isEnabled: '',
      age: '',
      gender: '',
    },
    role: {
      rid: ''
    },
  });
  // 空的用户添加表单 用于清空表单输入
  const NulluserAddFormData = {
    emp: {
      account: '',
      password: '',
      name: '',
      eid: '',
      phone: '',
      deptid: '',
      isEnabled: '',
      age: '',
      gender: '',
    },
    role: {
      rid: ''
    },
  }
  // 用户修改表单规则
  const USERDATA_FORM_RULES = {};
  // 用户修改表单
  const userDataFormData: FormProps['data'] = reactive({
    emp: {
      account: null,
      password: null,
      name: null,
      eid: null,
      phone: null,
      deptid: null,
      isEnabled: null,
      age: null,
      gender: null,
    },
    role: {
      rid: null
    },
  });
  // 空的用户修改表单 用于清空表单输入
  const NulluserDataFormData = {
    emp: {
      account: null,
      password: null,
      name: null,
      eid: null,
      phone: null,
      deptid: null,
      isEnabled: null,
      age: null,
      gender: null,
    },
    role: {
      rid: null
    },
  }
  // 个人信息修改
  const MYDATA_FORM_RULES = {};
  const myDataFormData: FormProps['data'] = reactive({
    emp: {
      account: null,
      password: null,
      name: null,
      eid: null,
      phone: null,
      age: null,
      gender: null,
      avatar:null,
    },
  });
  const NullmyDataFormData = {
    emp: {
      account: null,
      password: null,
      name: null,
      eid: null,
      phone: null,
      age: null,
      gender: null,
      avatar:null,
    },
  }
  /*
  *动作
  */
  // 用户数据查找
  const searchUser = async () => {
    const response = await fetchUserDataBySearch({
      [searchCondition.value]: searchInput.value,
    });
    if (response.code == 1) {
      tableData.value = response.result;
    } else {
      MessagePlugin.error(response.msg);
    }
  };
  // 用户分页数据获取
  const handlePageChange = async () => {
    const response = await fetchUserDataPages(current.value, pageSize.value);
    if (response.code == 1) {
      tableData.value = response.result.rows;
      total.value = response.result.total;
    } else {
      MessagePlugin.error(response.msg);
    }
  };
  // 批量删除用户
  const handleBatchDelete = async () => {
    if (selectedIds.value.length === 0) {
      MessagePlugin.warning('请先选择要删除的用户');
      return;
    }
    const msg = MessagePlugin.loading('批量删除中')
    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await deleteUsers(selectedIds.value);
    if (response.code == 1) {
      MessagePlugin.close(msg);
      MessagePlugin.success('批量删除成功');
      handlePageChange();
    } else {
      MessagePlugin.close(response.msg);
    }
  };
  // 删除单条用户BY id
  const handleDelete = async (id: number) => {
    const msg = MessagePlugin.info('删除中');
    await new Promise(resolve => setTimeout(resolve, 200));
    const response = await deleteUser(id);
    if (response.code == 1) {
      MessagePlugin.close(msg);
      MessagePlugin.success('用户删除成功');
      handlePageChange();
    }
  };
  // 查询条件修改
  const clickHandler = (data: { content: string, value: string }) => {
    condition.value = data.content;
    searchCondition.value = data.value;
  };
  // 多选
  const handleSelectionChange = (selection: UserData[]) => {
    selectedIds.value = selection.map(item => item.emp?.id!);
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
      text: item.emp.id?.toString() || '',
      value: item.emp.id
    }));
  });
  // 头像上传回调
  const handleFail: UploadProps['onFail'] = ({ file }) => {
    MessagePlugin.error(`文件 ${file.name} 上传失败`);
  };
  const handleSuccess = (response: any, file: File) => {
    if (response.response.code == 1) {
      userData.value.emp.eAvatarpath = response.response.result;
    } else {
      MessagePlugin.error('头像上传失败: 响应格式不正确');
    }
  };

  const imageViewerProps = ref<UploadProps['imageViewerProps']>({
    closeOnEscKeydown: false,
  });
  // 头像大小限制
  const sizeLimit = ref<UploadProps['sizeLimit']>({
    size: 5500,
    unit: 'KB',
  });

  // 添加用户添加按钮
  const submitButton: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
      const user = {
        emp: {
          eUsername: userAddFormData.emp.account, ePassword: userAddFormData.emp.password,
          eId: userAddFormData.emp.eid, ePhone: userAddFormData.emp.phone,
          eName: userAddFormData.emp.name, eDeptid: userAddFormData.emp.deptid,
          eIsenabled: userAddFormData.emp.isEnabled, eAge: userAddFormData.emp.age,
          eGender: userAddFormData.emp.gender,
          eAvatarpath: userData.value.emp.eAvatarpath,
        },
        role: { rId: userAddFormData.role.rid }
      };
      const response = await addUser(user);
      if (response.code == 1) {
        MessagePlugin.success('添加用户成功');
        userAddFormData.value = JSON.parse(JSON.stringify(NulluserAddFormData));
        file1.value = Nullfile1.value;
        handlePageChange()
      } else {
        MessagePlugin.error('添加用户失败');
        userAddFormData.value = JSON.parse(JSON.stringify(NulluserAddFormData));
        file1.value = Nullfile1.value;
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
  // 手动登录提交按钮
  const loginOnSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    const msg = MessagePlugin.loading('登陆中')
    await new Promise(resolve => setTimeout(resolve, 200));
    if (validateResult === true) {
      const user = { eUsername: loginFormData.account, ePassword: loginFormData.password };
      const response = await userLogin(user);
      MessagePlugin.close(msg)
      if (response.code == 1) {
        token.value = response.result
        localStorage.setItem('token', response.result);
        MessagePlugin.success('登录成功');
        router.push('/home');
      } else {
        MessagePlugin.error(response.message);
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
      const msg = MessagePlugin.loading('自动登陆中')
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await userLoginBytoken(token);
      if (response.code == 1) {
        MessagePlugin.close(msg)
        MessagePlugin.success('登录成功');
        myData.value = response.result
        router.push('/home');
      } else {
        router.push('/login');
        MessagePlugin.error('登陆失败，token可能过期了');
      }
    }
  }
  // 登录用户数据刷新
  const updateLoginUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await userLoginBytoken(token);
      if (response.code == 1) {
        MessagePlugin.success('🎈🌼欢迎访问EFPS system！❤');
        myData.value = response.result
        router.push('/home');
      } else {
        MessagePlugin.error(response.msg);
        router.push('/login');
      }
    }
  }
  // 注册提交按钮
  const regOnSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    const msg = MessagePlugin.loading('注册中');
    await new Promise(resolve => setTimeout(resolve, 200));
    if (validateResult === true) {
      const user = { eUsername: regFormData.account, ePassword: regFormData.password, eId: regFormData.eid, ePhone: regFormData.phone };
      const response = await regUser(user);
      MessagePlugin.close(msg);
      console.log('响应结果', response);
      if (response.code == 1) {
        MessagePlugin.success('注册成功');
        token.value = response.result
        localStorage.setItem('token', response.result);
        router.push('/home');
      } else {
        MessagePlugin.error(response.msg);
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
  // 登出
  const logout = () => {
    token.value = '';
    localStorage.removeItem('token');
    router.push('/login');
  };
  // 修改用户提交按钮
  const saveButton = async () => {
    const user = {
      emp: {
        id: userData.value.emp.id, ePassword: userDataFormData.emp.password,
        eId: userDataFormData.emp.eid, ePhone: userDataFormData.emp.phone,
        eName: userDataFormData.emp.name, eDeptid: userDataFormData.emp.deptid,
        eIsenabled: userDataFormData.emp.isEnabled, eAge: userDataFormData.emp.age,
        eGender: userDataFormData.emp.gender,
        eAvatarpath: userData.value.emp.eAvatarpath,
      },
      role: { rId: userDataFormData.role.rid }
    };
    const response = await updateUser(user);
    if (response.code == 1) {
      MessagePlugin.success('用户信息更新成功');
      userDataFormData.value = JSON.parse(JSON.stringify(NulluserDataFormData));
      file1.value = Nullfile1.value;
      handlePageChange()
    } else {
      MessagePlugin.warning('用户信息更新失败');
      userDataFormData.value = JSON.parse(JSON.stringify(NulluserDataFormData));
      file1.value = Nullfile1.value;
    }
  }
  // 修改个人信息头像
  const myInfoEditHandleSuccess = (response: any, file: File) => {
    // 确保响应格式符合预期
    if (response.response.code == 1) {
      myDataFormData.emp.eAvatarpath = response.response.result;
      console.log('头像上传成功:', response.response.result);
    } else {
      console.error('Unexpected upload response format:', response.response);
      MessagePlugin.error('头像上传失败: 响应格式不正确');
    }
  };
  // 清除用户信息缓存
  const cleanUserData = () => {
    userData.value = emptyUserData.value;
  }
  // 修改个人信息
  const saveMyInfoButton = async()=>{
    const user = {
      emp: {
        id: myData.value.emp.id, ePassword: myDataFormData.emp.password,
        eId: myDataFormData.emp.eid, ePhone: myDataFormData.emp.phone,
        eName: myDataFormData.emp.name,eAge: myDataFormData.emp.age,
        eGender: myDataFormData.emp.gender,
        eAvatarpath: myDataFormData.emp.avatar,
      },
      role: { rId: myData.value.role.rId }
    };
    const response = await updateUser(user);
    if (response.code == 1) {
      MessagePlugin.success('用户信息更新成功');
      autoLogin()
      handlePageChange()
    } else {
      MessagePlugin.warning('用户信息更新失败');
    }
  }



  return {
    // 状态
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
    uploadRef,
    myData,
    options1,
    options2,
    userDataFormData,
    USERDATA_FORM_RULES,
    options3,
    options4,
    NulluserDataFormData,
    NulluserAddFormData,
    userAddFormData,
    USERADD_FORM_RULES,
    myDataFormData,
    MYDATA_FORM_RULES,
    NullmyDataFormData,

    // 方法
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
    handleSuccess,
    updateLoginUserData,
    myInfoEditHandleSuccess,
    cleanUserData,
    saveMyInfoButton,

  };
});
