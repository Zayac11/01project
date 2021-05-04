import {getUserAuthData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false,
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

//Двоеточие после скобок говорит о том, что функция возвращает тип InitializedSuccessActionType
export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getUserAuthData());
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess())
        });
    }
}


export default appReducer;
