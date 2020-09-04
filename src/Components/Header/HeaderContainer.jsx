import React from 'react';
import Header from './Header';
import * as axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData, setUserAvatar} from "../../redux/auth-reducer";
import {usersAPI} from "../../api/api";

class HeaderContainer extends React.Component{

    componentDidMount() {
        usersAPI.onUserAuth()
            .then(data => {
                if(data.resultCode === 0) {
                    let {id, email, login} = data.data;
                    this.props.setAuthUserData(id, email, login);
                    usersAPI.getUserProfile(this.props.id)
                        .then(data => {
                            this.props.setUserAvatar(data.photos.small);
                        })
                }
        });
    }

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

export default connect(mapStateToProps,{setAuthUserData, setUserAvatar})(HeaderContainer);