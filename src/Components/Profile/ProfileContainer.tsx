import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
    savePhoto,
    saveProfile,
    updateStatus,
    actions
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getStatus: (userId: number) => void
    getUserProfile: (userId: number) => void
    savePhoto: (file: File) => void
    updateStatus: (text: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

//todo: hoc props
//Injection of HOC props
class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.id;
            if(!userId) {
                this.props.history.push("/login"); //Редирект
            }
        }

        if(!userId) {
            console.error ('Id should exists in URI params or in state')
        }
        else {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType,) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         savePhoto={this.props.savePhoto}
                         findJobAC={actions.findJobAC}
                         noFindJobAC={actions.noFindJobAC}
                />
            </div>
        );
    }
}
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        findJob: state.profilePage.findJob,
        id: state.auth.id,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
    };
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)

//withRouter закидывает в компоненту данные url, connect закидывает в компоненту state и dispatch
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
//
// export default connect(mapStateToProps, {findJobAC, noFindJobAC, getUserProfile})(WithUrlDataContainerComponent);
