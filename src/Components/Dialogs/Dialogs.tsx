import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageForm from './AddMessageForm';
import {DialogType, MessageType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsData: Array<DialogType>
    messagesData: Array<MessageType>
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

let Dialogs:React.FC<PropsType> = (props) => {

    let dialogsElements =
        props.dialogsData.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);

    let messagesElements =
        props.messagesData.map(m => <Message message={m.message} key={m.id} />);

    // if(!props.isAuth) return <Redirect to={'/login'} />

    const addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements}
            </div>
            <div className={s.messages}>
                { messagesElements}
                <div>
                      <AddMessageForm onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    );
}


export default Dialogs;
