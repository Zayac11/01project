import React from 'react';
import Header from './Header';
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component{

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id,
    userAvatar: state.auth.userAvatar,
});

export default connect(mapStateToProps,{logout})(HeaderContainer);