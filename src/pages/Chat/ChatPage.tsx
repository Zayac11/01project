import React, {FC, useEffect, useState} from 'react';

export type ChatMessageType = {
    message:string,
    userId:number,
    userName:string,
    photo:string,
}

const ChatPage:FC = (props) => {
    return (
        <div>
            <Chat />
        </div>
    );
};

const Chat:FC = () => {

    const [wsChannel, setWsChannel] = useState<WebSocket | null>()
    useEffect(() => {

        let ws: WebSocket;

        const closeHandler = () => {
            console.log('Close WebSocket')
            setTimeout(createChannel, 3000)
        }

        const createChannel = () => {

            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws?.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }
        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel} />
            <AddMessageForm wsChannel={wsChannel} />
        </div>
    )
}

const Messages:FC<{wsChannel: WebSocket | null | undefined}> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        let messageHandler = (e:MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

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

const AddMessageForm:FC<{wsChannel: WebSocket | null | undefined}> = ({wsChannel}) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        };
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.target.value)} value={message} />
            </div>
            <div>
                <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage
