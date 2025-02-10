export interface ParkingStandData {
    id?: number;
    code?: string;
    size?: string;
    status?: number;
    location?: string;
    remarks?: string;
    createdAt?: string;
    updatedAt?: string;
}
export const parkingStandEDIT_FORM_RULES = {
    code: [{ required: true, message: '停机坪编码不能为空', trigger: 'blur' }],
}
export const parkingStandADD_FORM_RULES = {
    code: [{ required: true, message: '停机坪编码不能为空', trigger: 'blur' }],
}