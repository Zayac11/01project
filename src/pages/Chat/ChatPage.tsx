import React, {FC, useEffect, useRef, useState} from 'react';
import {ChatMessageAPIType, StatusType} from "../../api/chat-api";
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
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' && <div>Some error occured, please refresh page</div>}
            <>
                <Messages />
                <AddMessageForm status={status} />
            </>
        </div>
    )
}

const Messages:FC = () => {

    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    useEffect(() => {
        if(isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
        {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    return (
        <>
            <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
                {messages.map((m, index) => <Message key={m.id} message={m} />)}
                <div ref={messagesAnchorRef}></div>
            </div>
        </>
    )
}

const Message:FC<{ message:ChatMessageAPIType }> =  React.memo (({message}) => {

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
})

const AddMessageForm:FC<{status: StatusType}> = ({status}) => {

    const [message, setMessage] = useState('')

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
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage
