import React from 'react';
import {connect} from 'react-redux';
import {
    setCurrentPage,

    getUsers,
    follow,
    unfollow
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';

class UsersContainer extends React.Component{

    //Вызывается один раз
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);//устанавливаем текущую страницу
        this.props.getUsers(pageNumber, this.props.pageSize);
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

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,

    }
}

export default connect(mapStateToProps,
    { setCurrentPage, getUsers, follow, unfollow })(UsersContainer);

//     {id: 1, photoUrl:'https://vignette.wikia.nocookie.net/avatar/images/f/f4/3%D1%8521_%D0%90%D0%B0%D0%BD%D0%B3.jpg/revision/latest?cb=20110327121409&path-prefix=ru',
