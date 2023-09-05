import axios from "axios";
import {CartRequestView} from "../models/CartRequestView";
import {CartResponseView} from "../models/CartResponseView";

export class CartService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    /**
     * @usage : create a Cart
     * @url : http://localhost:9000/api/carts/
     * @params :products[{product, count,price}],total,tax,grandTotal
     * @method : POST
     * @access : PRIVATE
     */
    public static createCart(cart: CartRequestView): Promise<{ data: { data: CartResponseView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/carts/`;
        return axios.post(dataUrl, cart);
    }

    /**
     * @usage : get Cart Info
     * @url : http://localhost:9000/api/carts/me
     * @params : no-params
     * @method : GET
     * @access : PRIVATE
     */
    public static getCartInfo(): Promise<{ data: { data: CartResponseView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/carts/me`;
        return axios.get(dataUrl);
    }
}