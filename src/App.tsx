import React from 'react'
import './App.css'
import {withRouter, Route, BrowserRouter, Redirect} from 'react-router-dom'
import NavbarContainer from './Components/Navbar/NavbarContainer'
import UsersPage from './Components/Users/UsersContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import {LoginPage} from './Components/Login/LoginPage'
import {connect, Provider} from 'react-redux'
import {initializeApp} from './redux/app-reducer'
import {compose} from 'redux'
import Preloader from './Components/Common/Preloader/Preloader'
import store, {AppStateType} from './redux/redux-store'
import {withSuspense} from './hoc/withSuspense'

const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'))

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

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
            <div className = 'app-wrapper'>
                <HeaderContainer />
                <NavbarContainer />
                <div className = 'app-wrapper-content'>

                    <Route path = '/dialogs' render = {() => <SuspendedDialogs />} />
                    <Route path = '/profile/:userId?' render = {() => <SuspendedProfile />} />
                    <Route path = '/users' render = {() => <UsersPage pageTitle = {'Samurai'} />} />
                    <Route path = '/login' render = {() => <LoginPage />} />
                    <Route exact path = '/' render = {() => <Redirect to = {'/profile'} />} />

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized,
    }
}

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter basename = {process.env.PUBLIC_URL}>
        <Provider store = {store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp
