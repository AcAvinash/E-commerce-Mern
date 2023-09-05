import axios from "axios";
import {ProductRequestView} from "../models/ProductRequestView";
import {ProductView} from "../models/ProductView";
import {ProductResponseView} from "../models/ProductResponseView";

export class ProductService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";


    public static createProduct(product: ProductRequestView): Promise<{ data: { data: ProductView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/products/`;
        return axios.post(dataUrl, product);
    }

    public static updateProduct(product: ProductRequestView, productId: string): Promise<{ data: { data: ProductView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/products/${productId}`;
        return axios.put(dataUrl, product);
    }


    public static getAllProducts(): Promise<{ data: { data: ProductResponseView[], msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/products`;
        return axios.get(dataUrl);
    }


    public static getProduct(productId: string): Promise<{ data: { data: ProductResponseView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/products/${productId}`;
        return axios.get(dataUrl);
    }


    public static deleteProduct(productId: string): Promise<{ data: { data: ProductView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/products/${productId}`;
        return axios.delete(dataUrl);
    }


    public static getAllProductsWithCategoryId(categoryId: string): Promise<{ data: { data: ProductResponseView[], msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/products/categories/${categoryId}`;
        return axios.get(dataUrl);
    }
}