export interface FlightInfo {
    id?: number;
    flightNumber?: string;
    airline?: string;
    aircraftType?: string;
    departureAirport?: string;
    arrivalAirport?: string;
    scheduledDepartureTime?: string;
    scheduledArrivalTime?: string;
    actualDepartureTime?: string;
    actualArrivalTime?: string;
    position?: string;
}