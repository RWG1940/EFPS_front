import { createCRUDStore } from "./utils/createCRUDStore";
import { flightInfoService } from "@/api/services/flightInfo-api";
import { computed } from "vue";
import type { FlightInfoData } from "@/types/flightInfoTypes";
import { ref } from "vue";

export const useFlightInfoStore = createCRUDStore('flightInfo', flightInfoService)
export const flightInfoStore = useFlightInfoStore()
export const flightInfoData = computed(() => {
    return flightInfoStore.data.filter((efps: any) => 2>0 )
    .sort((a: any, b: any) => {
        return new Date(a.scheduledDepartureTime).getTime() - new Date(b.scheduledDepartureTime).getTime();
    }) as FlightInfoData[];
});
export const searchAimData = ref<FlightInfoData>({})
export const flightInfoEditFormData = ref<FlightInfoData>({})