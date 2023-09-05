import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {
    CartNEWResponseView, TheProduct, UserObj
} from "../../modules/cart/models/CartResponseView";
import {ToastUtil} from "../../util/ToastUtil";
import * as cartActions from "./cart.actions";
import {CartReduxService} from "./CartReduxService";

export const cartFeatureKey = "cartFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    cartProduct: CartNEWResponseView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    cartProduct: {
        _id: "",
        products: [] as TheProduct[],
        total: "",
        tax: "",
        grandTotal: "",
        userObj: {} as UserObj,
        createdAt: "",
        updatedAt: "",
    } as CartNEWResponseView
};

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        addToCartAction: (state, action) => {
            const {product, count} = action.payload;
            state.cartProduct = CartReduxService.addToCartUtil(state.cartProduct, product, count);
        },
        deleteCartItemAction: (state, action) => {
            const {productId} = action.payload;
            state.cartProduct = CartReduxService.deleteProductItemUtil(state.cartProduct, productId);
        },
        incrProductQtyAction: (state, action) => {
            const {productId} = action.payload;
            state.cartProduct = CartReduxService.incrementProductQtyUtil(state.cartProduct, productId);
        },
        decrProductQtyAction: (state, action) => {
            const {productId} = action.payload;
            state.cartProduct = CartReduxService.decrementProductQtyUtil(state.cartProduct, productId);
        },
        clearCartAction: (state, action) => {
            state.cartProduct = {
                _id: "",
                products: [] as TheProduct[],
                total: "",
                tax: "",
                grandTotal: "",
                userObj: {} as UserObj,
                createdAt: "",
                updatedAt: "",
            } as CartNEWResponseView
        },
    },
    extraReducers: (builder) => {

        builder.addCase(cartActions.createCartAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(cartActions.createCartAction.fulfilled, (state, action) => {
            state.loading = false;
            state.cartProduct = action.payload.data;

            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(cartActions.createCartAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Create Cart is Failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(cartActions.getCartInfoAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(cartActions.getCartInfoAction.fulfilled, (state, action) => {
            state.loading = false;
            state.cartProduct = {
                _id: action.payload.data._id,
                products: CartReduxService.convertToProductNewResponseView(action.payload.data.products),
                total: action.payload.data.total,
                tax: action.payload.data.tax,
                grandTotal: action.payload.data.grandTotal,
                userObj: action.payload.data.userObj,
                createdAt: action.payload.data.createdAt,
                updatedAt: action.payload.data.updatedAt,
            }
        }).addCase(cartActions.getCartInfoAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Get Cart Info is Failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })
    }
});
export const {
    addToCartAction,
    decrProductQtyAction,
    incrProductQtyAction,
    deleteCartItemAction,
    clearCartAction
} = cartSlice.actions;














