import {createAsyncThunk} from "@reduxjs/toolkit";
import {OrderRequestView} from "../../modules/orders/models/OrderRequestView";
import {OrderService} from "../../modules/orders/services/OrderService";
import {OrderResponseView} from "../../modules/orders/models/OrderResponseView";
import {AuthUtil} from "../../util/AuthUtil";

export const placeOrderAction: any = createAsyncThunk("orders/placeOrderAction",
    async (payload: { order: OrderRequestView }, {rejectWithValue}): Promise<{ data: OrderRequestView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {order} = payload;
                const response = await OrderService.placeAnOrder(order);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const getAllOrdersAction: any = createAsyncThunk("orders/getAllOrdersAction",
    async (payload: {}, {rejectWithValue}): Promise<{ data: OrderResponseView[], msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const response = await OrderService.getAllOrders();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const getMyOrdersAction: any = createAsyncThunk("orders/getMyOrdersAction",
    async (payload: {}, {rejectWithValue}): Promise<{ data: OrderResponseView[], msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const response = await OrderService.getMyOrders();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const updateOrderStatusAction: any = createAsyncThunk("orders/updateOrderStatusAction",
    async (payload: { orderStatus: string, orderId: string }, {rejectWithValue}): Promise<{ data: OrderResponseView[], msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {orderStatus, orderId} = payload;
                const response = await OrderService.updateOrderStatus(orderStatus, orderId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });