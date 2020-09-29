import React from 'react';
import {connect} from 'react-redux';
import {
    setCurrentPage,
    requestUsers,
    follow,
    unfollow
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors.js";

class UsersContainer extends React.Component{

    //Вызывается один раз
    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize);
    }
    onPageChanged = (pageNumber) => {
        let {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize);
    }

    //Сначала render, потом componentDidMount
    render() {
        return (
            <>
                { this.props.isFetching ? <Preloader /> : null } {/*svg картинка загрузки*/}
                <Users totalUsersCount = {this.props.totalUsersCount} //отрисовка компоненты с передачей нужных данных
                       pageSize = {this.props.pageSize}
                       currentPage = {this.props.currentPage}
                       users = {this.props.users}
                       onPageChanged = {this.onPageChanged}
                       toggleFollowingProgress = {this.props.toggleFollowingProgress}
                       followingInProgress = {this.props.followingInProgress}
                       follow = {this.props.follow}
                       unfollow = {this.props.unfollow}
                />
            </>
        );
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }


let mapStateToProps = (state) => {
    debugger
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

// export default withAuthRedirect(connect(mapStateToProps,
//     { setCurrentPage, getUsers, follow, unfollow })(UsersContainer));


export default compose(
    connect(mapStateToProps,
        { setCurrentPage, requestUsers, follow, unfollow }))
    (UsersContainer)

//     {id: 1, photoUrl:'https://vignette.wikia.nocookie.net/avatar/images/f/f4/3%D1%8521_%D0%90%D0%B0%D0%BD%D0%B3.jpg/revision/latest?cb=20110327121409&path-prefix=ru',
