
let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null;

const closeHandler = () => {
    console.log('Close WebSocket')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e:MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
};

const createChannel = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
}

export const chatApi = {
    //Подписка на событие
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            //Отписка
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    start() {
        createChannel()
    },
    stop() {
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
        subscribers = []
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
}

type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message:string,
    userId:number,
    userName:string,
    photo:string,
}
