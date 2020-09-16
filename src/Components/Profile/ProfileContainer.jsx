import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {findJobAC, getStatus, getUserProfile, noFindJobAC, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.id;
            if(!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return (
            <div>
                <Profile {...this.props} updateStatus={this.props.updateStatus}/>
            </div>
        );
    }
}
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        findJob: state.profilePage.findJob,
        id: state.auth.id,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
    };
}

export default compose(
    connect(mapStateToProps, {findJobAC, noFindJobAC, getUserProfile, getStatus, updateStatus}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)

//withRouter закидывает в компоненту данные url, connect закидывает в компоненду state и dispatch
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
//
// export default connect(mapStateToProps, {findJobAC, noFindJobAC, getUserProfile})(WithUrlDataContainerComponent);