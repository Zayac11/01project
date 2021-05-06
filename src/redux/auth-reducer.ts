import aang from '../assets/images/Aang.jpg'
import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {profileAPI} from "../api/profile-api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
const SET_USER_AVATAR = 'SET_USER_AVATAR';
// const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

export type InitialStateType2 = {
    id: number | null //Число или null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
    userAvatar: typeof aang | null
}

export type InitialStateType = typeof initialState

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
    userAvatar: aang as typeof aang | null,
}


//reducer возвращает стейт такого же значения, что и принимает, чтобы мы в кейсах не дописывали новые поля объекту
const authReducer = (state = initialState, action: ActionsTypes):InitialStateType2  => {
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

type ActionsTypes = GetCaptchaUrlSuccessActionType | SetAuthUserDataActionType | SetUserAvatarActionType

type SetAuthUserDataActionTypePayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionTypePayloadType
}
export const setAuthUserData = (id: number | null, email: string | null, login:string | null, isAuth:boolean):SetAuthUserDataActionType =>
    ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})
type SetUserAvatarActionType = {
    type: typeof SET_USER_AVATAR
    userAvatar: string | null
}
export const setUserAvatar = (userAvatar: string | null): SetUserAvatarActionType =>
    ({type: SET_USER_AVATAR, userAvatar})
type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    captchaUrl: string
}
export const getCaptchaUrlSuccess = (captchaUrl: string):GetCaptchaUrlSuccessActionType =>
    ({type: GET_CAPTCHA_URL_SUCCESS, captchaUrl})
// export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserAuthData = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.me()
        if(data.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));

            let response = await profileAPI.getProfile(id)
            dispatch(setUserAvatar(response.photos.small));

        }
    }
}

export const login = (email: string, password:string, rememberMe:boolean, captcha:string): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)
        if(data.resultCode === ResultCodesEnum.Success) {
            //success, get auth data
            dispatch(getUserAuthData()) //проверить еще раз после логина
        }
        else {
            if(data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            let message = data.messages.length > 0 ? data.messages[0] : "Some error"
            // @ts-ignore
            dispatch(stopSubmit('login',{_error: message})) //Общая ошибка
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        let data = await securityAPI.getCaptchaUrl()

        let captchaUrl = data.url

        dispatch(getCaptchaUrlSuccess(captchaUrl))
    }
}

export const logout = ():ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.logout()
        if(response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;
