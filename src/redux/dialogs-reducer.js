const ADD_MESSAGE = 'ADD-MESSAGE';

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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 4,
                message: action.newMessageBody,
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            };
        default:
            return state;
    }
}
export const addMessageActionCreator = (newMessageBody) => {
    return {
        type: ADD_MESSAGE, newMessageBody
    }
}


export default dialogsReducer;