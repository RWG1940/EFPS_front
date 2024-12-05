export interface SysMsgData {
    id?: number;
    header?: string;
    content?: string;
    createtime?: string;
    updatetime?: string;
    status?: number;
    author?: string;
    theme?: string;
}
// 1、临时可移除消息 2、系统锁定消息
export const sysMsgStatusOptions = [
    { label: '临时可移除消息', value: 1 },
    { label: '系统锁定消息', value: 2 },
];