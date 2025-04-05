export interface OrderResponse {
    id: string;
    merchantId: string;
    goodName: string;
    totalPrice: number;
    destination: string;
    orderCreateTime: string;
}

export interface OrderBody {
    merchantId: string;
    goodId: string;
    quantity: number;
    totalPrice: number;
    destination: string;
}