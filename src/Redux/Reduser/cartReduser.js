import { todoActionTypes } from "../types"

const initialState = {
    cart: {},
}

export const CartReduser = (state = initialState, action) => {
    switch (action.type) {
        case todoActionTypes.FETCH_CART:
            return {
                ...state,
                cart: action.payload.cart
            }
        case todoActionTypes.HANDLE_ADD_TO_CART:
            return {
                ...state,
                cart: action.payload.handleAddCart
            }
        case todoActionTypes.HANDLE_EMPTY_CART:
            return {
                ...state,
                cart: action.payload.handleEmptyCart
            }
        case todoActionTypes.HANDLE_UPDATE_CART_QTY:
            return {
                ...state,
                cart: action.payload.handleUpdateCart
            }
        case todoActionTypes.HANDLE_REMOVE_FROM_CART:
            return {
                ...state,
                cart: action.payload.handleRemoveFromCart
            }
        case todoActionTypes.REFRESH_CART:
            return {
                ...state,
                cart: action.payload.refreshCartCart
            }
        default:
            return state
    }
}