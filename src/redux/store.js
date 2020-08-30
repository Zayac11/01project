import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

// const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
//
// const ADD_MESSAGE = 'ADD-MESSAGE';
// const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE';


let store =  {

    _state: {

        profilePage: {
            postsData:[
                {id: '1', text: 'post 1', likeCount: '15'},
                {id: '2', text: 'post 2', likeCount: '20'},
                {id: '3', text: 'post 3', likeCount: '25'}
            ],
            newPostText: 'avatar',
        },
        dialogsPage: {
            dialogsData: [
                {id: '1', name: 'Oleg'},
                {id: '2', name: 'Valera'},
                {id: '3', name: 'Artem'},
                {id: '4', name: 'Andrey'}
            ],
            messagesData: [
                {id: '1', message: 'Hi'},
                {id: '2', message: 'Hi HI'},
                {id: '3', message: 'How are you'}
            ],
            newMessageText: 'avatar',
        },
        sidebar: {
            sidebarPage: [
                {id: '1', name: 'Oleg'},
                {id: '2', name: 'Andrew'},
                {id: '3', name: 'Artem'},
            ]
        },
    },
    _callSubscriber(){ //rerenderEntireTree()

    },

    getState() {
        return this._state;
    },
    subscribe(observer) { // observer pattern
        this._callSubscriber = observer; // observer // publisher-subscriber // addEventListener
    },

    dispatch(action) { //объект описывает какое д-е совершить// { type: 'ADD-POST' }
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        //
        this._callSubscriber(this._state);

        // if(action.type === ADD_POST) {
        //     let newPost = {
        //         id: '5',
        //         text: this._state.profilePage.newPostText,
        //         likeCount: '0'
        //     };
        //     this._state.profilePage.postsData.push(newPost);
        //     this._state.profilePage.newPostText='';
        //     this._callSubscriber(this._state);
        // } else if(action.type === UPDATE_NEW_POST_TEXT) {
        //     this._state.profilePage.newPostText = action.newText;
        //     this._callSubscriber(this._state);
        // }

    },


};

//Просто импортируем, без props



export default store;

// addPost() {
//
//     let newPost = {
//         id: '5',
//         text: this._state.profilePage.newPostText,
//         likeCount: '0'
//     };
//     this._state.profilePage.postsData.push(newPost);
//     this._state.profilePage.newPostText='';
//     this._callSubscriber(this._state);
// },
// updateNewPostText(newText) {
//     this._state.profilePage.newPostText = newText;
//     this._callSubscriber(this._state);
// },
// addMessage() {
//     let newMessage = {
//         id: '4',
//         message: this._state.dialogsPage.newMessageText,
//     };
//     this._state.dialogsPage.messagesData.push(newMessage);
//     this._state.dialogsPage.newMessageText='';
//     this._callSubscriber(this._state);
// },
// updateNewMessageText(newText) {
//     this._state.dialogsPage.newMessageText = newText;
//     this._callSubscriber(this._state);
// },
