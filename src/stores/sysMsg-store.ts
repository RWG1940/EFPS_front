import { ref, reactive,computed } from 'vue';
import { createCRUDStore } from '@/stores/utils/createCRUDStore';
import { sysMsgsApi } from '@/api/services/sysMsg-api';
import type { SysMsgData} from '@/types/sysMsgTypes';


export const usesysMsgStore = createCRUDStore('sysMsg', sysMsgsApi);

// 更新表单
export const sysMsgUpdateFormRef = ref<SysMsgData>({});
// 添加表单
export const sysMsgAddFormRef = ref<SysMsgData>({});

export const sysMsgData = computed(() => {
    return usesysMsgStore().data as SysMsgData[];
})

