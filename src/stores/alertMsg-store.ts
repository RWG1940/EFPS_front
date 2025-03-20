import { ref, reactive } from 'vue';
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { createCRUDStore } from '@/stores/utils/createCRUDStore';
import { alertMsgApi } from '@/api/services/alertMsg-api';
import type { AlertMsgData} from '@/types/alertMsgTypes';


export const useAlertMsgStore = createCRUDStore('alertMsg', alertMsgApi);

export const alertMsgStore = useAlertMsgStore();

export const addFormData = ref<AlertMsgData>({});
export const editFormData = ref<AlertMsgData>({});
export const alertMsgData = computed(() => {
    return alertMsgStore.data.filter((alertMsg: any) => alertMsg.status == 0 )
    .sort ((a: any, b: any) => {
        return new Date(b.createtime).getTime() - new Date(a.createtime).getTime();
    })as AlertMsgData[];
});