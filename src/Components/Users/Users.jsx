import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/Aang.jpg';

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
                      return <span className={`${s.itemPage} ${props.currentPage === p && s.selectedPage}`}
                                   onClick={(e)=>{ props.onPageChanged(p) }}> {p} </span>
                  })}
              </div>
              {
                  props.users.map( u => <div key={u.id} >
                    <span>
                        <div className={s.item}><img src={ u.photos.small != null ? u.photos.small : userPhoto } alt="pic"/></div>
                        <div>
                            { u.followed
                                ? <button onClick={ () => {props.onUnfollow(u.id) } }>Unfollow</button>
                                : <button onClick={ () => {props.onFollow(u.id) } } >Follow</button> }
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
                  </div> )
              }
          </div>
    );
}

export default Users;