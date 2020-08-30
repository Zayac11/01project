import React from 'react';
import fetchingLoader from '../../../assets/images/tail-spin.svg';

let Preloader = (props) => {
    return (
        <img src={fetchingLoader} />
    );
}

export default Preloader;