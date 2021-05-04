import React, {FC} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status:string) => void
    findJob: boolean
    findJobAC: () => void
    noFindJobAC: () => void
    isOwner: boolean
    savePhoto: (file:any) => void
    saveProfile: (profile:ProfileType) => Promise<any>
}

const Profile: FC<PropsType> = (props) => {
    return (

        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         findJob={props.findJob}
                         findJobAC={props.findJobAC}
                         noFindJobAC={props.noFindJobAC}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;
