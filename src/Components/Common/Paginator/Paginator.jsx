import React from 'react';
import s from './Paginator.module.css';

let Paginator = ({currentPage, onPageChanged, totalUsersCount, pageSize}) => {

                     //окргугление
    let pagesCount = Math.ceil(totalUsersCount/pageSize);

    let pages = [];

    for (let i = 1 ; i <= pagesCount; i++){
        pages.push(i);
    }

    return (
          <div>
              <div>
                  {pages.map(p => {
                      return <span key={p.id} className={`${s.itemPage} ${currentPage === p && s.selectedPage}`}
                                   onClick={(e)=>{ onPageChanged(p) }}> {p} </span>
                  })}
              </div>
          </div>
    );
}

export default Paginator;
