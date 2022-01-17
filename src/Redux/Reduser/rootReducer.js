import { combineReducers } from "redux";
import { ProductsReducer } from "./productsReducer";
import { CartReduser } from "./cartReduser";

export const rootReducer = combineReducers({
    ProductsReducer,
    CartReduser
})