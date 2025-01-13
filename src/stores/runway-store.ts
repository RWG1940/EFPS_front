import { createCRUDStore } from "./utils/createCRUDStore";
import { runwayApi } from "@/api/services/runway-api";
import { ref, computed } from "vue";
import type { RunwayData } from '@/types/runwayTypes'

export const useRunwayStore = createCRUDStore('runway', runwayApi)
export const runwayStore = useRunwayStore()

export const runwayAddFormData = ref<RunwayData>({})

export const search = ref()
export const filteredRunwayTableData = computed(() => {
    return runwayStore.data.filter((runway: any) =>
        !search.value ||
        runway.code.toLowerCase().includes(search.value.toLowerCase())
        ||
        runway.surfaceType.toLowerCase().includes(search.value.toLowerCase())
    )
})
export const runwayTableData = computed(() => {
    return filteredRunwayTableData.value.filter((runway: any) =>
        2>0
    )as RunwayData[]
})