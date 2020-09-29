import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import findJob from '../../../assets/images/findjob.jpg'
import noFindJob from '../../../assets/images/nofindjob.jpg'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus, ...props}) => {
    if(!profile) {
        return <Preloader />
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <div>
                    <img src={profile.photos.large} alt=""/>
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