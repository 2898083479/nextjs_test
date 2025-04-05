export interface Order {
    id: string;
    merchantId: string;
    goodName: string;
    totalPrice: number;
    destination: string;
    orderCreateTime: string;
}