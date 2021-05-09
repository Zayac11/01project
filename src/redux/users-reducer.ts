import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";
import {updateObjectInArray} from "../utils/object-helpers";
import {APIResponseType} from "../api/api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //Array of users id
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                // users: state.users.map(u => {
                //     if(u.id === action.userId) {
                //         return {...u, followed: true} //копируем одного пользователя, followed которого надо изменить и меняем его
                //     }
                //     return u;
                // } ),
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                // users: state.users.map(u => {
                //     if(u.id === action.userId) {
                //         return{...u, followed: false} //копируем одного пользователя, followed которого надо изменить и меняем его
                //     }
                //     return u;
                // } ) ,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'SN/USERS/SET_USERS':
            return { ...state, users: [ ...action.users ] }
        case 'SN/USERS/SET_CURRENT_PAGE':
            return  {...state, currentPage: action.currentPage }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return  {...state, totalUsersCount: action.count }
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return  {...state, isFetching: action.isFetching }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return  {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId]
                                                       : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const),
}

type ThunkType = BaseThunkType<ActionsType>

export const requestUsers = (page:number, pageSize:number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userId: number,
                             apiMethod: (userId:number) => Promise<APIResponseType>, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true,userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId:number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId:number): ThunkType => {
    return async (dispatch) => {
       await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

export default usersReducer;
