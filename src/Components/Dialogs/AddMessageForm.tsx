import React from "react";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControls/FormsControls";
import { NewMessageFormValuesType } from "./Dialogs";

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType>
    = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder = 'Enter your message'
                   name='newMessageBody'
                   component = {Textarea}
                   validate = {[required, maxLength50]}
            />
            <div>
                <button>Send message</button>
            </div>
        </form>
    );
}

export default reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm)
