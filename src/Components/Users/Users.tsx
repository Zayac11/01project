import React, {FC} from 'react';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    currentPage: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void //callback ничего не возвращает
    followingInProgress: Array<number>
    unfollow: (userId:number) => void
    follow: (userId:number) => void
    users: Array<UserType>
}

let Users: FC<PropsType> = ({currentPage,onPageChanged, totalUsersCount, pageSize, users,
                 followingInProgress, unfollow, follow, ...props}) => {

    return (
          <div>
              <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                         totalItemsCount={totalUsersCount} pageSize={pageSize}
              />
              {
                  users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress} unfollow = {unfollow} follow={follow} />)
              }
          </div>
    );
}

export default Users;
