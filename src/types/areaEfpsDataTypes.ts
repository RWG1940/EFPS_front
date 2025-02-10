export interface AreaEfpsData {
    id?: number;
    status?: number;
    type?: number;
    a1?: string;
    b1?: string;
    c1?: string;
    d1?: string;
    d1Lhalf?: string,
    d1Rhalf?: string,
    e1?: string;
    fg1?: string;
    h1?: string;
    a2?: string;
    b21?: string;
    b22?: string;
    b23?: string;
    b2Lhalf?: string;
    b2Rhalf?: string;
    c2?: string;
    a31?: string;
    a32?: string;
    a33?: string;
    a34?: string;
    a35?: string;
    a36?: string;
    b31?: string;
    b32?: string;
    b33?: string;
    b34?: string;
    b35?: string;
    b36?: string;
    a4?: string;
    b4?: string;
    c4?: string;
    m?: string;
    e?: string;
    a?: string;
    i?: string;
    createtime?: string;
    updatetime?: string;
}
export const areaEfpsADD_FORM_RULES = {
    type: [{ required: true, message: '进程单类型不能为空', trigger: 'blur' }],
    a1: [{ required: true, message: '航空器呼号不能为空', trigger: 'blur' }],
    status: [{ required: true, message: '进程单状态不能为空', trigger: 'blur' }],
    b1: [{ required: true, message: '航空器机型不能为空', trigger: 'blur' }],
    c1: [{ required: true, message: '尾流标志不能为空', trigger: 'blur' }],
    h1: [{ required: true, message: '目的地机场不能为空', trigger: 'blur' }],
    fg1: [{ required: true, message: '预计起飞/降落时刻不能为空', trigger: 'blur' }],
};
export const areaEfpsTypeOptions = [
    { label: '进港', value: '1' },
    { label: '出港', value: '0' },
]
// 进程单状态选项
export const areaEfpsStatusOptions = [
    { label: '待处理', value: '1' },
    { label: '处理队列中', value: '2' },
    { label: '已移交', value: '3' },
    { label: '已完成', value: '4' },
    { label: '回收中', value: '5' },
    { label: '处理中', value: '6' }
];
// 尾流选项
export const areaEfpsWakeOptions = [
    { label: 'H', value: 'H' },//重型
    { label: 'M', value: 'M' },//中型
    { label: 'L', value: 'L' },//轻型
];
// 二次雷达应答机模式
export const areaEfpsSecondaryRadarOptions = [
    { label: 'N', value: 'N' },
    { label: 'A', value: 'A' },
    { label: 'C', value: 'C' },
    { label: 'X', value: 'X' },
    { label: 'P', value: 'P' },
    { label: 'I', value: 'I' },
    { label: 'S', value: 'S' },
    { label: 'D', value: 'D' },
];
// 高度变化状态选项
export const areaEfpsHightStatusOptions = [ 
    { label: '保持', value: '1' },
    { label: '离开上升', value: '2' },
    { label: '离开下降', value: '3' },
    { label: '场压保持', value: '4' },
    { label: '场压上升', value: '5' },
    { label: '场压下降', value: '6' },
];
// 进程单区域选项
export const areaEfpsAreaOptions = [
    { label: '标牌区', value: '1' },
    { label: '指令区', value: '2' },
    { label: '航路区', value: '3' },
    { label: '协调区', value: '4' },
];
// 标牌区选项
export const areaEfpsTagOptions = [
    { label: '航空器呼号', value: 'a1' },
    { label: '航空器机型', value: 'b1' },
    { label: '尾流标志', value: 'c1' },
    { label: '二次雷达应答机模式及编码', value: 'd1' },
    { label: '起飞机场', value: 'e1' },
    { label: '预计起飞/降落时刻', value: 'fg1' },
    { label: '目的地机场', value: 'h1' },
];
// 指令区选项
export const areaEfpsInstructionOptions = [
    { label: '高度变化1', value: 'b21' },
    { label: '高度变化2', value: 'b22' },
    { label: '高度变化3', value: 'b23' },
    { label: '其他指令', value: 'c2' },
    { label: '申请的巡航高度层', value: 'a2' },
]
//航路区选项
export const areaEfpsRouteOptions = [
    { label: '位置报告点名称1', value: 'a31' },
    { label: '位置报1', value: 'b31' },
    { label: '位置报告点名称2', value: 'a32' },
    { label: '位置报2', value: 'b32' },
    { label: '位置报告点名称3', value: 'a33' },
    { label: '位置报3', value: 'b33' },
    { label: '位置报告点名称4', value: 'a34' },
    { label: '位置报4', value: 'b34' },
    { label: '位置报告点名称5', value: 'a35' },
    { label: '位置报5', value: 'b35' },
    { label: '位置报告点名称6', value: 'a36' },
    { label: '位置报6', value: 'b36' },
]
// 协调区选项
export const areaEfpsCoopOptions = [
    { label: '进程单生成日期和时刻', value: '1' },
    { label: '其他信息', value: '2' },
    { label: '航空器收到本场ATIS信息', value: '3' },
    { label: '对过境航班，拍发EST报', value: '4' },
    { label: '与空军协调完毕', value: '5' },
    { label: '航空器被雷达识别', value: '6' },
]
export const recordAreaOptions = [
    { label: '记录1', value: '1' },
    { label: '记录2', value: '2' },
    { label: '记录3', value: '3' },
    { label: '记录4', value: '4' },
    { label: '记录5', value: '5' },
    { label: '记录6', value: '6' },
]
export const instructionRecordOptions = [
    { label: '记录1', value: 'b21' },
    { label: '记录2', value: 'b22' },
    { label: '记录3', value: 'b23' },
]