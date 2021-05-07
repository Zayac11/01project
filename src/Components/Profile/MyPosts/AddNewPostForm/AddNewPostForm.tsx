import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringCase, Textarea} from "../../../Common/FormsControls/FormsControls";

export const maxLength10 = maxLengthCreator(10);

type PropsType = {}
export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesTypeKeys = GetStringCase<AddPostFormValuesType>

const AddNewPostForm: FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType>
    = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<AddPostFormValuesTypeKeys>("Post", "newPostText",[required, maxLength10], Textarea)}
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

export default reduxForm<AddPostFormValuesType, PropsType> ({form: 'ProfileAddNewPostForm'})(AddNewPostForm)
