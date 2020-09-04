const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_FIND_JOB = 'SET_FIND_JOB'
const SET_NO_FIND_JOB = 'SET_NO_FIND_JOB'

let initialState = {
    postsData:[
        {id: 1, text: 'post 1', likeCount: '15'},
        {id: 2, text: 'post 2', likeCount: '20'},
        {id: 3, text: 'post 3', likeCount: '25'}
    ],
    newPostText: 'avatar',
    profile: null,
    findJob: false
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                text: state.newPostText,
                likeCount: '0'
            };
            //Делаем копию state
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
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
        default:
            return state;
    }
    //observer connect'a смотрит на изменение объекта и перерисовывает, если он изменился
    //объект изменился, если поменялась ссылка на него(при копировании) или изменилась его внутренность
//Создаём новый объект и делаем туда копию state, и изменяем её, далее connect сравнивает внутренности объектов и перерисовывает, если есть различия
//Нам нельзя изменять пришедший к нам изначально state, если мы перепишем и изменим его, то connect будет сравнивать
}

export const addPostActionCreator = () => ({type: ADD_POST}) //return
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const findJobAC = () => ({type: SET_FIND_JOB})
export const noFindJobAC = () => ({type: SET_NO_FIND_JOB})

export default profileReducer;