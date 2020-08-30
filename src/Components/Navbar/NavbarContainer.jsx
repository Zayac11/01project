import React from 'react';
import s from './Navbar.module.css'
import {connect} from "react-redux";
import Navbar from "./Navbar";

let mapStateToProps = (state) => {
    return {
        sidebarPage: state.sidebar.sidebarPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {

    }
}
const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;