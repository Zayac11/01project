import React, {FC} from 'react';
import s from './Post.module.css';

type PostType = {
    text: string
    likeCount: number
}

const Post: FC<PostType> = (props) => {
    return (
        <div className={s.item}>
            <img src="https://vignette.wikia.nocookie.net/avatar/images/f/f4/3%D1%8521_%D0%90%D0%B0%D0%BD%D0%B3.jpg/revision/latest?cb=20110327121409&path-prefix=ru" alt=""/>
            {props.text}
            <div>
            <span>
                {props.likeCount} like
            </span>
            </div>
        </div>
    );
}

export default Post;
