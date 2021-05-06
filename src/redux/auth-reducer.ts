import aang from '../assets/images/Aang.jpg'
import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {profileAPI} from "../api/profile-api";
import {FormAction, stopSubmit} from 'redux-form';

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
const authReducer = (state = initialState, action: ActionsType):InitialStateType  => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }

        case 'SN/AUTH/SET_USER_AVATAR':
            return  {...state, userAvatar: action.userAvatar }

        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login:string | null, isAuth:boolean) => ({type: 'SN/AUTH/SET_USER_DATA', payload: {id, email, login, isAuth}} as const),
    setUserAvatar: (userAvatar: string | null) => ({type: 'SN/AUTH/SET_USER_AVATAR', userAvatar} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', captchaUrl} as const),
}

type ThunkType = BaseThunkType<ActionsType | FormAction>

export const getUserAuthData = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.me()
        if(data.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = data.data;
            dispatch(actions.setAuthUserData(id, email, login, true));

            let response = await profileAPI.getProfile(id)
            dispatch(actions.setUserAvatar(response.photos.small));
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
            dispatch(stopSubmit('login',{_error: message})) //Общая ошибка
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        let data = await securityAPI.getCaptchaUrl()

        let captchaUrl = data.url

        dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    }
}

export const logout = ():ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.logout()
        if(response.data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;
