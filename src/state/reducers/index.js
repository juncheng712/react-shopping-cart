
import cartReducer from "./cartReducer"
import { combineReducers } from "redux";
import productReducer from "./productReducer";

const reducers = combineReducers({
    products: productReducer,
    cart: cartReducer
});

export default reducers;