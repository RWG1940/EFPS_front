export interface FlightPlan {
    id?:number;
    flightNumber?:string;
    aircraftType?:string;
    departureAirport?:string;
    arrivalAirport?:string;
    scheduledDepartureTime?:string;
    scheduledArrivalTime?:string;
    actualDepartureTime?:string;
    actualArrivalTime?:string;
    gate?:string;
    stand?:string;
    status?:string;
    createdAt?:string;
    updatedAt?:string;
    remarks?:string;
}
export const FlightPlanADD_FORM_RULES = {
    flightNumber: [
        { required: true, message: '请输入航班号', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    aircraftType: [
        { required: true, message: '请输入机型', trigger: 'blur' },
        { min: 3,max: 20, message: '长度在 3 到 20 个'},
    ],
    departureAirport: [
        { required: true, message: '请输入出发机场', trigger: 'blur' },
    ],
    arrivalAirport: [
        { required: true, message: '请输入到达机场', trigger: 'blur' },
    ],
}
export const FlightPlanEDIT_FORM_RULES = {
    flightNumber: [
        { required: true, message: '请输入航班号', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    aircraftType: [
        { required: true, message: '请输入机型', trigger: 'blur' },
    ]
}
export const FlightPlan_STATUS = [
    { label: '计划', value: 0 },
    { label: '已转单', value: 1 },
    { label: '延误', value: 2 },
    { label: '取消', value: 3 },


]
