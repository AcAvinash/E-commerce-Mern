import axios from 'axios';
import {UserView} from "../models/UserView";
import {AddressView} from "../models/AddressView";

export class UserService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";


    public static registerUser(user: UserView): Promise<{ data: { data: null, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/users/register`;
        return axios.post(dataUrl, user);
    }


    public static loginUser(user: UserView): Promise<{ data: { data: UserView, msg: string, token: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/users/login`;
        return axios.post(dataUrl, user);
    }


    public static getUserData(): Promise<{ data: { data: UserView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/users/me`;
        return axios.get(dataUrl);
    }


    public static updateProfilePicture(imageUrl: string): Promise<{ data: { data: UserView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/users/profile`;
        return axios.post(dataUrl, {imageUrl: imageUrl});
    }


    public static changePassword(password: string): Promise<{ data: { data: UserView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/users/change-password`;
        return axios.post(dataUrl, {password: password});
    }


    public static createNewAddress(address: AddressView): Promise<{ data: { data: AddressView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/addresses/new`;
        return axios.post(dataUrl, address);
    }


    public static updateAddress(address: AddressView, addressId: string): Promise<{ data: { data: AddressView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/addresses/${addressId}`;
        return axios.put(dataUrl, address);
    }


    public static getAddressInfo(): Promise<{ data: { data: AddressView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/addresses/me`;
        return axios.get(dataUrl);
    }


    public static deleteAddress(addressId: string): Promise<{ data: { data: AddressView, msg: string, status: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/addresses/${addressId}`;
        return axios.delete(dataUrl);
    }
}