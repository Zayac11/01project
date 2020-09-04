import React from 'react';
import {connect} from 'react-redux';
import {
    onFollow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    onUnfollow, toggleFollowingProgress
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import {usersAPI} from "../../api/api";

class UsersContainer extends React.Component{

    //Вызывается один раз
    //Делаем запрос на сервер, получаем список пользователей и заполняем им наш state( usersPage.users )
    componentDidMount() {
        this.props.toggleIsFetching(true);

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);//устанавливаем текущую страницу
        this.props.toggleIsFetching(true);//показывается загрузка и идет запрос на сервер

        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
            this.props.toggleIsFetching(false);//загрузка не показывается
            this.props.setUsers(data.items);//сетаем новых юзеров в массив
        });
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
                       onUnfollow = {this.props.onUnfollow}
                       onFollow = {this.props.onFollow}
                       toggleFollowingProgress = {this.props.toggleFollowingProgress}
                       followingInProgress = {this.props.followingInProgress}
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

export default connect(mapStateToProps, {onFollow, onUnfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFollowingProgress })(UsersContainer);

//     {id: 1, photoUrl:'https://vignette.wikia.nocookie.net/avatar/images/f/f4/3%D1%8521_%D0%90%D0%B0%D0%BD%D0%B3.jpg/revision/latest?cb=20110327121409&path-prefix=ru',
