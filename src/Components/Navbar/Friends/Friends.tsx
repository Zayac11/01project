import React, {FC} from 'react';
import {SidebarPageType} from '../../../redux/sidebar-reducer';
import s from './Friends.module.css'
import Person from "./Person/Person";

type PropsType = {
    sidebarPage: Array<SidebarPageType>
}

const Friends: FC<PropsType> = (props) => {

    let friendElements = props.sidebarPage.map(m => <Person name={m.name} key={m.id} />)

    return (
        <div className={s.friends}>
            <h3>
                Friends
            </h3>
            <div className={s.friendElements}>
                {friendElements}
            </div>
        </div>
    );

}

export default Friends;
