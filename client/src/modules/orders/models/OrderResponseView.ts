import {UserObj} from "../../cart/models/CartResponseView";

export interface OrderResponseView {
    _id: string;
    products: OrderProduct[];
    total: number;
    tax: number;
    grandTotal: number;
    paymentType: string;
    orderStatus: string;
    orderBy: UserObj;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface OrderServerResponseView {
    _id: string;
    products: OrderProductsEntity[];
    total: number;
    tax: number;
    grandTotal: number;
    paymentType: string;
    orderStatus: string;
    orderBy: UserObj;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface OrderProductsEntity {
    product: OrderProduct;
    count: number;
    price: number;
    _id: string;
}

export interface OrderProduct {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    brand: string;
    price: number;
    quantity: number;
    sold: number;
    count: number;
    userObj: string;
    categoryObj: string;
    subCategoryObj: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
