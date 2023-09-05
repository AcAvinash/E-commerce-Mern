import React, {useEffect} from 'react';
import './App.css';
import ToastConfig from "./modules/ui/components/toast-config/ToastConfig";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./modules/layout/pages/home/HomePage";
import FashionCatalogue from "./modules/products/pages/catalogues/fashion/FashionCatalogue";
import ElectronicsCatalogue from "./modules/products/pages/catalogues/electronics/ElectronicsCatalogue";
import HouseholdCatalogue from "./modules/products/pages/catalogues/household/HouseholdCatalogue";
import UploadProducts from "./modules/products/pages/upload-product/UploadProducts";
import AddCategory from "./modules/categories/pages/add-category/AddCategory";
import ManageProducts from "./modules/products/pages/manage-product/ManageProducts";
import ManageOrders from "./modules/orders/pages/manage-orders/ManageOrders";
import CartPage from "./modules/cart/pages/cart-page/CartPage";
import CheckOutPage from "./modules/cart/pages/checkout-page/CheckOutPage";
import UserProfile from "./modules/users/pages/user-profile/UserProfile";
import UserRegister from "./modules/users/pages/user-register/UserRegister";
import UserLogin from "./modules/users/pages/user-login/UserLogin";
import ChangePassword from "./modules/users/pages/user-password/ChangePassword";
import MyOrders from "./modules/orders/pages/my-orders/MyOrders";
import PageNotFound from "./modules/ui/components/page-not-found/PageNotFound";
import * as userActions from "./redux/users/users.actions";
import {AppDispatch, useAppDispatch} from "./redux/store";
import AddShippingAddress from "./modules/users/pages/shipping-address/AddShippingAddress";
import EditShippingAddress from "./modules/users/pages/shipping-address/EditShippingAddress";
import ViewProducts from "./modules/products/pages/view-product/ViewProducts";
import OrderDetails from "./modules/orders/pages/order-details/OrderDetails";
import EditProducts from "./modules/products/pages/edit-product/EditProducts";


function App() {
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.getUserDataAction());
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <ToastConfig/>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/products/fashion'} element={<FashionCatalogue/>}/>
                    <Route path={'/products/electronics'} element={<ElectronicsCatalogue/>}/>
                    <Route path={'/products/household'} element={<HouseholdCatalogue/>}/>
                    <Route path={'/products/upload'} element={<UploadProducts/>}/>
                    <Route path={'/products/admin'} element={<ManageProducts/>}/>
                    <Route path={'/products/edit/:productId'} element={<EditProducts/>}/>
                    <Route path={'/products/view/:categoryName/:productId'} element={<ViewProducts/>}/>
                    <Route path={'/categories/add'} element={<AddCategory/>}/>
                    <Route path={'/orders/admin'} element={<ManageOrders/>}/>
                    <Route path={'/orders/details'} element={<OrderDetails/>}/>
                    <Route path={'/cart/list'} element={<CartPage/>}/>
                    <Route path={'/cart/checkout'} element={<CheckOutPage/>}/>
                    <Route path={'/users/profile'} element={<UserProfile/>}/>
                    <Route path={'/users/register'} element={<UserRegister/>}/>
                    <Route path={'/users/change-password'} element={<ChangePassword/>}/>
                    <Route path={'/users/add-shipping-address'} element={<AddShippingAddress/>}/>
                    <Route path={'/users/edit-shipping-address/:addressId'} element={<EditShippingAddress/>}/>
                    <Route path={'/users/orders/me'} element={<MyOrders/>}/>
                    <Route path={'/users/login'} element={<UserLogin/>}/>
                    <Route path={'*'} element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
