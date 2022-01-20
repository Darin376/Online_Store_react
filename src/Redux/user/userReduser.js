import {userActionTypes} from './userTupes';

const initialState = {
    user: null
};

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case userActionTypes.USER_LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case userActionTypes.USER_LOGOUT:
            return {
                ...state,
                user: null
            };
        default: 
            return state;
    }
};