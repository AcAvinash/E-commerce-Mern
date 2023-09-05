export interface UserView {
    _id?: string;
    username?: string;
    email: string;
    password: string;
    imageUrl?: string;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}
