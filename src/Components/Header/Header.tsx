import React, {FC} from 'react'
import defaultAvatar from '../../assets/images/Aang.jpg'
import s from './Header.module.css'
import {Link} from 'react-router-dom'
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../redux/auth-reducer'
import {selectCurrentUserAvatar, selectCurrentUserLogin, selectIsAuth} from '../../redux/auth-selectors'

type PropsType = {}

const {Header} = Layout

const AppHeader: FC<PropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const userAvatar = useSelector(selectCurrentUserAvatar)

    const dispatch = useDispatch()

    return (

        <Header className = 'header'>
            <Row>
                <Col span = {18}>
                    <Menu theme = 'dark' mode = 'horizontal' defaultSelectedKeys = {['2']}>
                        <Menu.Item key = '1'><Link to = '/developers'>Developers</Link></Menu.Item>
                    </Menu>
                </Col>
                {
                    isAuth
                        ?
                        <>
                            <Col span = {1}>
                                <Avatar src = {userAvatar != null ? userAvatar : defaultAvatar} />
                            </Col>
                            <Col span = {5}>
                                <span className = {s.login}> {login} - <Button
                                    onClick = {() => dispatch(logout())}>Выйти</Button> </span>
                            </Col>
                        </>
                        :
                        <Col span = {6}>
                            <Button>
                                <Link className = {s.login} to = {'/login'}>Войти</Link>
                            </Button>
                        </Col>
                }
            </Row>
        </Header>
    )
}

export default AppHeader
