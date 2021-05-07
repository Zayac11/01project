import {InferActionsTypes} from "./redux-store";

export type DialogType = {
    id: number,
    name: string
}

export type MessageType = {
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

const dialogsReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/ADD_MESSAGE':
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

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: 'SN/DIALOGS/ADD_MESSAGE', newMessageBody} as const),
}
export default dialogsReducer;
