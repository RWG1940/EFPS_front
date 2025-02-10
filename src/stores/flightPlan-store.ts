import { flightPlanService } from "@/api/services/flightPlan-api";
import { createCRUDStore } from "./utils/createCRUDStore";
import { computed, ref } from "vue";
import type{ FlightPlan } from '@/types/flightPlanTypes'
import type { ReleaseGroundEfpsData } from '@/types/releaseGroundEfpsTypes';
import type { FlightInfo } from '@/types/flightInfoTypes';


export const useFlightPlanStore = createCRUDStore('flightPlan',flightPlanService)
export const flightPlanStore = useFlightPlanStore()

export const flightPlanData = computed(()=>{
    return flightPlanStore.dataPages as FlightPlan[]
})
export const searchAimData = ref<FlightPlan>({})
export const flightPlanAddFormData = ref<FlightPlan>({})
export const flightPlanEditFormData = ref<FlightPlan>({})
export const flightPlanTransferData = ref<FlightPlan>({})
export const efpsData = ref<ReleaseGroundEfpsData>({ })
export const flightInfoData = ref<FlightInfo>({})
export const flightPlanTransferDataGroup = ref<FlightPlan[]>([])
export const efpsDataGroup = ref<ReleaseGroundEfpsData[]>([])
export const flightInfoDataGroup = ref<FlightInfo[]>([])
