import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserView} from "../../modules/users/models/UserView";
import {UserService} from "../../modules/users/services/UserService";
import {AddressView} from "../../modules/users/models/AddressView";
import {AuthUtil} from "../../util/AuthUtil";

export const registerUserAction: any = createAsyncThunk("users/registerUserAction",
    async (payload: { user: UserView }, {rejectWithValue}): Promise<{ data: null, msg: string, status: string } | any> => {
        try {
            const {user} = payload;
            const response = await UserService.registerUser(user);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const loginUserAction: any = createAsyncThunk("users/loginUserAction",
    async (payload: { user: UserView }, {rejectWithValue}): Promise<{ data: UserView, msg: string, token: string, status: string } | any> => {
        try {
            const {user} = payload;
            const response = await UserService.loginUser(user);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const getUserDataAction: any = createAsyncThunk("users/getUserDataAction",
    async (payload: {}, {rejectWithValue}): Promise<{ data: UserView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const response = await UserService.getUserData();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const updateProfilePictureAction: any = createAsyncThunk("users/updateProfilePictureAction",
    async (payload: { imageUrl: string }, {rejectWithValue}): Promise<{ data: UserView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {imageUrl} = payload;
                const response = await UserService.updateProfilePicture(imageUrl);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const changePasswordAction: any = createAsyncThunk("users/changePasswordAction",
    async (payload: { password: string }, {rejectWithValue}): Promise<{ data: UserView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {password} = payload;
                const response = await UserService.changePassword(password);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const createNewAddressAction: any = createAsyncThunk("users/createNewAddressAction",
    async (payload: { address: AddressView }, {rejectWithValue}): Promise<{ data: AddressView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE

                const {address} = payload;
                const response = await UserService.createNewAddress(address);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const updateAddressAction: any = createAsyncThunk("users/updateAddressAction",
    async (payload: { address: AddressView, addressId: string }, {rejectWithValue}): Promise<{ data: AddressView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE

                const {address, addressId} = payload;
                const response = await UserService.updateAddress(address, addressId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const getAddressAction: any = createAsyncThunk("users/getAddressAction",
    async (payload: {}, {rejectWithValue}): Promise<{ data: AddressView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const response = await UserService.getAddressInfo();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const deleteAddressAction: any = createAsyncThunk("users/deleteAddressAction",
    async (payload: { addressId: string }, {rejectWithValue}): Promise<{ data: AddressView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE

                const {addressId} = payload;
                const response = await UserService.deleteAddress(addressId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });