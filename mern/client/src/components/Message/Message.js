import React from 'react';

import './Message.css';

export default function Message({ data, pseudo }) {

    let isSentByCurrentUser = false;


    if(pseudo === data.author) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ? (
            <>
            <div className='messageContainer justifyEnd'>
                <div className='messageBox backgroundBlue'>
                    <p className='messageText colorWhite'>{data.message}</p>
                </div>
                <p className='sentText pl-10'>{data.author}</p>
            </div>
            <div className='timeContainer'>
                <span className='endTime'>{data.time}</span>
            </div>
            </>
        )
        : (
            <>
            <div className='messageContainer justifyStart'>
                <p className='sentText pr-10'>{data.author}</p>
                <div className='messageBox backgroundLight'>
                    <p className='messageText colorDark'>{data.message}</p>
                </div>
            </div>
            <div className='timeContainer'>
                <span className='startTime'>{data.time}</span>
            </div>
            </>
        )
    )
}
