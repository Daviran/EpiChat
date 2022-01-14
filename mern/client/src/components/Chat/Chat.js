import React, { useState, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import InfoChannelList from '../InfoChannelList/InfoChannelList';
import InfoUserList from '../InfoUserList/InfoUserList';

import './Chat.css';

export default function Chat({ location }) {

   

    const [pseudo, setPseudo] = useState('');
    const [pseudos, setPseudos] = useState([]);
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:5000'

    const history = useHistory();
    const faireRedirection = (id, pseudo, room) => { 
        console.log("T'es là ?");
        let url = `http://localhost:3000/chat/${id}?pseudo=${pseudo}&room=${room}`;
        console.log("URL: " + url);
        history.push(url);
    }

    const socket = io.connect(ENDPOINT);

    useEffect(() => {

        const { pseudo, room } = queryString.parse(location.search);
        setPseudo(pseudo);
        setRoom(room);
        console.log(pseudo);
        console.log(room);
        console.log(pseudos);

        socket.on('connect', () => {
        })

        socket.emit('join', pseudo, room, message => {
            console.log(message);
            setMessages((list) => [...list, message]);
        });

    }, [ENDPOINT, location.search])


    useEffect(() => {
        socket.on('message', message => {
            console.log(message);
            setMessages((list) => [...list, message]);
        })
    }, [socket]);

    useEffect(() => {
        socket.on('changeNickname', nickname => {
            console.log(nickname);
            setPseudo(nickname[0]);
        })
    }, [socket]);

    useEffect(() => {
        socket.on('join-channel', joinData => {
            console.log(joinData);
            faireRedirection(joinData.id, joinData.author, joinData.room)
        })
    }, [socket]);

    const sendMessage = async (event) => {
        event.preventDefault();
        if(message !== '') {
            const messageData = {
                room: room,
                author: pseudo,
                message: message,
                time:
                    new Date(Date.now()).getHours() +
                    ":" + 
                    new Date(Date.now()).getMinutes(),
            };

           await socket.emit('sendMessage', messageData, () => setMessage(''));
        }
    }

    return (
        <div className='outerChatContainer'>
                <InfoChannelList pseudo={pseudo} salon={room}/>
            <div className='innerChatContainer'>
                <InfoBar socket={socket} room={room} pseudo={pseudo} setMessages={setMessages} />
                <Messages datas={messages} pseudo={pseudo} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
                {/* <InfoUserList socket={socket} pseudos={pseudos} room={room} /> */}
        </div>
    )
}
