export interface CategoryResponseView {
    _id: string;
    name: string;
    description: string;
    subCategories?: (SubCategoryView)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface SubCategoryView {
    _id?: string;
    name: string;
    description: string;
    __v?: number;
    isChecked?: boolean;
}
