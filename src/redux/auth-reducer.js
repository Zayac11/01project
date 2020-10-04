import aang from '../assets/images/Aang.jpg'
import {authAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_AVATAR = 'SET_USER_AVATAR';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    // isFetching: false,
    // authUser: null
    userAvatar: aang,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        case SET_USER_AVATAR:
            return  {...state, userAvatar: action.userAvatar }
        // case TOGGLE_IS_FETCHING:
        //     return  {...state, isFetching: action.isFetching }
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})
export const setUserAvatar = (userAvatar) => ({type: SET_USER_AVATAR, userAvatar})
// export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })

export const getUserAuthData = () => {
    return async (dispatch) => {
        let data = await authAPI.me()
            if(data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login, true));
                usersAPI.getProfile(id)
                    .then(response => {
                        dispatch(setUserAvatar(response.data.photos.small));
                    })
            }
    }
}

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe)
        if(response.data.resultCode === 0) {
            dispatch(getUserAuthData()) //проверить еще раз после логина
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit('login',{_error: message}));
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let response = await authAPI.logout()
        if(response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;