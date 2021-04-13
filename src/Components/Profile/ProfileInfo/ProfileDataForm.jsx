import React from 'react';
import {createField, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import s from './ProfileInfo.module.css'
import style from './../../Common/FormsControls/FormsControls.module.css'

const  ProfileDataForm = ({handleSubmit, profile, error}) => { //Ошибка попадает в редакс форму под словом error
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
                <b>Full name</b>: {createField("Full Name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>: {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills</b>: {createField("My professionals skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me</b>: {createField("About Me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => { //keys - из объекта в массив
                return <div key={key} className={s.contact}>
                    <b>{key}:</b> {createField(key, `contacts.` + key, [], Input)}
                </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm ({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm
