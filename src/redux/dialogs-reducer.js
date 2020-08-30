const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE';

let initialState = {
    dialogsData: [
        {id: 1, name: 'Oleg'},
        {id: 2, name: 'Valera'},
        {id: 3, name: 'Artem'},
        {id: 4, name: 'Andrey'}
    ],
    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hi HI'},
        {id: 3, message: 'How are you'}
    ],
    newMessageText: 'avatar'
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 4,
                message: state.newMessageText,
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
                newMessageText: ''
            };
            // stateCopy.messagesData.push(newMessage);
            // stateCopy.newMessageText = '';

        case UPDATE_NEW_MESSAGE:
            return {
                ...state,
                newMessageText: action.newText
            };
            // stateCopy.newMessageText = action.newText;

        default:
            return state;
    }

    // if(action.type === ADD_MESSAGE) {
    //     let newMessage = {
    //         id: '4',
    //         message: state.newMessageText,
    //     };
    //     state.messagesData.push(newMessage);
    //     state.newMessageText='';
    //     // this._callSubscriber(this._state);
    // } else if(action.type === UPDATE_NEW_MESSAGE) {
    //     state.newMessageText = action.newText;
    //     // this._callSubscriber(this._state);
    // }
    // return state;
}

export const addMessageActionCreator = () => {
    return {
        type: ADD_MESSAGE,
    }
}
export const updateNewMessageActionCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE,
        newText: text,
    }
}

export default dialogsReducer;