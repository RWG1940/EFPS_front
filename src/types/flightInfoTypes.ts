export interface FlightInfoData {
    id?: number;                        // 主键ID
    flightNumber?: string;               // 航班号
    airline?: string;                    // 航空公司名称
    aircraftType?: string;               // 机型
    departureAirport?: string;           // 起飞机场三字码
    arrivalAirport?: string;             // 降落机场三字码
    scheduledDepartureTime?: string;     // 计划起飞时间
    scheduledArrivalTime?: string;       // 计划到达时间
    actualDepartureTime?: string;        // 实际起飞时间
    actualArrivalTime?: string;          // 实际到达时间
    route?: string;                      // 航路信息
    flightStatus?: number;               // 航班状态：0-计划中，1-起飞，2-降落，3-延误，4-取消，5-检入
    delayReason?: string;                // 延误原因
    altitude?: number;                   // 当前高度（单位：米）
    speed?: number;                      // 当前速度（单位：公里/小时）
    position?: string;                   // 当前经纬度坐标
    createtime?: string;                 // 创建时间
    updatetime?: string;                 // 更新时间
    remarks?: string;                    // 备注信息
}
export const FlightInfoEDIT_FORM_RULES = {
    flightNumber: [
        { required: true, message: '请输入航班号', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    aircraftType: [
        { required: true, message: '请输入机型', trigger: 'blur' },
    ]
}
export const FlightInfo_STATUS = [
    { label: '等待', value: 0 },
    { label: '起飞', value: 1 },
    { label: '降落', value: 2 },
    { label: '延误', value: 3 },
    { label: '取消', value: 4 },
]
