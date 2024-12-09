import { createCRUDStore } from "./utils/createCRUDStore";
import { flightInfoService } from "@/api/services/flightInfo-api";

export const useFlightInfoStore = createCRUDStore('flightInfo', flightInfoService)
export const flightInfoStore = useFlightInfoStore()