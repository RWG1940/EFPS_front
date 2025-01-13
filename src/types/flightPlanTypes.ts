export interface FlightPlan {
    id:number;
    flightNumber:string;
    aircraftType:string;
    departureAirport:string;
    arrivalAirport:string;
    scheduledDepartureTime:string;
    scheduledArrivalTime:string;
    actualDepartureTime:string;
    actualArrivalTime:string;
    gate:string;
    stand:string;
    status:string;
    createdAt:string;
    updatedAt:string;
    remarks:string;
}