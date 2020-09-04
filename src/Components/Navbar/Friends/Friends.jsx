import React from 'react';
import s from './Friends.module.css'
import Person from "./Person/Person";

class Friends extends React.Component {

    friendElements = this.props.sidebarPage
        .map (m => <Person name={m.name} key={m.id} />)

    render() {
        return (
            <div className={s.friends}>
                <h3>
                    Friends
                </h3>
                <div className={s.friendElements}>
                    {this.friendElements}
                    {/*<Person name={props.sidebarPage.name}/>*/}
                </div>
            </div>
        );
    }
}

export default Friends;