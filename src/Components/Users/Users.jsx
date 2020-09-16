import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/Aang.jpg';
import {NavLink} from "react-router-dom";

let Users = (props) => {

                     //окргугление
    let pagesCount = Math.ceil(props.totalUsersCount/props.pageSize);

    let pages = [];

    for (let i = 1 ; i <= pagesCount; i++){
        pages.push(i);
    }

    return (
          <div>
              <div>
                  {/*p - строка массива*/}
                  {pages.map(p => {
                      return <span key={p.id} className={`${s.itemPage} ${props.currentPage === p && s.selectedPage}`}
                                   onClick={(e)=>{ props.onPageChanged(p) }}> {p} </span>
                  })}
              </div>
              {
                  props.users.map(u => <div key={u.id}>
                      <span>
                          <div className={s.item}>
                              <NavLink to={'/profile/' + u.id }>
                                  <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="pic"/>
                              </NavLink>
                          </div>
                          <div>
                              {u.followed
                                  ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                        onClick={() => {props.unfollow(u.id)}}>
                                    Unfollow</button>

                                  : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                        onClick={() => {props.follow(u.id)}}>
                                    Follow</button>}
                          </div>
                      </span>
                      <span>
                          <span>
                              <div>{u.name}</div>
                              <div>{u.status}</div>
                          </span>
                          <span>
                              <div>{'u.location.country'}</div>
                              <div>{'u.location.city'}</div>
                          </span>
                    </span>
                  </div>)
              }
          </div>
    );
}

export default Users;

// {u.followed
//     ? <button onClick={() => {
//         axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {withCredentials: true})
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     props.onUnfollow(u.id)
//                 }
//             });
//     }}>Unfollow</button>
//
//     : <button onClick={() => {
//         axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{}, {withCredentials: true})
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     props.onFollow(u.id);
//                 }
//             });
//     }}>Follow</button>}