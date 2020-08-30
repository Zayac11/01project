import React from 'react';
import s from './Dialogs.module.css';
import {addMessageActionCreator, updateNewMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

//Возвращает объект с данными из state и засовываем их в пропсы
let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
        newMessageText: state.dialogsPage.newMessageText
    }
}
//Возвращает
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator());
        },
        updateNewMessageText: (text) => {
            dispatch(updateNewMessageActionCreator(text));
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs); 
//Создаём контейнерную компоненту, внутри рендерит перезнтационную и внутрь её в качестве пропсов передает св-ва из этих двух объектов
//коннект сам вызывет функции mapStateToProps и mapDispatchToProps и передаст внутрь первой state, а второй dispatch с биндом на store

export default DialogsContainer;


// const DialogsContainer = (props) => {
//
//     let state = props.store.getState();
//
//     let onAddMessage = () => {
//         // let text = newMessageElement.current.value;
//         // props.addMessage(text);
//         props.store.dispatch(addMessageActionCreator());
//         // props.dispatch({type: 'ADD-MESSAGE'});
//         // props.addMessage();
//     }
//
//     let onMessageChange = (text) => {
//         let action = updateNewMessageActionCreator(text)
//         props.store.dispatch(action);
//         // props.dispatch({type: 'UPDATE-NEW-MESSAGE',
//         //                 newText: text});
//         // props.updateNewMessageText(text);
//     }
//
//     return (
//         <StoreContext.Consumer>
//             {
//             (store) => {
//
//                 let state = store.getState();
//
//                 let onAddMessage = () => {
//                     // let text = newMessageElement.current.value;
//                     // props.addMessage(text);
//                    store.dispatch(addMessageActionCreator());
//                     // props.dispatch({type: 'ADD-MESSAGE'});
//                     // props.addMessage();
//                 }
//
//                 let onMessageChange = (text) => {
//                     let action = updateNewMessageActionCreator(text)
//                     store.dispatch(action);
//                     // props.dispatch({type: 'UPDATE-NEW-MESSAGE',
//                     //                 newText: text});
//                     // props.updateNewMessageText(text);
//                 }
//
//             return <Dialogs addMessage ={ onAddMessage }
//                      updateNewMessageText ={ onMessageChange }
//                      dialogsData = {state.dialogsPage.dialogsData}
//                      messagesData = {state.dialogsPage.messagesData}
//                      newMessageText = {state.dialogsPage.newMessageText}
//             /> } }
//         </StoreContext.Consumer>
//     );
// }
