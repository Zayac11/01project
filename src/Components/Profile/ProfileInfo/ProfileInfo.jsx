import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/Aang.jpg';
import ProfileDataFormReduxForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, savePhoto, saveProfile, ...props}) => {

    let [editMode, setEditMode] = useState(false); //возвращает массив
    // useEffect( () => {
    //     setStatus(props.status);
    // },[props.status] ); //когда props.status придет новый, хук засетает новый статус


    if(!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData)
            .then(() => {
                setEditMode(false)
            })
        // console.log(formData)
    }

    return (
        <div className={s.descriptionBlock}>
            <div>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt=""/>
                {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>
}

                { editMode
                    ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                    : <ProfileData profile={profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)}}/> }

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>

            {/*<div className={s.findJob}>*/}
            {/*    <img src={props.findJob ? findJob : noFindJob}/>*/}
            {/*    {props.findJob ? <button onClick={() => {*/}
            {/*        props.noFindJobAC()*/}
            {/*    }}>Больше не ищу</button> : <button onClick={() => {*/}
            {/*        props.findJobAC()*/}
            {/*    }}>Найти работу</button>*/}
            {/*    }*/}
            {/*</div>*/}

        </div>
    );
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? "Yes" : "No"}
            </div>
            { profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div> }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}


const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contact}>
            <b>
                {contactTitle}
            </b>: {contactValue}
        </div>
    )
}

export default ProfileInfo
