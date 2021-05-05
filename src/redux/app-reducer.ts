import {getUserAuthData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false,
}

const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

type ActionsTypes = InitializedSuccessActionType

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

//Двоеточие после скобок говорит о том, что функция возвращает тип InitializedSuccessActionType
export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
type DispatchType = Dispatch<ActionsTypes>

export const initializeApp = (): ThunkType => {
    return (dispatch) => {

        let promise = dispatch(getUserAuthData());
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess())
        });
    }
}


export default appReducer;
