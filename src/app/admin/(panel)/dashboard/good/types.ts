export interface Good {
    id: string;
    name: string;
    source: string;
    category: string;
    price: number;
    count: number;
    policyId: string;
    storeId: string;
    createAt: string;
    updateAt: string;
}

export enum GoodCategory {
    SPICE = '香料',
    CARVING = '精雕',
    MEDICINE = '藥物',
    FURNITURE = '家具',
}