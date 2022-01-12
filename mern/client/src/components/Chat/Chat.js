import React, { useState, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input';
import InfoChannelList from '../InfoChannelList/InfoChannelList';
import InfoUserList from '../InfoUserList/InfoUserList';

export default function Chat({ location }) {

   

    const [pseudo, setPseudo] = useState('');
    const [pseudos, setPseudos] = useState([]);
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const ENDPOINT = 'http://localhost:5000'

    let socket = io(ENDPOINT);

    useEffect(() => {

        const { pseudo, room } = queryString.parse(location.search);
        setPseudo(pseudo);
        setRoom(room);
        setPseudos(oldPseudos => [...oldPseudos, pseudo]);

        console.log(pseudo);
        console.log(room);
        console.log(pseudos);

        socket.on('connect', () => {
            alert("Hello " + pseudo + "!");
        })

        socket.emit('join', pseudo, room);

    }, [ENDPOINT, location.search])


    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div>
            <div>
                <InfoChannelList pseudo={pseudo} />
                <InfoBar room={room} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                <InfoUserList location={location} pseudos={pseudos} />
            </div>
        </div>
    )
}
