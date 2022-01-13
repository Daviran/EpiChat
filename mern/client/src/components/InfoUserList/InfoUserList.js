import React, { useState, useEffect } from 'react';
import InfoUser from '../InfoUser/InfoUser';
import ListGroup from 'react-bootstrap/ListGroup';

import '../InfoUserList/InfoUserList.css';

export default function InfoUserList({ pseudos, location }) {

    const [users, setUsers] = useState([null]);

    useEffect(() => {
        console.log(pseudos);

        setUsers(oldUsers => [...oldUsers, pseudos]);

    }, [pseudos]);

    function handleClick(event) {
        event.preventDefault();
        console.log(users);
    }

    return (
        <ListGroup className='infoUserList'>
            <button onClick={(event) => handleClick(event)}>click</button>
           {users.map((user) => {
               return <InfoUser key={user} user={user} />
           })}
        </ListGroup>
    )
}
