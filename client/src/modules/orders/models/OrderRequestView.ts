export interface OrderRequestView {
    _id?: string;
    products?: (OrderProduct)[] | null;
    total: number;
    tax: number;
    grandTotal: number;
    paymentType: string;
    orderStatus?: string;
    orderBy: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface OrderProduct {
    product: string;
    count: number;
    price: number;
    _id?: string;
}
