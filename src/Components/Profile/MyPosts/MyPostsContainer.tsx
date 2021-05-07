import React from 'react';
import {actions} from "../../../redux/profile-reducer";
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        postsData: state.profilePage.postsData,
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>
(mapStateToProps, {onAddPost: actions.addPostActionCreator})(MyPosts);

export default MyPostsContainer;
