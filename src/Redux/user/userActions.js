import {signIn, auth} from '../../FireBase/fireBaseAuth';
import {userActionTypes} from './userTupes';
 

export const userLogin = () => {
    return (dispatch) => {
        signIn()
        .then((user) => {
            dispatch({
                type: userActionTypes.USER_LOGIN,
                payload: user 
            });
        })
        .catch((err) => {
            dispatch({
                type: 'USER_LOGIN_ERROR',
                payload: err
            });
        })
    }
}

export const userLogout = () => {
    return (dispatch) => {
        auth.signOut()
        .then(() => {
            dispatch({
                type: userActionTypes.USER_LOGOUT
            });
        });
    }
}