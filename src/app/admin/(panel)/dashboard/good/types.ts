export interface Good {
    goodId: string;
    name: string;
    source: string;
    category: string;
    status: string;
    price: number;
    count: number;
    image: string;
    createAt: string;
    updateAt: string;
}

export enum GoodCategory {
    SPICE = '香料',
    CARVING = '精雕',
    MEDICINE = '藥物',
    FURNITURE = '家具',
}

export enum GoodStatus {
    Pending = "待審核",
    Approved = "已批准",
    Rejected = "已拒絕",
}