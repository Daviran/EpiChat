import React, { useState, useEffect } from 'react';
import InfoUser from '../InfoUser/InfoUser';
import ListGroup from 'react-bootstrap/ListGroup';

import '../InfoUserList/InfoUserList.css';

export default function InfoUserList({ pseudo, socket, room }) {

    const [roomUsers, setRoomUsers] = useState([pseudo])

    useEffect(() => {
        setTimeout(getUsersRoom, 5000);
    }, [pseudo]);

    function handleClick() {
        console.log(roomUsers);
    }

    function getUsersRoom() {
        socket.emit('get-room-users', room, (data) => {
            console.log("DATA: " + data);
            console.log("DATA: " + typeof(data));
            if(pseudo.trim().toLowerCase() === data[0]) return;
            setRoomUsers(oldData => [...oldData, data]);
        });
    }

    return (
        <ListGroup className='infoUserList'>
            <button onClick={() => handleClick()}>click</button>
            {roomUsers.map((user) => {
                return <InfoUser key={user} user={user} />
            })}
        </ListGroup>
    )
}
