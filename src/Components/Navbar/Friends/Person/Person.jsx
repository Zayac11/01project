import React from 'react';
import s from './Person.module.css'

class Person extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.person}>
                <img src="https://vignette.wikia.nocookie.net/avatar/images/f/f4/3%D1%8521_%D0%90%D0%B0%D0%BD%D0%B3.jpg/revision/latest?cb=20110327121409&amp;path-prefix=ru" alt="avatar"/>
                <div>{this.props.name}</div>
            </div>
        );
    }
}

export default Person;