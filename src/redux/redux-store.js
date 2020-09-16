import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";

//воспринимать как _state
let reducers = combineReducers({
    profilePage: profileReducer, // profileReducer - объект
    dialogsPage: dialogsReducer, // Тот же dialogsPage, что и в DialogsContainer
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});
//создает state с тремя свойствами
let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;