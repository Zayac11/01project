import React from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {AppStateType} from "../../redux/redux-store";
import {SidebarPageType} from "../../redux/sidebar-reducer";

type MapPropsType = {
    sidebarPage: Array<SidebarPageType>
}

let mapStateToProps = (state: AppStateType) => {
    return {
        sidebarPage: state.sidebar.sidebarPage
    }
}

const NavbarContainer = connect<MapPropsType, {}, {}, AppStateType>(mapStateToProps)(Navbar);

export default NavbarContainer;
