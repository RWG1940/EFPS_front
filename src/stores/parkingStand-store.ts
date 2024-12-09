import { createCRUDStore } from "./utils/createCRUDStore";
import { parkingStandService } from "@/api/services/parkingStand-api";

export const useParkingStandStore = createCRUDStore("parkingStand", parkingStandService)
export const parkingStandStore = useParkingStandStore()