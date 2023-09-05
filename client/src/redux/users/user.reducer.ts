import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {UserView} from "../../modules/users/models/UserView";
import * as userActions from "./users.actions";
import {ToastUtil} from "../../util/ToastUtil";
import {TokenUtil} from "../../util/TokenUtil";
import {AddressView} from "../../modules/users/models/AddressView";

export const userFeatureKey = "userFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    user: UserView;
    token: string;
    isAuthenticated: boolean;
    address: AddressView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    user: {} as UserView,
    token: "",
    isAuthenticated: false,
    address: {} as AddressView
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {
        userLogOutAction: (state, action) => {
            state.isAuthenticated = false;
            state.user = {} as UserView;
            TokenUtil.deleteToken(); // remove token from session storage
            ToastUtil.displaySuccessToast("LogOut is Success!");
        }
    },
    extraReducers: (builder) => {

        builder.addCase(userActions.registerUserAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast("Registration is Success");
        }).addCase(userActions.registerUserAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast(action.payload.msg);
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.payload.msg
            }
        })


        builder.addCase(userActions.loginUserAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            state.isAuthenticated = true;
            TokenUtil.saveToken(action.payload.token); // save token to session storage
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {} as UserView;
            TokenUtil.deleteToken(); // remove token from session storage
            ToastUtil.displayErrorToast(action.payload.msg);
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(userActions.getUserDataAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.getUserDataAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data;
        }).addCase(userActions.getUserDataAction.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {} as UserView;
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(userActions.updateProfilePictureAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.updateProfilePictureAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.updateProfilePictureAction.rejected, (state, action) => {
            state.loading = false;
            state.user = {} as UserView;
            ToastUtil.displayErrorToast("Update Profile Picture is failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(userActions.changePasswordAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.changePasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.changePasswordAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Change Password is failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(userActions.createNewAddressAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.createNewAddressAction.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload.data;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.createNewAddressAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Address Creation is failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })



        builder.addCase(userActions.updateAddressAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.updateAddressAction.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload.data;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.updateAddressAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Address Update is failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(userActions.getAddressAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.getAddressAction.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload.data;
        }).addCase(userActions.getAddressAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(userActions.deleteAddressAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.deleteAddressAction.fulfilled, (state, action) => {
            state.loading = false;
            state.address = {} as AddressView;
            ToastUtil.displayInfoToast(action.payload.msg);
        }).addCase(userActions.deleteAddressAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Unable to delete address!");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })
    }
})
export const {userLogOutAction} = userSlice.actions;













