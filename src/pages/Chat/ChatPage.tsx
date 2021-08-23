import React, {FC, useEffect, useState} from 'react';
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";


const ChatPage:FC = (props) => {
    return (
        <div>
            <Chat />
        </div>
    );
};

const Chat:FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages:FC<{}> = ({}) => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}

const Message:FC<{ message:ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: '30px'}} alt='avatar' />
            <b>{message.userName}</b>
            <div>
                {message.message}
            </div>
            <hr />
        </div>
    )
}

const AddMessageForm:FC<{}> = ({}) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.target.value)} value={message} />
            </div>
            <div>
                <button disabled={false} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage
