export interface ReleaseGroundEfpsData {
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
    b2?: string;
    b2Lhalf?: string;
    b2Rhalf?: string;
    c2?: string;
    c3?: string;
    de31?: string;
    de32?: string;
    de33?: string;
    de34?: string;
    e4?: string;
    b4?: string;
    c4?: string;
    m?: string;
    e?: string;
    a?: string;
    i?: string;
    createtime?: string;
    updatetime?: string;
}
// 表单验证规则
export const releaseGroundEfpsADD_FORM_RULES = {
    type: [{ required: true, message: '进程单类型不能为空', trigger: 'blur' }],
    status: [{ required: true, message: '进程单状态不能为空', trigger: 'blur' }],
    a1: [{ required: true, message: '航空器呼号不能为空', trigger: 'blur' }],
    b1: [{ required: true, message: '航空器机型不能为空', trigger: 'blur' }],
    c1: [{ required: true, message: '尾流标志不能为空', trigger: 'blur' }],
    h1: [{ required: true, message: '目的地机场不能为空', trigger: 'blur' }],
    fg1: [{ required: true, message: '预计起飞/降落时刻不能为空', trigger: 'blur' }],

}
// 进程单类型选项
export const releaseGroundEfpsTypeOptions = [
    { label: '进港', value: '1' },
    { label: '出港', value: '0' },
]
// 进程单状态选项
export const releaseGroundEfpsStatusOptions = [
    { label: '待处理', value: '1' },
    { label: '处理队列中', value: '2' },
    { label: '已移交', value: '3' },
    { label: '已完成', value: '4' },
    { label: '回收中', value: '5' },
    { label: '处理中', value: '6' }
]
// 尾流选项
export const releaseGroundEfpsWakeOptions = [
    { label: 'H', value: 'H' },//重型
    { label: 'M', value: 'M' },//中型
    { label: 'L', value: 'L' },//轻型
]
// 二次雷达应答机模式
export const releaseGroundEfpsSecondaryRadarOptions = [
    { label: 'N', value: 'N' },
    { label: 'A', value: 'A' },
    { label: 'C', value: 'C' },
    { label: 'X', value: 'X' },
    { label: 'P', value: 'P' },
    { label: 'I', value: 'I' },
    { label: 'S', value: 'S' },
    { label: 'D', value: 'D' },
]
// 高度变化状态选项
export const releaseGroundEfpsHightStatusOptions = [
    { label: '保持', value: '1' },
    { label: '离开上升', value: '2' },
    { label: '离开下降', value: '3' },
    { label: '场压保持', value: '4' },
    { label: '场压上升', value: '5' },
    { label: '场压下降', value: '6' },
]
// 进程单区域选项
export const releaseGroundEfpsAreaOptions = [
    { label: '标牌区', value: '1' },
    { label: '指令区', value: '2' },
    { label: '航路区', value: '3' },
    { label: '协调区', value: '4' },
]
// 标牌区选项
export const releaseGroundEfpsTagOptions = [
    { label: '航空器呼号', value: 'a1' },
    { label: '航空器机型', value: 'b1' },
    { label: '尾流标志', value: 'c1' },
    { label: '二次雷达应答机模式及编码', value: 'd1' },
    { label: '起飞机场', value: 'e1' },
    { label: '预计起飞/降落时刻', value: 'fg1' },
    { label: '目的地机场', value: 'h1' },
]
// 指令区选项
export const releaseGroundEfpsInstructionOptions = [
    { label: '高度变化', value: 'a2' },
    { label: '其他指令', value: 'b2' },
    { label: '申请的巡航高度层', value: 'c2' },
]
// 协调区选项
export const releaseGroundEfpsCoopOptions = [
    { label: '进程单生成日期和时刻', value: '1' },
    { label: '其他信息', value: '2' },
    { label: '航空器收到本场ATIS信息', value: '3' },
    { label: '对过境航班，拍发EST报', value: '4' },
    { label: '与空军协调完毕', value: '5' },
    { label: '航空器被雷达识别', value: '6' },
]
export const releaseGroundEfpsRouteOptions = [
    { label: '位置报告点名称1', value: 'a31' },
    { label: '位置报1', value: 'b31' },
    { label: '位置报告点名称2', value: 'a32' },
    { label: '位置报2', value: 'b32' },

]
export const programOptions = [
    { label: 'D01', value: 'D01' },
    { label: 'D02', value: 'D02' },
    { label: 'D03', value: 'D03' },
    { label: 'D04', value: 'D04' },
    { label: 'A05', value: 'A05' },
    { label: 'A06', value: 'A06' },
    { label: 'A07', value: 'A07' },
    { label: 'A08', value: 'A08' },
    { label: 'C09', value: 'C09' },
]
export const stopwayOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },

]
export const runwayOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
]