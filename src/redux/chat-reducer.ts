import aang from '../assets/images/Aang.jpg'
import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {profileAPI} from "../api/profile-api";
import {FormAction, stopSubmit} from 'redux-form';
import {chatApi, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";

export type InitialStateType = typeof initialState
let initialState = {
    messages: [] as ChatMessageType[]
}

//reducer возвращает стейт такого же значения, что и принимает, чтобы мы в кейсах не дописывали новые поля объекту
const chatReducer = (state = initialState, action: ActionsType):InitialStateType  => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages],
            }

        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({type: 'SN/CHAT/MESSAGES_RECEIVED', payload: {messages}} as const),
}

type ThunkType = BaseThunkType<ActionsType | FormAction>

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {

    if(_newMessageHandler === null)  {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
};

export const startMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatApi.start()
        chatApi.subscribe(newMessageHandlerCreator(dispatch))
    }
}
export const stopMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatApi.unsubscribe(newMessageHandlerCreator(dispatch))
        chatApi.stop()
    }
}
export const sendMessage = (message: string): ThunkType => {
    return async (dispatch) => {
        chatApi.sendMessage(message)
    }
}

export default chatReducer;
