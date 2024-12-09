export const runwayADD_FORM_RULES = {
    code: [{ required: true, message: '跑到编码不能为空', trigger: 'blur' }],
}
export interface RunwayData {
    id?:number;
    code?:string;
    length?:number;
    width?:number;
    surfaceType?:string;
    status?:number;
    remarks?:string;
    createdAt?:string;
    updatedAt?:string;
}