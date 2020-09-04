import React from 'react';
import s from './Profile.module.css'
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {findJobAC, noFindJobAC, setUserProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {usersAPI} from "../../api/api";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        usersAPI.getUserProfile(userId)
            .then(data => {
                this.props.setUserProfile(data);
        } );
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} findJob={this.props.findJob}/>
            </div>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        findJob: state.profilePage.findJob,
        id: state.auth.id,
    };
}

//withRouter закидывает в компоненту данные url, connect закидывает в компоненду state и dispatch
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile, findJobAC, noFindJobAC})(WithUrlDataContainerComponent);