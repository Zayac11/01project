import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Profile from './Components/Profile/Profile';
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import {Route} from "react-router-dom";
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import UsersContainer from './Components/Users/UsersContainer';

function App(props) {
    return (
        <div className='app-wrapper'>
            <Header />
            <NavbarContainer />
            <div className='app-wrapper-content'>

                <Route path='/dialogs' render={ () => <DialogsContainer />} />
                <Route path='/profile' render={ () => <Profile />} />
                <Route path='/users' render={ () => <UsersContainer /> } />

            </div>
        </div>
    );
}

export default App;



{/*<Route exact path='/profile' component={Profile}/>*/}
{/*<Route path='/dialogs' component={Dialogs}/>*/}
{/*<Route path='/news' component={News}/>*/}
{/*<Route path='/music' component={Music}/>*/}
{/*<Route path='/settings' component={Settings}/>*/}

// <Route path='/dialogs' render={ () => <DialogsContainer
//     // store={props.store}
//     // state={props.state.dialogsPage}
//     // dispatch={props.dispatch}
//     // addMessage={props.addMessage}
//     // updateNewMessageText={props.updateNewMessageText}
// />} />