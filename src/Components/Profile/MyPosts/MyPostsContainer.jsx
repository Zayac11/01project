import React from 'react';
import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onAddPost: (newPostText) => {
            dispatch(actions.addPostActionCreator(newPostText));
        },

    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

// const MyPostsContainer = (props) => {
//
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//
//                     let state = store.getState();
//
//                     let onAddPost = () => {
//                         store.dispatch(addPostActionCreator());
//                         //Через пропсы передаем диспатч, который отлавливает actions и при начатии на кнопу addPost будет return type: "ADD-POST"
//                     }
//
//                     let onPostChange = (text) => {
//                         let action = updateNewPostTextActionCreator(text);
//                         store.dispatch(action);
//                     }
//
//                     return <MyPosts onAddPost = { onAddPost }
//                                     updateNewPostText = { onPostChange }
//                                     postsData = {state.profilePage.postsData}
//                                     newPostText = {state.profilePage.newPostText}/> } }
//         </StoreContext.Consumer>
//     );
// }
