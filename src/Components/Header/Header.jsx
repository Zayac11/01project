import React from 'react';
import vk_img from "../../vk.png";
import s from './Header.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <img src={vk_img} alt="logo"/>
        </header>
    );
}

export default Header;