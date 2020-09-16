import React from "react";

import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControls/FormsControls";

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
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

export const AddMessageFormRedux = reduxForm ({form: 'dialogAddMessageForm'})(AddMessageForm)