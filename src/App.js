import React from 'react';
import './App.css';
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import {withRouter, Route, BrowserRouter} from "react-router-dom";
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import LoginPage from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {compose} from "redux";
import Preloader from "./Components/Common/Preloader/Preloader";
import store from "./redux/redux-store";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    // Мы не отрисовываем ничего до того момента, пока не инициализировались, поэтому при перезагрузке профиля мы его видим сразу
    render() {
        if(!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <NavbarContainer />
                <div className='app-wrapper-content'>

                    <Route path='/dialogs' render={ () => <DialogsContainer />} />
                    <Route path='/profile/:userId?' render={ () => <ProfileContainer />} />
                    <Route path='/users' render={ () => <UsersContainer /> } />
                    <Route path='/login' render={ () => <LoginPage /> } />
                    <Route exact path='/' render={ () => <LoginPage /> } />

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
    }
}

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
   // return <React.StrictMode>
        return <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    // </React.StrictMode>
}

export default SamuraiJSApp;
