import { todoActionTypes } from "./types"

const initialState = {
    categoriesProducts: [],
    productsAll: [],
    searchProducts: [],
}

export const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case todoActionTypes.ADD_CATEGORIES_PRODUCTS:
            return {
                ...state,
                categoriesProducts: action.payload.category
            }
        case todoActionTypes.PRODUCTS_ALL:
            return {
                ...state,
                productsAll: action.payload.productsAll
            }
        case todoActionTypes.SEARCH_PRODUCTS:
            return {
                ...state,
                searchProducts: action.payload.searchProducts
            }
        default:
            return state
    }
}