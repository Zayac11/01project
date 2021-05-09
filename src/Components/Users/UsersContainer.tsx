import React from 'react';
import {connect} from 'react-redux';
import {
    requestUsers,
    follow,
    unfollow, FilterType
} from '../../redux/users-reducer'
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers, getUsersFilter
} from '../../redux/users-selectors'
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    filter: FilterType
}
type MapDispatchPropsType = {
    requestUsers: (currentPage:number, pageSize:number, filter: FilterType) => void
    follow: (userId:number) => void
    unfollow: (userId:number) => void
}
type OwnProps = {
    pageTitle: string
}
type PropsType = MapDispatchPropsType & MapStatePropsType & OwnProps

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        let {currentPage, pageSize, filter} = this.props
        this.props.requestUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize, filter} = this.props
        this.props.requestUsers(pageNumber, pageSize, filter);
    }

    onFilterChanged = (filter: FilterType) => {
        let {pageSize} = this.props
        this.props.requestUsers(1, pageSize, filter);
    }

    render() {
        return (
            <>
                { this.props.isFetching ? <Preloader /> : null } {/*svg картинка загрузки*/}
                <h2>{this.props.pageTitle}</h2>
                <Users totalUsersCount = {this.props.totalUsersCount} //отрисовка компоненты с передачей нужных данных
                       pageSize = {this.props.pageSize}
                       currentPage = {this.props.currentPage}
                       users = {this.props.users}
                       onPageChanged = {this.onPageChanged}
                       onFilterChanged = {this.onFilterChanged}
                       followingInProgress = {this.props.followingInProgress}
                       follow = {this.props.follow}
                       unfollow = {this.props.unfollow}
                />
            </>
        );
    }
}

let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}

export default compose(
    // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(
        mapStateToProps,
        { follow, requestUsers, unfollow }))
    (UsersContainer)

