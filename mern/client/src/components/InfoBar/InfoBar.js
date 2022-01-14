import React from 'react';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';
import io from 'socket.io-client';

import './InfoBar.css';

export default function InfoBar( { room, socket, pseudo, setMessages }) {

    function handleClick() {
        socket.emit('leave', pseudo, room)
    }

    return (
        <div className='infoBar'>
            <div className='leftInnerContainer'>
                <img className='onlineIcon' src={onlineIcon} alt='onlineStatus' />
                <h3>{room}</h3>
            </div>
            <div className='rightInnerContainer'>
                <a onClick={() => handleClick()} href='/'><img src={closeIcon} alt='closeButton' /></a>
            </div>
            
        </div>
    )
}
