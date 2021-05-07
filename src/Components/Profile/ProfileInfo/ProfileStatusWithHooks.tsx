import React, {ChangeEvent, FC, useEffect, useState} from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false); //возвращает массив
    let [status, setStatus] = useState(props.status); //возвращает массив

    useEffect( () => {
        setStatus(props.status);
    },[props.status] ); //когда props.status придет новый, хук засетает новый статус

    let activateEditMode = () => {
        setEditMode(true);
    }
    let deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
           setStatus(e.currentTarget.value);
        }
    return (
        <div>
            {!editMode &&
                <div>
                   <b>Status:</b> <span onDoubleClick={ activateEditMode }>{props.status || "----" }</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} onBlur = { deactivateEditMode } autoFocus={true} value={status}/>
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks
