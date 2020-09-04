import React from 'react';
import './App.css';
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import {Route} from "react-router-dom";
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";

function App(props) {
    return (
        <div className='app-wrapper'>
            <HeaderContainer />
            <NavbarContainer />
            <div className='app-wrapper-content'>

                <Route path='/dialogs' render={ () => <DialogsContainer />} />
                <Route path='/profile/:userId?' render={ () => <ProfileContainer />} />
                <Route path='/users' render={ () => <UsersContainer /> } />

            </div>
        </div>
    );
}

export default App;
