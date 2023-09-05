import axios from "axios";
import {CategoryRequestView} from "../models/CategoryRequestView";
import {CategoryResponseView} from "../models/CategoryResponseView";

export class CategoryService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";


    public static createCategory(category: CategoryRequestView): Promise<{ data: { data: CategoryResponseView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/categories/`;
        return axios.post(dataUrl, category);
    }



    public static createSubCategory(category: CategoryRequestView, categoryId: string): Promise<{ data: { data: CategoryResponseView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/categories/${categoryId}`;
        return axios.post(dataUrl, category);
    }


    public static getAllCategories(): Promise<{ data: { data: CategoryResponseView[], msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/categories/`;
        return axios.get(dataUrl);
    }
}