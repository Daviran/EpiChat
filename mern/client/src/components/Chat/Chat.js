import React, { useState, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
// import queryString from 'query-string';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';

import InfoChannelList from '../InfoChannelList/InfoChannelList';
import Modalchat from '../Modalchat/Modalchat';

import Modal from 'react-bootstrap/Modal';

import './Chat.css';

export default function Chat({ id, pseudo, room, setChannelDisplay, socket }) {

    //const [show, setShow] = useState(true);
    
    const [nickname, setNickname] = useState(pseudo);
    const [chosenRooms, setChosenRoom] = useState([room]);
    var roomIndex = chosenRooms.length -1;
    //const [salon, setSalon] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const history = useHistory();
    const joinRedirection = (id, pseudo, room) => { 
        let url = `http://localhost:3000/chat/${id}?pseudo=${pseudo}&room=${room}`;
        history.push(url);
    }

    const leaveRedirection = () => { 
        history.push("/");
    }

    // useEffect(() => {

    //     console.log("PSEUDO: " + pseudo);
    //     console.log("SALON: " + room);
        
    //     function setDatas() {
    //         setNickname(pseudo);
    //         setSalon(room);
    //         console.log(nickname);
    //         console.log(salon);
    //     }

    //     setDatas();
    //     //console.log(pseudos);

    // }, [pseudo, room, nickname, salon]);

    useEffect(() => {
       
            // socket.on('connect', () => {
            //     console.log("JE SUIS CONNECTE");
            //     console.log(socket.id);
            // });

            //const newSocket = io.connect(ENDPOINT);

        
            socket.emit('join', nickname, chosenRooms[roomIndex], message => {
                console.log(message);
                console.log(chosenRooms);
                console.log(socket.id)
                    setMessages((list) => [...list, message]);
            });

            //return () => newSocket.close();
        

    }, [])


    useEffect(() => {
        socket.on('message', message => {
            console.log(message);
                setMessages((list) => [...list, message]);
                console.log(messages);
        })
    }, [socket]);

    useEffect(() => {
        socket.on('changeNickname', nickName => {
            console.log(nickName);
            setNickname(nickName[0]);
        })
    }, [socket]);

    useEffect(() => {
        socket.on('join-channel', joinData => {
            console.log(joinData);
            joinRedirection(joinData.id, joinData.author, joinData.room)
        })
    }, [socket]);

    useEffect(() => {
        socket.on('leave-channel', leaveData => {
            console.log(leaveData);
            //setPseudo(null);
            //leaveRedirection();
        })
    }, [socket]);

    useEffect(() => {
        socket.on('leave-this', leaveData => {
            console.log(leaveData);
            
            leaveRedirection();
        })
    }, [socket]);

    const sendMessage = async (event) => {
        event.preventDefault();
        if(message !== '') {
                const messageData = {
                    room: chosenRooms[roomIndex],
                    author: nickname,
                    message: message,
                    time:
                        new Date(Date.now()).getHours() +
                        ":" + 
                        new Date(Date.now()).getMinutes(),
                    };
                await socket.emit('sendMessage', messageData, () => setMessage(''));
                setMessages((list) => [...list, messageData]);
        }
    }

    function test() {
        console.log(chosenRooms);
        console.log(chosenRooms[roomIndex]);
        console.log(messages);
    }

    return (
        <div className='outerChatContainer'>
                <InfoChannelList pseudo={nickname} salon={chosenRooms[roomIndex]} setChosenRoom={setChosenRoom} setMessages={setMessages} chosenRooms={chosenRooms} socket={socket} />
            <div className='innerChatContainer'>
                <Modalchat
                    setChannelDisplay={setChannelDisplay}
                    socket={socket} 
                    room={chosenRooms[roomIndex]} 
                    pseudo={nickname} 
                    datas={messages} 
                    message={message} 
                    setMessage={setMessage} 
                    setMessages={setMessages}
                    sendMessage={sendMessage}
                    setChosenRoom={setChosenRoom} 
                    chosenRooms={chosenRooms}/>
            </div>
            <button onClick={() => test()}></button>
                {/* <InfoUserList socket={socket} pseudos={pseudos} room={room} /> */}
        </div>
    )
}
