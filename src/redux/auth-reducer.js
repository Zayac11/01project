import aang from '../assets/images/Aang.jpg'
import {authAPI, securityAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
const SET_USER_AVATAR = 'SET_USER_AVATAR';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    userAvatar: aang,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
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
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, captchaUrl})
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

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha)
        if(response.data.resultCode === 0) {
            //success, get auth data
            dispatch(getUserAuthData()) //проверить еще раз после логина
        }
        else {
            if(response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit('login',{_error: message})); //Общая ошибка
        }
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        let response = await securityAPI.getCaptchaUrl()

        let captchaUrl = response.url

        dispatch(getCaptchaUrlSuccess(captchaUrl))
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
