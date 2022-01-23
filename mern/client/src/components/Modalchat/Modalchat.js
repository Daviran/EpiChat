import React from 'react';
import Modal from 'react-bootstrap/Modal';

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

export default function Modalchat({socket, room, pseudo, setMessage, datas, message, sendMessage, setMessages, chosenRooms, setChosenRoom, setSalon, setShow, setChannelDisplay, getMessages}) {

    
    return (
            <>
                <InfoBar 
                    getMessages={getMessages}
                    socket={socket} 
                    room={room} 
                    pseudo={pseudo} 
                    setMessages={setMessages} 
                    chosenRooms={chosenRooms} 
                    setChosenRoom={setChosenRoom} 
                    setSalon={setSalon} 
                    setShow={setShow}
                    setChannelDisplay={setChannelDisplay} />
                <Messages datas={datas} pseudo={pseudo} room={room}/>
                <Input pseudo={pseudo} message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </>
    )
}
