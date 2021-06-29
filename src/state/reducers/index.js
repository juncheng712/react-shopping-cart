
import cartReducer from "./cartReducer"
import { combineReducers } from "redux";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";

const reducers = combineReducers({
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
});

export default reducers;