import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {AddMessageFormRedux} from "./AddMessageForm";



let Dialogs = (props) => {

    let dialogsElements =
        props.dialogsData.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);

    let messagesElements =
        props.messagesData.map(m => <Message message={m.message} key={m.id} />);

    // if(!props.isAuth) return <Redirect to={'/login'} />

    const addNewMessage = (values) => {
        props.addMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements}
                {/*<DialogItem name={dialogsData[0].name} id={dialogsData[0].id} />*/}
                {/*<DialogItem name='Valera' id='2' />*/}
            </div>
            <div className={s.messages}>
                { messagesElements}
                <div>

                {/*<textarea onChange={ onMessageChange} ref={ newMessageElement}*/}
                {/*          value={ props.newMessageText} />*/}
                      <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>

                {/*<Message message={messagesData[0].message} />*/}
            </div>
        </div>
    );
}


export default Dialogs;