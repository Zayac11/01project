import React from 'react';
import {actions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

//Возвращает объект с данными из state и засовываем их в пропсы
let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
        newMessageText: state.dialogsPage.newMessageText,
    }
}
//Возвращает
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessageBody) => {
            dispatch(actions.addMessageActionCreator(newMessageBody));
        },
    }
}

const DialogsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
//
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
//Создаём контейнерную компоненту, внутри рендерит перезнтационную и внутрь её в качестве пропсов передает св-ва из этих двух объектов
//коннект сам вызывет функции mapStateToProps и mapDispatchToProps и передаст внутрь первой state, а второй dispatch с биндом на store

export default DialogsContainer;
