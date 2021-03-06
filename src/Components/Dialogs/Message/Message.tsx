import React, {FC} from 'react';
import s from './../Dialogs.module.css';

type PropsType = {
    message: string
}

let Message: FC<PropsType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    );
}

export default Message;
