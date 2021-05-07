import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";

let initialState = {
    postsData:[
        {id: 1, text: 'post 1', likeCount: 15},
        {id: 2, text: 'post 2', likeCount: 20},
        {id: 3, text: 'post 3', likeCount: 25}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    findJob: false,
    status: '',
};
export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType):InitialStateType => {

    switch (action.type) {
        case 'SN/PROFILE/ADD_POST': {
            let newPost = {
                id: 4,
                text: action.newPostText,
                likeCount: 0
            };
            //Делаем копию state
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };
        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile,
                findJob: action.profile.lookingForAJob
            };
        }
        case 'SN/PROFILE/SET_FIND_JOB': {
            return {
                ...state,
                findJob: true
            };
        }
        case 'SN/PROFILE/SET_NO_FIND_JOB': {
            return {
                ...state,
                findJob: false
            };
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
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

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    addPostActionCreator: (newPostText:string) => ({type: 'SN/PROFILE/ADD_POST', newPostText} as const),
    setUserProfile: (profile:ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    findJobAC: () => ({type: 'SN/PROFILE/SET_FIND_JOB'} as const),
    noFindJobAC: () => ({type: 'SN/PROFILE/SET_NO_FIND_JOB'} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const),
}

type ThunkType = BaseThunkType<ActionsType | FormAction>

export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data));
    }
}

export const getStatus = (userId:number): ThunkType => {
    return async(dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(data))
    }
}
export const updateStatus = (status:string): ThunkType => {
    return async (dispatch) => {
        try{
            let response = await profileAPI.updateStatus(status)
            if(response.data.resultCode === 0) {
                dispatch(actions.setStatus(status))
            }
        }
        catch(error) {
            console.log(error.toJSON())
        }
    }
}
export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.savePhoto(file)

        if(data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos))
        }
    }
}
export const saveProfile = (profile:ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        let userId = getState().auth.id
        let data = await profileAPI.saveProfile(profile)
        if(data.resultCode === 0) {
            if(userId != null) {
                dispatch(getUserProfile(userId))
            }
            else {
                throw new Error(`User id can't be null`)
            }
        }
        else {
            dispatch(stopSubmit('edit-profile',{_error: data.messages[0]})); //Общая ошибка
            return Promise.reject(data.messages[0])
        }
    }
}

export default profileReducer;
