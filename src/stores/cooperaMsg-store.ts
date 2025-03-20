import { ref, reactive } from 'vue';
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { createCRUDStore } from '@/stores/utils/createCRUDStore';
import { cooperaMsgApi } from '@/api/services/cooperaMsg-api';
import type { CooperaMsgData} from '@/types/cooperaMsgTypes';


export const usecooperaMsgStore = createCRUDStore('cooperaMsg', cooperaMsgApi);

export const cooperaMsgStore = usecooperaMsgStore();

export const addFormData = ref<CooperaMsgData>({});
export const editFormData = ref<CooperaMsgData>({});
export const cooperaMsgData = computed(() => {
    return cooperaMsgStore.data.filter((cooperaMsg: any) => cooperaMsg.status == 0 )
    .sort((a:any, b:any) => new Date(b.createtime).getTime() - new Date(a.createtime).getTime()) as CooperaMsgData[];
});