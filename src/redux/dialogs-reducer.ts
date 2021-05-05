const ADD_MESSAGE = 'ADD-MESSAGE';

type DialogType = {
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogsData: [
        {id: 1, name: 'Oleg'},
        {id: 2, name: 'Valera'},
        {id: 3, name: 'Artem'},
        {id: 4, name: 'Andrey'}
    ] as Array<DialogType>,
    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hi HI'},
        {id: 3, message: 'How are you'}
    ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
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

type ActionsTypes = AddMessageActionCreatorActionType

type AddMessageActionCreatorActionType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}
export const addMessageActionCreator = (newMessageBody: string):AddMessageActionCreatorActionType => {
    return {
        type: ADD_MESSAGE, newMessageBody
    }
}


export default dialogsReducer;
