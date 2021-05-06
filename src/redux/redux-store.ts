import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reducer"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer"
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer"

//воспринимать как _state
let rootReducer = combineReducers({
    profilePage: profileReducer, // profileReducer - объект
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

type RootReducerType = typeof rootReducer //(globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

//key - это название action creator, a U - это выводимый тип функции
// type PropertiesTypes= T extends {[key: string]:

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

//создает state с тремя свойствами
// let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.__store__ = store

export default store
