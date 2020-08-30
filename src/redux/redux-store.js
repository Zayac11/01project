import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";

//воспринимать как _state
let reducers = combineReducers({
    profilePage: profileReducer, // profileReducer - объект
    dialogsPage: dialogsReducer, // Тот же dialogsPage, что и в DialogsContainer
    sidebar: sidebarReducer,
    usersPage: usersReducer
});
//создает state с тремя свойствами
let store = createStore(reducers);

export default store;