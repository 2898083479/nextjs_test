interface ShoppingCar {
    id: string;
    merchantId: string;
    goodId: string;
    goodName: string;
    price: number;
    quantity: number;
    addTime: string;
}

export type { ShoppingCar };