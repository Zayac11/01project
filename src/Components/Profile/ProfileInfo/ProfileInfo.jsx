import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import findJob from '../../../assets/images/findjob.jpg'
import noFindJob from '../../../assets/images/nofindjob.jpg'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/Aang.jpg';

const ProfileInfo = ({profile, status, updateStatus, savePhoto, ...props}) => {
    if(!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div>
                    <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt=""/>
                    {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>

                <div>
                    {profile.aboutMe}
                </div>

                <div className={s.findJob}>
                    <img src={props.findJob ? findJob : noFindJob}/>
                    {props.findJob ? <button onClick={() => {
                        props.noFindJobAC()
                    }}>Больше не ищу</button> : <button onClick={() => {
                        props.findJobAC()
                    }}>Найти работу</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo