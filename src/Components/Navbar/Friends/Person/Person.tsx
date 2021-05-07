import React, {FC} from 'react';
import s from './Person.module.css'

type PropsType = {
    name: string
}

const Person: FC<PropsType> = (props) => {
    return (
        <div className={s.person}>
            <img
                src="https://vignette.wikia.nocookie.net/avatar/images/f/f4/3%D1%8521_%D0%90%D0%B0%D0%BD%D0%B3.jpg/revision/latest?cb=20110327121409&amp;path-prefix=ru"
                alt="avatar"/>
            <div>{props.name}</div>
        </div>
    );
}

export default Person;
