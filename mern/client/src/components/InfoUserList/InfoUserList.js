import React, { useState, useEffect } from 'react';
import InfoUser from '../InfoUser/InfoUser';
import ListGroup from 'react-bootstrap/ListGroup';
import queryString from 'query-string';


export default function InfoUserList({ pseudos, location }) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log(pseudos);

        setUsers(oldUsers => [...oldUsers, pseudos]);

    }, [pseudos]);

    function handleClick(event) {
        event.preventDefault();
        console.log(users);
    }

    return (
        <ListGroup>
            <h1>Titre</h1>
            <button onClick={(event) => handleClick(event)}>click</button>
           {users.map((user) => {
               <InfoUser user={user} />
           })}
        </ListGroup>
    )
}
