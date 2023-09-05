import {createAsyncThunk} from "@reduxjs/toolkit";
import {CategoryService} from "../../modules/categories/services/CategoryService";
import {CategoryRequestView} from "../../modules/categories/models/CategoryRequestView";
import {CategoryResponseView} from "../../modules/categories/models/CategoryResponseView";
import {AuthUtil} from "../../util/AuthUtil";

export const createCategoryAction: any = createAsyncThunk("categories/createCategoryAction",
    async (payload: { category: CategoryRequestView }, {rejectWithValue}): Promise<{ data: CategoryResponseView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {category} = payload;
                const response = await CategoryService.createCategory(category);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const createSubcategoryAction: any = createAsyncThunk("categories/createSubcategoryAction",
    async (payload: { category: CategoryRequestView, categoryId: string }, {rejectWithValue}): Promise<{ data: CategoryResponseView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {category, categoryId} = payload;
                const response = await CategoryService.createSubCategory(category, categoryId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const getAllCategoriesAction: any = createAsyncThunk("categories/getAllCategoriesAction",
    async (payload: {}, {rejectWithValue}): Promise<{ data: CategoryResponseView[], msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const response = await CategoryService.getAllCategories();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });