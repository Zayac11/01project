import React from 'react';
import {connect} from 'react-redux';
import {
    onFollow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    onUnfollow
} from '../../redux/users-reducer';
import * as axios from 'axios';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';

class UsersContainer extends React.Component{

    //Вызывается один раз
    //Делаем запрос на сервер, получаем список пользователей и заполняем им наш state( usersPage.users )
    //Ставим условие if, чтобы новые пользователи добавлялись в массив, если state пустой
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);//устанавливаем текущую страницу
        this.props.toggleIsFetching(true);//показывается загрузка и идет запрос на сервер
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false);//загрузка не показывается
            this.props.setUsers(response.data.items);//сетаем новых юзеров в массив
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
                       // isFetching = {this.props.isFetching}
                       onPageChanged = {this.onPageChanged}
                       onUnfollow = {this.props.onUnfollow}
                       onFollow = {this.props.onFollow}
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
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         onFollow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         onUnfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         },
//     }
// }

export default connect(mapStateToProps, {onFollow, onUnfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching })(UsersContainer);

//     {id: 1, photoUrl:'https://vignette.wikia.nocookie.net/avatar/images/f/f4/3%D1%8521_%D0%90%D0%B0%D0%BD%D0%B3.jpg/revision/latest?cb=20110327121409&path-prefix=ru',
