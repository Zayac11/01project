import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {FormAction} from 'redux-form';
import {chatApi, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from 'uuid'

export type InitialStateType = typeof initialState

type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType,
}

//reducer возвращает стейт такого же значения, что и принимает, чтобы мы в кейсах не дописывали новые поля объекту
const chatReducer = (state = initialState, action: ActionsType):InitialStateType  => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)            }
        case 'SN/CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status,
            }

        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({type: 'SN/CHAT/MESSAGES_RECEIVED', payload: {messages}} as const),
    statusChanged: (status: StatusType) => ({type: 'SN/CHAT/STATUS_CHANGED', payload: {status}} as const),
}

type ThunkType = BaseThunkType<ActionsType | FormAction>

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null)  {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if(_statusChangedHandler === null)  {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatApi.start()
        chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
        chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
    }
}
export const stopMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
        chatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
        chatApi.stop()
    }
}
export const sendMessage = (message: string): ThunkType => {
    return async () => {
        chatApi.sendMessage(message)
    }
}

export default chatReducer;
