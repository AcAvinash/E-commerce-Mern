import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {CategoryResponseView} from "../../modules/categories/models/CategoryResponseView";
import * as userActions from "../users/users.actions";
import {ToastUtil} from "../../util/ToastUtil";
import * as categoryActions from "./categories.actions";

export const categoryFeatureKey = "categoryFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    categories: CategoryResponseView[];
    category: CategoryResponseView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    categories: [] as CategoryResponseView[],
    category: {} as CategoryResponseView,
};

export const categorySlice = createSlice({
    name: "categorySlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(categoryActions.createCategoryAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(categoryActions.createCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload.data;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(categoryActions.createCategoryAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Category Creation failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(categoryActions.createSubcategoryAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(categoryActions.createSubcategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload.data;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(categoryActions.createSubcategoryAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast(action.payload.msg);
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })


        builder.addCase(categoryActions.getAllCategoriesAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(categoryActions.getAllCategoriesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.data;
        }).addCase(categoryActions.getAllCategoriesAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Get all Categories failed");
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error
            }
        })
    }
});

















