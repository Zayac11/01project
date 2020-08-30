import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";

let MyPosts = (props) =>{

    let postsElement =
        props.postsData.map(p => <Post text={p.text} likeCount={p.likeCount} key={p.id} />)

    // создает ссылку на textarea
    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.onAddPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    {/*ссылка привязывается к textarea*/}
                    <textarea onChange={onPostChange} ref={newPostElement}
                              value={props.newPostText} />
                </div>
                <div>
                    <button onClick={ onAddPost }>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
                {/*<Post text={postsData[0].text} likeCount={postsData[0].likeCount}/>*/}
            </div>

        </div>
    );
}

export default MyPosts;