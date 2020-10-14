import React, {useState} from 'react';
import s from './Paginator.module.css';

let Paginator = ({currentPage, onPageChanged, totalItemsCount, pageSize, portionSize = 10}) => {

    //окргугление
    let pagesCount = Math.ceil(totalItemsCount/pageSize);
    let pages = [];
    for (let i = 1 ; i <= pagesCount; i++){
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;



    return (

          <div className={s.paginator}>
              { portionNumber > 1 &&
                <button onClick={ () => { setPortionNumber(portionNumber - 1) }} >Prev</button>
              }
              {pages
                  .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                  .map(p => {
                  return <span key={p.id} className={`${s.pageNumber} ${currentPage === p && s.selectedPage}`}
                               onClick={(e)=>{ onPageChanged(p) }}>{p}</span>
              })}
              { portionNumber < portionCount &&
              <button onClick={ () => { setPortionNumber(portionNumber + 1) }} >Next</button>
              }
          </div>

    );
}

export default Paginator;
