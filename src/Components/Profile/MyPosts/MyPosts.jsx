import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder = 'Post'
                   name = 'newPostText'
                   component = {Textarea}
                   validate = {[required, maxLength10]}
            />
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

const AddNewPostFormRedux = reduxForm ({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

const MyPosts = React.memo(props => {

    let postsElement =
        props.postsData.map(p => <Post text={p.text} likeCount={p.likeCount} key={p.id}/>)

    const onSubmit = (values) => {
        props.onAddPost(values.newPostText)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <AddNewPostFormRedux onSubmit={onSubmit}/>
                </div>


            </div>
            <div className={s.posts}>
                {postsElement}
                {/*<Post text={postsData[0].text} likeCount={postsData[0].likeCount}/>*/}
            </div>

        </div>
    );
});

export default MyPosts;