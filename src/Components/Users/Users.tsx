import React, {FC, useEffect} from 'react'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import {UserSearchForm} from './UserSearchForm'
import {actions, FilterType, follow, requestUsers, unfollow} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors'

type PropsType = {
}

let Users: FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const onFollow = (userId: number) => {
        dispatch(follow(userId))
    }
    const onUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>
            <UserSearchForm onFilterChanged = {onFilterChanged} />
            <Paginator currentPage = {currentPage} onPageChanged = {onPageChanged}
                       totalItemsCount = {totalUsersCount} pageSize = {pageSize}
            />
            {
                users.map(u => <User key = {u.id} user = {u} followingInProgress = {followingInProgress}
                                     unfollow = {onUnfollow}
                                     follow = {onFollow} />)
            }
        </div>
    )
}

export default Users

