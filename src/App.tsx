import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import {Breadcrumb, Layout, Menu} from 'antd'
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons'
import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import UsersPage from './Components/Users/UsersContainer'
import {LoginPage} from './Components/Login/LoginPage'
import {connect, Provider} from 'react-redux'
import {initializeApp} from './redux/app-reducer'
import {compose} from 'redux'
import Preloader from './Components/Common/Preloader/Preloader'
import store, {AppStateType} from './redux/redux-store'
import {withSuspense} from './hoc/withSuspense'
import {logout} from './redux/auth-reducer'
import AppHeader from './Components/Header/Header'

const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const {SubMenu} = Menu
const {Content, Footer, Sider} = Layout

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('some error occured')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <Layout>
                <AppHeader />
                <Content style = {{padding: '0 50px'}}>
                    <Breadcrumb style = {{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className = 'site-layout-background' style = {{padding: '24px 0'}}>
                        <Sider className = 'site-layout-background' width = {200}>
                            <Menu
                                mode = 'inline'
                                // defaultSelectedKeys = {['1']}
                                style = {{height: '100%'}}
                            >
                                <SubMenu key = 'sub1' icon = {<UserOutlined />} title = 'My Profile'>
                                    <Menu.Item key = '1'><Link to = '/profile'>Profile</Link></Menu.Item>
                                    <Menu.Item key = '2'><Link to = '/dialogs'>Messages</Link></Menu.Item>
                                    <Menu.Item key = '3'><Link to = '/news'>News</Link></Menu.Item>
                                    <Menu.Item key = '4'><Link to = '/music'>Music</Link></Menu.Item>
                                    <Menu.Item key = '5'><Link to = '/settings'>Settings</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key = 'sub2' icon = {<LaptopOutlined />} title = 'Developers'>
                                    <Menu.Item key = '6'><Link to = '/developers'>Users</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key = 'sub3' icon = {<NotificationOutlined />} title = 'subnav 3'>
                                    <Menu.Item key = '7'><Link to = '/chat'>Chat</Link></Menu.Item>
                                    <Menu.Item key = '8'>option10</Menu.Item>
                                    <Menu.Item key = '9'>option11</Menu.Item>
                                    <Menu.Item key = '10'>option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style = {{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route path = '/dialogs' render = {() => <SuspendedDialogs />} />
                                <Route path = '/profile/:userId?' render = {() => <SuspendedProfile />} />
                                <Route path = '/developers' render = {() => <UsersPage pageTitle = {'Samurai'} />} />
                                <Route path = '/login' render = {() => <LoginPage />} />
                                <Route exact path = '/' render = {() => <Redirect to = {'/profile'} />} />
                                <Route exact path = '/chat' render = {() => <SuspendedChatPage />} />
                                <Route exact path = '*' render = {() => <div>404 not found</div>} />
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style = {{textAlign: 'center'}}>Samurai Social Network 2020</Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized,
        userAvatar: state.auth.userAvatar,
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        id: state.auth.id,
    }
}

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp, logout}))(App)

const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter basename = {process.env.PUBLIC_URL}>
        <Provider store = {store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp
