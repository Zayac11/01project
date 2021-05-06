import {getUserAuthData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false,
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    //Двоеточие после скобок говорит о том, что функция возвращает тип InitializedSuccessActionType
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const initializeApp = (): ThunkType => {
    return (dispatch) => {

        let promise = dispatch(getUserAuthData());
        Promise.all([promise])
            .then(() => {
                dispatch(actions.initializedSuccess())
        });
    }
}


export default appReducer;
