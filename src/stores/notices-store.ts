import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import type { TableColumnCtx } from 'element-plus'
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { UploadInstanceFunctions, DropdownProps, UploadProps, FormProps } from 'tdesign-vue-next';
import { fetchNoticesData, fetchNoticesDataPages, fetchNoticesDataBySearch, deleteNotices, updateNotices, addNotice } from '@/api/services/notices-api';

// 定义Notices数据类型
export interface NoticesData {
    id?: number;
    header?: string;
    content?: string;
    status?: number;
    author?: string;
    createtime?: string;
    updatetime?: string;
}
export const useNoticesStore = defineStore('notices', () => {
    /*
    * 属性
    */
    // Notices数据体
    const noticesData = ref<NoticesData[]>([]);
    // Notices单条数据
    const noticeData = ref<NoticesData>({});
    // Notices单条空数据
    const emptyNoticesData = ref<NoticesData>({});
    // Notices分页数据体
    const noticesDataPages = ref<NoticesData[]>([]);
    // Notices分页数据总数
    const noticesDataPagesTotal = ref<number>(0);
    // Notices分页数据当前页
    const noticesDataPagesCurrent = ref<number>(1);
    // Notices分页数据每页数据条数
    const noticesDataPagesSize = ref<number>(10);
    // 添加、修改Notice表单数据
    const noticeAddFormData = ref<NoticesData>({});

    const noticeADD_FORM_RULES = {
        header: [{ required: true, message: '标题必填' }],
        content: [{ required: true, message: '内容必填' }],
        author: [{ required: true, message: '请输入作者' }],
        status: [{ required: true, message: '请选择状态' }],
    }
    const noticeEditFormData = ref<NoticesData>({});
    const noticeEDIT_FORM_RULES = {
        header: [{ required: true, message: '标题必填' }],
        content: [{ required: true, message: '内容必填' }],
        author: [{ required: true, message: '请输入作者' }],
        status: [{ required: true, message: '请选择状态' }],
    }
    const noticeStatusOptions = [
        { label: '已发布', value: 1 },
        { label: '审核中', value: 0 },
    ]
    const selectedIds = ref<number[]>([]);
    const search = ref('')
    // 过滤出已发布的航班动态数据
    const noticesDataPublished = computed(() => {
        return noticesData.value.filter(item => item.status == 1);
    })
    /*
    * 方法
    */
    // 获取所有Notice数据
    const fetchAllNoticesData = async () => {
        await fetchNoticesData().then((resp) => {
            noticesData.value = resp.data.result;
        })
    }
    // 获取Notice分页数据
    const fetchNoticesDataPagesData = async (page: number, pageSize: number) => {
        await fetchNoticesDataPages(page, pageSize).then((resp) => {
            noticesDataPages.value = resp.data.result.list;
            noticesDataPagesTotal.value = resp.data.result.total;
            noticesDataPagesCurrent.value = resp.data.result.page;
        })
    }
    // 根据搜索条件获取Notice数据
    const fetchNoticesDataBySearchData = async (notices: any) => {
        await fetchNoticesDataBySearch(notices).then((resp) => {
            noticesData.value = resp.data.result;
        })
    }
    // 删除Notice数据
    const deleteNoticesData = async (ids: number[]) => {
        console.log(ids)
        await deleteNotices(ids).then(() => {
            fetchAllNoticesData();
            MessagePlugin.success("删除成功");
        });
    }
    // 更新Notice数据
    const updateNoticeData = async (notices: NoticesData) => {
        await updateNotices(notices).then(() => {
            fetchAllNoticesData();
            MessagePlugin.success("更新成功");
        });
    }
    // 添加Notice数据
    const addNoticeData = async (noticeData: NoticesData) => {
        await addNotice(noticeData).then(() => {
            fetchAllNoticesData();
            MessagePlugin.success("添加成功");
        });
    }
    // 添加Notice数据提交添加 验证
    const addNoticeSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
        if (validateResult === true) {
            await addNoticeData(noticeAddFormData.value);
        } else {
            console.log('Validate Errors: ', firstError, validateResult);
            if (firstError) {
                MessagePlugin.warning(firstError);
            } else {
                MessagePlugin.warning('验证失败');
            }
        }
    };
    // 更新Notice数据提交修改 验证
    const editNoticeSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
        if (validateResult === true) {
            await updateNoticeData(noticeEditFormData.value);
        } else {
            console.log('Validate Errors: ', firstError, validateResult);
            if (firstError) {
                MessagePlugin.warning(firstError);
            }
        }
    }
    // 删除过期的Notice数据
    const deleteExpiredNoticesData = async () => {
        // 过期时间 当前时间减去24小时
        const expirationTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const expiredIds: number[] = [];
        noticesData.value.forEach((trend) => {
            const createTime = trend.createtime ? new Date(trend.createtime) : new Date();
            if (createTime < expirationTime) {
                expiredIds.push(trend.id!);
            }
        });
        // 如果有数据过期，则批量删除
        if (expiredIds.length > 0) {
            await deleteNoticesData(expiredIds).then(() => {
                MessagePlugin.success(`成功删除 ${expiredIds.length} 条过期数据`);
            })
        } else {
            MessagePlugin.info('没有找到过期数据');
        }
    };
    const deleteSelectedNoticesData = async () => {
        if (selectedIds.value.length === 0) {
            MessagePlugin.warning('请先选择要删除的数据');
        } else {
            await deleteNoticesData(selectedIds.value);
        }
    };
    // 多选
    const handleSelectionChange = (selection: NoticesData[]) => {
        selectedIds.value = selection.map(item => item.id!);
    };
    const filterTableData = computed(() =>
        noticesData.value.filter(
            (data) =>
                !search.value ||
                data.header?.toLowerCase().includes(search.value.toLowerCase()) ||
                data.content?.toLowerCase().includes(search.value.toLowerCase())


        )
    )


    return {
        noticesData,
        emptyNoticesData,
        noticesDataPages,
        noticesDataPagesTotal,
        noticesDataPagesCurrent,
        noticesDataPagesSize,
        noticeAddFormData,
        noticeADD_FORM_RULES,
        noticeEditFormData,
        noticeEDIT_FORM_RULES,
        fetchAllNoticesData,
        fetchNoticesDataPagesData,
        fetchNoticesDataBySearchData,
        deleteNoticesData,
        updateNoticeData,
        noticesDataPublished,
        noticeData,

        addNoticeData,
        addNoticeSubmit,
        editNoticeSubmit,
        deleteExpiredNoticesData,
        deleteSelectedNoticesData,
        handleSelectionChange,
        filterTableData,
        search,
        noticeStatusOptions

    }
})