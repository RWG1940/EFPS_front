import { createCRUDStore } from "./utils/createCRUDStore";
import { parkingStandService } from "@/api/services/parkingStand-api";
import { ref,computed } from "vue";
import type{ ParkingStandData } from "@/types/parkingStandTypes";

export const useParkingStandStore = createCRUDStore("parkingStand", parkingStandService)
export const parkingStandStore = useParkingStandStore()

export const parkingStandAddFormData = ref<ParkingStandData>({})
export const parkingStandEditFormData = ref<ParkingStandData>({})
export const search = ref()
export const filteredParkingStandTableData = computed(() => {
    return parkingStandStore.data.filter((pks: any) =>
        !search.value ||
        pks.code.toLowerCase().includes(search.value.toLowerCase())
    )
})
export const parkingStandOptions = computed(() => {
    return parkingStandStore.data.map((pks: any) => {
        return {
            label: pks.code,
            value: pks.id
        }
    })
})