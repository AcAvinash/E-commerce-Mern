import axios from "axios";
import {OrderRequestView} from "../models/OrderRequestView";
import {OrderResponseView} from "../models/OrderResponseView";

export class OrderService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";


    public static placeAnOrder(order: OrderRequestView): Promise<{ data: { data: OrderRequestView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/orders/place`;
        return axios.post(dataUrl, order);
    }


    public static getAllOrders(): Promise<{ data: { data: OrderResponseView[], msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/orders/all`;
        return axios.get(dataUrl);
    }


    public static getMyOrders(): Promise<{ data: { data: OrderResponseView[], msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/orders/me`;
        return axios.get(dataUrl);
    }


    public static updateOrderStatus(orderStatus: string, orderId: string): Promise<{ data: { data: OrderResponseView[], msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/orders/${orderId}`;
        return axios.post(dataUrl, {orderStatus: orderStatus});
    }


}