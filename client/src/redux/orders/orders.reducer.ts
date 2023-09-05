import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {OrderResponseView} from "../../modules/orders/models/OrderResponseView";
import * as userActions from "../users/users.actions";
import {ToastUtil} from "../../util/ToastUtil";
import * as orderActions from "./orders.actions";
import {OrderReduxService} from "./OrderReduxService";

export const orderFeatureKey = "orderFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    orderProduct: OrderResponseView;
    orderProducts: OrderResponseView[];
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    orderProduct: {} as OrderResponseView,
    orderProducts: [] as OrderResponseView[]
};

export const orderSlice = createSlice({
    name: "orderSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(orderActions.placeOrderAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(orderActions.placeOrderAction.fulfilled, (state, action) => {
            state.loading = false;
            state.orderProduct = action.payload.data;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(orderActions.placeOrderAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Place order is failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(orderActions.getAllOrdersAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(orderActions.getAllOrdersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.orderProducts = OrderReduxService.convertToNewOrderResponseArray(action.payload.data);
        }).addCase(orderActions.getAllOrdersAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Get All Orders is failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(orderActions.getMyOrdersAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(orderActions.getMyOrdersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.orderProducts = OrderReduxService.convertToNewOrderResponseArray(action.payload.data);
        }).addCase(orderActions.getMyOrdersAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Get My Orders is failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(orderActions.updateOrderStatusAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(orderActions.updateOrderStatusAction.fulfilled, (state, action) => {
            state.loading = false;
            state.orderProducts = action.payload.data;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(orderActions.updateOrderStatusAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Update Order status is failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })
    }
});









