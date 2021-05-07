import React, {ChangeEvent, FC, useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/Aang.jpg';
import {ContactsType, ProfileType} from "../../../types/types";
import ProfileDataForm from './ProfileDataForm';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status:string) => void
    findJob: boolean
    findJobAC: () => void
    noFindJobAC: () => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile:ProfileType) => Promise<any>
}

const ProfileInfo: FC<PropsType> = ({profile, status, updateStatus, savePhoto, saveProfile, ...props}) => {

    let [editMode, setEditMode] = useState(false); //возвращает массив

    if(!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.files?.length) {
            savePhoto(e.currentTarget.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        saveProfile(formData)
            .then(() => {
                setEditMode(false)
            })
    }


    return (
        <div className={s.descriptionBlock}>
            <div>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt=""/>
                {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>
}

                { editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                    : <ProfileData profile={profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)}}/> }

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    );
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
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
                <b>Contacts</b>: {Object.keys(profile.contacts).map((key) => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
            })}
            </div>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}

const Contact: FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contact}>
            <b>
                {contactTitle}
            </b>: {contactValue}
        </div>
    )
}

export default ProfileInfo
