import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_FIND_JOB = 'SET_FIND_JOB'
const SET_NO_FIND_JOB = 'SET_NO_FIND_JOB'
const SET_STATUS = 'SET_STATUS'

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

export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            } );
    }
}

export const getStatus = (userId) => {
    return(dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))
            })
    }
}
export const updateStatus = (status) => {
    return(dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if(response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    }
}

export default profileReducer;