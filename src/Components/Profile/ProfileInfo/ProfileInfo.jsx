import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import findJob from '../../../assets/images/findjob.jpg'
import noFindJob from '../../../assets/images/nofindjob.jpg'

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img
                    src="https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg" alt="Pic"/>
            </div>
            <div className={s.descriptionBlock}>
                <div>
                    <img src={props.profile.photos.large} alt=""/>
                </div>
                <div>
                    {props.profile.aboutMe}
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