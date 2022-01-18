import { todoActionTypes } from "../types"

const initialState = {
    order: {},
    errorMessage: '',
}

export const OrederReduser = (state = initialState, action) => {
    switch (action.type) {
        case todoActionTypes.ORDER:
            return {
                ...state,
                order: action.payload.setOrder,
            }
        case todoActionTypes.ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload.errorMassage
            }
        default:
            return state
    }
}