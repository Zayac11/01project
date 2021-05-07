import React, {FC} from 'react';
import fetchingLoader from '../../../assets/images/tail-spin.svg';

type PropsType = {}

let Preloader: FC<PropsType> = (props) => {
    return (
        <img alt={'preloader'} src={fetchingLoader} />
    );
}

export default Preloader;
