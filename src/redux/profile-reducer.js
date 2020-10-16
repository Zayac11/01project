import {authAPI, profileAPI, usersAPI} from "../api/api";

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
    ],
    profile: null,
    findJob: false,
    status: '',
};

const profileReducer = (state = initialState, action) => {

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
                profile: {...state.profile, photos: action.photos}
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

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText}) //return
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const findJobAC = () => ({type: SET_FIND_JOB})
export const noFindJobAC = () => ({type: SET_NO_FIND_JOB})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data));
    }
}

export const getStatus = (userId) => {
    return async(dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    }
}
export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}
export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file)

        if(response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}

export default profileReducer;