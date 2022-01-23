import React, {useState } from 'react';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

import './InfoBar.css';

export default function InfoBar( { room, socket, pseudo, setMessages, setChosenRoom, chosenRooms, setSalon, setShow, setChannelDisplay, getMessages }) {

    const [check, setCheck] = useState(false);

    function handleClick(chan) {
        chosenRooms.pop() 
        setChosenRoom(() => chosenRooms);
        socket.emit('leave', pseudo, chan);
        setMessages('');
        displayMessages();

        setCheck(true);

        if(chosenRooms.length === 0) {
            setChannelDisplay(false);
        }
        // if(chosenRooms === undefined && room === null) {
        //     setShow(false);
        //     setMessages([null]);
        //     return;
        // } else if(chosenRooms === undefined) {
        //     socket.emit('leave', pseudo, room);
        //     setSalon(null);
        //     setCheck(true);
        //     setShow(false);
        //     setMessages([null]);
        // } else {
        //     socket.emit('leave', pseudo, chosenRooms);
        //     setChosenRoom(null);
        //     setCheck(true);
        //     setMessages([null]);
        // }
    }

    function displayMessages() {
        console.log(chosenRooms);
        console.log(room);
        let roomIndex = chosenRooms.length - 1;
        console.log(roomIndex);
        getMessages(chosenRooms[roomIndex]);
    }

    window.onbeforeunload = closingCode;
    function closingCode() {
        if(check) {
            chosenRooms.pop()
            setChosenRoom(oldArray => [oldArray, chosenRooms]);
            socket.emit('leave', pseudo, room);

            if(chosenRooms.length === 0) {
                setChannelDisplay(false);
            }
            // if(chosenRooms === undefined && room === null) {
            //     setShow(false);
            //     setMessages([null]);
            //     return;
            // } else if(chosenRooms === undefined) {
            //     socket.emit('leave', pseudo, room);
            //     setSalon(null);
            //     setShow(false);
            //     setMessages([null]);
            // } else {
            //     socket.emit('leave', pseudo, chosenRooms);
            //     setChosenRoom(null);
            //     setMessages([null]);
            // }
        }
        return null;
    }

    return (
        <div className='infoBar'>
            <div className='leftInnerContainer'>
                <img className='onlineIcon' src={onlineIcon} alt='onlineStatus' />
                <h3>{room}</h3>
            </div>
            <div className='rightInnerContainer'>
                <img className='closeButton' onClick={() => handleClick(room)} src={closeIcon} alt='closeButton' />
            </div>
            
        </div>
    ) 
    //: null
}
