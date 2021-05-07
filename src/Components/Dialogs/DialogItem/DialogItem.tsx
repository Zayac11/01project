import React, {FC} from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    id: number
    name: string
}

let DialogItem: FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <img src="https://vignette.wikia.nocookie.net/avatar/images/f/f4/3%D1%8521_%D0%90%D0%B0%D0%BD%D0%B3.jpg/revision/latest?cb=20110327121409&amp;path-prefix=ru" alt="avatar"/>
            <NavLink to={'/dialogs/' + props.id} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    );
}

export default  DialogItem;
