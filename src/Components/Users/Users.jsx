import React from 'react';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

let Users = ({currentPage,onPageChanged, totalUsersCount, pageSize, users,
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
