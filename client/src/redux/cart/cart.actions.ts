import {createAsyncThunk} from "@reduxjs/toolkit";
import {CartRequestView} from "../../modules/cart/models/CartRequestView";
import {CartService} from "../../modules/cart/services/CartService";
import {CartResponseView} from "../../modules/cart/models/CartResponseView";
import {AuthUtil} from "../../util/AuthUtil";

export const createCartAction: any = createAsyncThunk("cart/createCartAction",
    async (payload: { cart: CartRequestView }, {rejectWithValue}): Promise<{ data: CartResponseView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {cart} = payload;
                const response = await CartService.createCart(cart);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const getCartInfoAction: any = createAsyncThunk("cart/getCartInfoAction",
    async (payload: {}, {rejectWithValue}): Promise<{ data: CartResponseView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const response = await CartService.getCartInfo();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });