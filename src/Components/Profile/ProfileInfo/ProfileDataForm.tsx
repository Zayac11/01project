import React, {FC} from 'react';
import {createField, GetStringCase, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from './ProfileInfo.module.css'
import style from './../../Common/FormsControls/FormsControls.module.css'
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
}

type ProfileTypeKeys = GetStringCase<ProfileType>

const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => { //Ошибка попадает в редакс форму под словом error
    return (
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
            {
                error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <b>Full name</b>: {createField<ProfileTypeKeys>("Full Name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>: {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills</b>: {createField<ProfileTypeKeys>("My professionals skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me</b>: {createField<ProfileTypeKeys>("About Me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => { //keys - из объекта в массив
                return <div key={key} className={s.contact}>
                    {/*todo: create some solution*/}
                    <b>{key}:</b> {createField(key, `contacts.` + key, [], Input)}
                </div>
            })}
            </div>
        </form>
    )
}

export default reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)
