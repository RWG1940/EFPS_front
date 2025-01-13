import { flightPlanService } from "@/api/services/flightPlan-api";
import { createCRUDStore } from "./utils/createCRUDStore";
import { computed } from "vue";
import type{ FlightPlan } from '@/types/flightPlanTypes'


export const useFlightPlanStore = createCRUDStore('flightPlan',flightPlanService)
export const flightPlanStore = useFlightPlanStore()

export const flightPlanData = computed(()=>{
    return flightPlanStore.dataPages as FlightPlan[]
})
