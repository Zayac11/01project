import aang from '../assets/images/Aang.jpg'

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_AVATAR = 'SET_USER_AVATAR';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    // authUser: null
    userAvatar: aang,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }

        case SET_USER_AVATAR:
            return  {...state, userAvatar: action.userAvatar }
        case TOGGLE_IS_FETCHING:
            return  {...state, isFetching: action.isFetching }
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login) => ({type: SET_USER_DATA, data: {id, email, login}})
export const setUserAvatar = (userAvatar) => ({type: SET_USER_AVATAR, userAvatar})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })

export default authReducer;