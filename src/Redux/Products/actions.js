import { commerce } from '../../DataBase/commerce';
import { todoActionTypes } from "./types";

export const addProductsPerCategory = (data) => ({
    type: todoActionTypes.ADD_CATEGORIES_PRODUCTS,
    payload: {
        category: data
    }
})
export const addedCart = (data) => ({
    type: todoActionTypes.FETCH_CART,
    payload: {
        cart: data
    }
})
export const addProducts = (data) => ({
    type: todoActionTypes.PRODUCTS_ALL,
    payload: {
        productsAll: data
    }
})
export const addSearchProducts = (data) => ({
    type: todoActionTypes.SEARCH_PRODUCTS,
    payload: {
        searchProducts: data
    }
})

export function handleAddToCart(productId, quantity) {
    return async dispatch => {
        const item = await commerce.cart.add(productId, quantity);
        dispatch({
            type: todoActionTypes.HANDLE_ADD_TO_CART,
            payload: {
                handleAddCart: item.cart
            }
        })
    }
}

export function handleEmptyCart() {
    return async dispatch => {
        const response = await commerce.cart.empty();
        dispatch({
            type: todoActionTypes.HANDLE_EMPTY_CART,
            payload: {
                handleEmptyCart: response.cart
            }
        })
    }
}
export function handleUpdateCartQty(lineItemId, quantity) {
    return async dispatch => {
        const response = await commerce.cart.update(lineItemId, { quantity });
        dispatch({
            type: todoActionTypes.HANDLE_UPDATE_CART_QTY,
            payload: {
                handleUpdateCart: response.cart
            }
        })
    }
}

export function handleRemoveFromCart(lineItemId) {
    return async dispatch => {
        const response = await commerce.cart.remove(lineItemId);
        dispatch({
            type: todoActionTypes.HANDLE_REMOVE_FROM_CART,
            payload: {
                handleRemoveFromCart: response.cart
            }
        })
    }
}
export function refreshCart() {

    return async dispatch => {
        const response = await commerce.cart.refresh();
        dispatch({
            type: todoActionTypes.REFRESH_CART,
            payload: {
                refreshCartCart: response
            }
        })
    }
}

export function handleCaptureCheckout(checkoutTokenId, newOrder) {
    return async dispatch => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            dispatch({
                type: todoActionTypes.ORDER,
                payload: {
                    setOrder: incomingOrder,
                }
            })
            console.log('Покупака успешна')
            dispatch(refreshCart())
        } catch (error) {
            dispatch({
                type: todoActionTypes.ERROR_MESSAGE,
                payload: {
                    errorMassage: error.data.error.message
                }
            })
        }
    }

}