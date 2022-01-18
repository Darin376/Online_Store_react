import { combineReducers } from "redux";
import { ProductsReducer } from "./productsReducer";
import { CartReduser } from "./cartReduser";
import { OrederReduser } from "./orderReduser";

export const rootReducer = combineReducers({
    ProductsReducer,
    CartReduser,
    OrederReduser
})