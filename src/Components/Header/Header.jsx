import React from 'react';
import vk_img from "../../vk.png";
import defaultAvatar from '../../assets/images/Aang.jpg'
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src={vk_img} alt="logo"/>

            <div className={s.loginBlock}>
                <img src={props.userAvatar != null ? props.userAvatar : defaultAvatar} alt=""/>

                {props.isAuth
                    ? <div> {props.login} - <button onClick={props.logout}>logout</button> </div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;