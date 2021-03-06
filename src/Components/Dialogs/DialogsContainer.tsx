import React, {ComponentType} from 'react';
import {actions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import { AppStateType } from '../../redux/redux-store';

//Возвращает объект с данными из state и засовываем их в пропсы
let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
    }
}
//Возвращает

const DialogsContainer = compose<ComponentType>(
    connect(mapStateToProps, {sendMessage: actions.sendMessage}),
    withAuthRedirect
)(Dialogs)

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
//
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
//Создаём контейнерную компоненту, внутри рендерит перезнтационную и внутрь её в качестве пропсов передает св-ва из этих двух объектов
//коннект сам вызывет функции mapStateToProps и mapDispatchToProps и передаст внутрь первой state, а второй dispatch с биндом на store

export default DialogsContainer;
