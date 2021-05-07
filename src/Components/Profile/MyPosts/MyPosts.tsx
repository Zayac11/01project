import React, {FC} from 'react';
import AddNewPostForm, {AddPostFormValuesType} from './AddNewPostForm/AddNewPostForm';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../types/types";

export type MapPropsType = {
    postsData: Array<PostType>

}
export type DispatchPropsType = {
    onAddPost: (newPostText: string) => void
}

const MyPosts: FC<MapPropsType & DispatchPropsType> = (props => {

    let postsElement =
        props.postsData.map(p => <Post text={p.text} likeCount={p.likeCount} key={p.id}/>)

    const onSubmit = (values: AddPostFormValuesType) => {
        props.onAddPost(values.newPostText)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <AddNewPostForm onSubmit={onSubmit}/>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>

        </div>
    );
});

const MyPostMemorized = React.memo(MyPosts)

export default MyPostMemorized;
