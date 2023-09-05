import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProductRequestView} from "../../modules/products/models/ProductRequestView";
import {ProductService} from "../../modules/products/services/ProductService";
import {ProductView} from "../../modules/products/models/ProductView";
import {ProductResponseView} from "../../modules/products/models/ProductResponseView";
import {AuthUtil} from "../../util/AuthUtil";

export const createProductAction: any = createAsyncThunk("products/createProductAction",
    async (payload: { product: ProductRequestView }, {rejectWithValue}): Promise<{ data: ProductView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {product} = payload;
                const response = await ProductService.createProduct(product);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const updateProductAction: any = createAsyncThunk("products/updateProductAction",
    async (payload: { product: ProductRequestView, productId: string }, {rejectWithValue}): Promise<{ data: ProductView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {product, productId} = payload;
                const response = await ProductService.updateProduct(product, productId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const getAllProductsAction: any = createAsyncThunk("products/getAllProductsAction",
    async (payload: {}, {rejectWithValue}): Promise<{ data: ProductResponseView[], msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const response = await ProductService.getAllProducts();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const getProductAction: any = createAsyncThunk("products/getProductAction",
    async (payload: { productId: string }, {rejectWithValue}): Promise<{ data: ProductResponseView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {productId} = payload;
                const response = await ProductService.getProduct(productId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const deleteProductAction: any = createAsyncThunk("products/deleteProductAction",
    async (payload: { productId: string }, {rejectWithValue}): Promise<{ data: ProductView, msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {productId} = payload;
                const response = await ProductService.deleteProduct(productId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const getAllProductsWithCategoryIdAction: any = createAsyncThunk("products/getAllProductsWithCategoryIdAction",
    async (payload: { categoryId: string }, {rejectWithValue}): Promise<{ data: ProductResponseView[], msg: string, status: string } | any> => {
        try {
            if (AuthUtil.setTokenToRequestHeader()) { // PRIVATE
                const {categoryId} = payload;
                const response = await ProductService.getAllProductsWithCategoryId(categoryId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });