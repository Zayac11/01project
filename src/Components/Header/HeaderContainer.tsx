import React from 'react';
import Header from './Header';
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type MapPropsType = {
    isAuth: boolean
    login: string | null
    id: number | null
    userAvatar: string | null
}
type DispatchPropsType = {
    logout: () => void
}


class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType>{

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id,
    userAvatar: state.auth.userAvatar,
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps,{logout})(HeaderContainer);
