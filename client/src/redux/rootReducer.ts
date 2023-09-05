import {combineReducers} from "@reduxjs/toolkit";
import * as userReducer from "./users/user.reducer";
import * as categoryReducer from "./categories/categories.reducer";
import * as productReducer from "./products/product.reducer";
import * as cartReducer from "./cart/cart.reducer";
import * as orderReducer from "./orders/orders.reducer";

/**
 *
 */
const rootReducer = combineReducers({
    [userReducer.userFeatureKey]: userReducer.userSlice.reducer,
    [cartReducer.cartFeatureKey]: cartReducer.cartSlice.reducer,
    [productReducer.productFeatureKey]: productReducer.productSlice.reducer,
    [categoryReducer.categoryFeatureKey]: categoryReducer.categorySlice.reducer,
    [orderReducer.orderFeatureKey]: orderReducer.orderSlice.reducer
});
export default rootReducer;