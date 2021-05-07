import React, { FC } from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/Aang.jpg';
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow:(userId: number) => void
    follow:(userId: number) => void
}

let User: FC<PropsType> = ({user, followingInProgress, unfollow, follow, ...props}) => {
    return (
          <div>

              <span>
                  <div className={s.item}>
                      <NavLink to={'/profile/' + user.id }>
                          <img src={user.photos.small != null ? user.photos.small : userPhoto} alt="pic"/>
                      </NavLink>
                  </div>
                  <div>
                      {user.followed
                          ? <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {unfollow(user.id)}}>
                            Unfollow</button>

                          : <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {follow(user.id)}}>
                            Follow</button>}
                  </div>
              </span>
              <span>
                  <span>
                      <div>{user.name}</div>
                      <div>{user.status}</div>
                  </span>
                  <span>
                      <div>{'user.location.country'}</div>
                      <div>{'user.location.city'}</div>
                  </span>
              </span>

          </div>
    );
}

export default User;
