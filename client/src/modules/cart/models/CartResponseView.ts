export interface CartResponseView {
    _id?: string;
    products: ProductsEntity[];
    total: string;
    tax: string;
    grandTotal: string;
    userObj: UserObj;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface CartNEWResponseView {
    _id?: string;
    products: TheProduct[];
    total: string;
    tax: string;
    grandTotal: string;
    userObj: UserObj;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface ProductsEntity {
    product: TheProduct;
    count: number;
    price: number;
    _id?: string;
}

export interface TheProduct {
    _id: string;
    title: string;
    description: string;
    count: number;
    imageUrl: string;
    brand: string;
    price: number;
    quantity: number;
    sold: number;
    userObj: string;
    categoryObj: string;
    subCategoryObj: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface UserObj {
    _id: string;
    username: string;
    email: string;
    password: string;
    imageUrl: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
