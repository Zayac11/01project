import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_FIND_JOB = 'SET_FIND_JOB'
const SET_NO_FIND_JOB = 'SET_NO_FIND_JOB'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
    postsData:[
        {id: 1, text: 'post 1', likeCount: '15'},
        {id: 2, text: 'post 2', likeCount: '20'},
        {id: 3, text: 'post 3', likeCount: '25'}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    findJob: false,
    status: '',
};
export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any):InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                text: action.newPostText,
                likeCount: '0'
            };
            //Делаем копию state
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
                findJob: action.profile.lookingForAJob
            };
        }
        case SET_FIND_JOB: {
            return {
                ...state,
                findJob: true
            };
        }
        case SET_NO_FIND_JOB: {
            return {
                ...state,
                findJob: false
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }
        default:
            return state;
    }
//observer connect'a смотрит на изменение объекта и перерисовывает, если он изменился
//объект изменился, если поменялась ссылка на него(при копировании) или изменилась его внутренность
//Создаём новый объект и делаем туда копию state, и изменяем её, далее connect сравнивает внутренности объектов и перерисовывает, если есть различия
//Нам нельзя изменять пришедший к нам изначально state, если мы перепишем и изменим его, то connect будет сравнивать
}

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText:string): AddPostActionCreatorActionType =>
    ({type: ADD_POST, newPostText})
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile:ProfileType):SetUserProfileActionType =>
    ({type: SET_USER_PROFILE, profile})
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string):SetStatusActionType =>
    ({type: SET_STATUS, status})
type FindJobACActionType = {
    type: typeof SET_FIND_JOB
}
export const findJobAC = ():FindJobACActionType =>
    ({type: SET_FIND_JOB})
type NoFindJobACActionType = {
    type: typeof SET_NO_FIND_JOB
}
export const noFindJobAC = ():NoFindJobACActionType =>
    ({type: SET_NO_FIND_JOB})
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType):SavePhotoSuccessActionType =>
    ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId:number) => {
    return async (dispatch:any) => {
        let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data));
    }
}

export const getStatus = (userId:number) => {
    return async(dispatch:any) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    }
}
export const updateStatus = (status:string) => {
    return async (dispatch:any) => {
        try{
            let response = await profileAPI.updateStatus(status)
            if(response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        }
        catch(error) {
            debugger
            console.log(error.toJSON())
        }
    }
}
export const savePhoto = (file:any) => {
    return async (dispatch:any) => {
        let response = await profileAPI.savePhoto(file)

        if(response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}
export const saveProfile = (profile:ProfileType) => {
    return async (dispatch:any, getState:any) => {
        let userId = getState().auth.id
        let response = await profileAPI.saveProfile(profile)
        if(response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        }
        else {
            dispatch(stopSubmit('edit-profile',{_error: response.data.messages[0]})); //Общая ошибка
            return Promise.reject(response.data.messages[0])
        }
    }
}

export default profileReducer;
