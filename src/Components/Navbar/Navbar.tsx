import React, {FC} from 'react';
import s from './Navbar.module.css'
import Friends from "./Friends/Friends";
import {SidebarPageType} from "../../redux/sidebar-reducer";

type PropsType = {
    sidebarPage: Array<SidebarPageType>
}

const Navbar: FC<PropsType> = (props) => {
    return (
        <nav className={s.nav}>

            <div><Friends sidebarPage={props.sidebarPage}/></div>
        </nav>
    );
}

export default Navbar;
