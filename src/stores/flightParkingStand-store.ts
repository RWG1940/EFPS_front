import { createCRUDStore } from "./utils/createCRUDStore";
import { flightParkingStandService } from "@/api/services/flightParkingStand-api";

export const  useFlightParkingStandStore = createCRUDStore('flightParkingStand', flightParkingStandService)
export const flightParkingStandStore = useFlightParkingStandStore()