import React, {FC} from 'react'
import {useSelector} from 'react-redux'
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'
import {getIsFetching} from '../../redux/users-selectors'

type UsersPagePropsType = {
    pageTitle: string
}

const UsersPage: FC<UsersPagePropsType> = ( props ) => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            { isFetching ? <Preloader /> : null } {/*svg картинка загрузки*/ }
            <h2>{ props.pageTitle }</h2>
            <Users />
        </>
    )
}

export default UsersPage
