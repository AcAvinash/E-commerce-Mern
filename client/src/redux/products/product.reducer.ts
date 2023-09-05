import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {ProductResponseView} from "../../modules/products/models/ProductResponseView";
import * as userActions from "../users/users.actions";
import {ToastUtil} from "../../util/ToastUtil";
import * as productActions from "./products.actions";

export const productFeatureKey = "productFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    products: ProductResponseView[];
    product: ProductResponseView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    products: [] as ProductResponseView[],
    product: {} as ProductResponseView
};
export const productSlice = createSlice({
    name: 'productSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(productActions.createProductAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(productActions.createProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload.data;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(productActions.createProductAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Product creation is failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(productActions.updateProductAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(productActions.updateProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload.data;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(productActions.updateProductAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Product update is failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(productActions.getAllProductsAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(productActions.getAllProductsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data;
        }).addCase(productActions.getAllProductsAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Get all products failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(productActions.getProductAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(productActions.getProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload.data;
        }).addCase(productActions.getProductAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Get product failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(productActions.deleteProductAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(productActions.deleteProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload.data;
            ToastUtil.displayInfoToast(action.payload.msg);
        }).addCase(productActions.deleteProductAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Delete product failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(productActions.getAllProductsWithCategoryIdAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(productActions.getAllProductsWithCategoryIdAction.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data;
        }).addCase(productActions.getAllProductsWithCategoryIdAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Get all products with CategoryId failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })
    }
});

















