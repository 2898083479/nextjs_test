export interface Good {
    id: string;
    name: string;
    source: string;
    category: string;
    price: number;
    count: number;
    policyId: string;
    storeId: string;
    createdAt: string;
    updatedAt: string;
}

export enum GoodCategory {
    SPICE = '香料',
    CARVING = '精雕',
    MEDICINE = '药物',
    FURNITURE = '家具',
}