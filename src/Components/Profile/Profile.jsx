import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

class Profile extends React.Component {

    render() {
        return (
            <div>
                <ProfileInfo />
                <MyPostsContainer
                    // store={props.store}
                    // profilePage={props.profilePage}
                    // dispatch={props.dispatch}
                    /*updateNewPostText={props.updateNewPostText}*/
                    /*addPost={props.addPost}*/
                />
            </div>
        );
    }
}

export default Profile;