import { combineReducers } from "redux";
import { ProductsReducer } from "./Products/productsReducer";
import { CartReduser } from "./Products/cartReduser";
import { OrederReduser } from "./Products/orderReduser";
import { userReducer } from "./user/userReduser";

export const rootReducer = combineReducers({
    ProductsReducer,
    CartReduser,
    OrederReduser,
    userReducer
})