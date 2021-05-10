import React, {FC, useEffect} from 'react'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import {UserSearchForm} from './UserSearchForm'
import {FilterType, follow, requestUsers, unfollow} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors'
import {useHistory} from 'react-router-dom'
import * as queryString from 'querystring'

type PropsType = {}

type QueryParamsType = {term?: string, page?: string, friend?: string}
let Users: FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFiler = filter

        if (parsed.page) actualPage = Number(parsed.page)
        if (parsed.term) actualFiler = {...actualFiler, term: parsed.term as string}
        switch (parsed.friend) {
            case 'null':
                actualFiler = {...actualFiler, friend: null}
                break
            case 'true':
                actualFiler = {...actualFiler, friend: true}
                break
            case 'false':
                actualFiler = {...actualFiler, friend: false}
                break

        }
        dispatch(requestUsers(actualPage, pageSize, actualFiler))
    }, [])
    useEffect(() => {
        const query: QueryParamsType = {}
        if (filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/developers',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

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

