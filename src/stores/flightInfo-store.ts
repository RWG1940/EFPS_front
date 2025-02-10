import { createCRUDStore } from "./utils/createCRUDStore";
import { flightInfoService } from "@/api/services/flightInfo-api";
import { computed } from "vue";
import type { FlightInfoData } from "@/types/flightInfoTyes";

export const useFlightInfoStore = createCRUDStore('flightInfo', flightInfoService)
export const flightInfoStore = useFlightInfoStore()
export const flightInfoData = computed(() => {
    return flightInfoStore.data.filter((efps: any) => 2>0 )as FlightInfoData[];
});