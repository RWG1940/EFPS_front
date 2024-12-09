import { createCRUDStore } from "./utils/createCRUDStore";
import { flightRunwayService } from "@/api/services/flightRunway-api";

export const useFlightRunwayStore = createCRUDStore(
    "flightRunway",
    flightRunwayService
);
export const flightRunwayStore = useFlightRunwayStore();