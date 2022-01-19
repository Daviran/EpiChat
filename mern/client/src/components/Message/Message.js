import React from 'react';

import './Message.css';

export default function Message({ data, pseudo, room }) {

    let isSentByCurrentUser = false;

    if(data) {
        if(pseudo === data.author) {
            isSentByCurrentUser = true;
        }
    }

    return (data ? (
        isSentByCurrentUser ? (
            <>
            <div className='messageContainer justifyEnd'>
                <div className='messageBox backgroundBlue'>
                    {data.room !== room ? (
                        data.message !== '' ? (<p className='messageText backgroundGreen colorBlack'>{data.message}</p>) : null
                        ) : (data.message !== '' ? (<p className='messageText colorWhite'>{data.message}</p>) : null )}
                </div>
                {data.room !== room ? (
                    data.author ? (<p className='sentText pl-10'>{data.author}</p>) : null
                ) : (data.author ? (<p className='sentText pl-10'>{data.author}</p>) : null )}
            </div>
            <div className='timeContainer'>
                <span className='endTime'>{data.time}</span>
            </div>
            </>
        )
        : (
            <>
            <div className='messageContainer justifyStart'>
            {data.room !== room ? (
                <p className='sentText pr-10'><strong>{data.room} </strong> - {data.author}</p>
            ) : (<p className='sentText pr-10'>{data.author}</p>) }
                {data.room !== room ? (
                    <div className='messageBox backgroundGreen'>
                            {data.message !== '' ? (<p className='messageText colorBlack'>{data.message}</p>) : null}
                    </div>
                ) : (
                    <div className='messageBox backgroundLight'>
                            {data.message !== '' ? (<p className='messageText colorBlack'>{data.message}</p>) : null}
                    </div>) }
            </div>
            <div className='timeContainer'>
                <span className='startTime'>{data.time}</span>
            </div>
            </>
        )) : null
    )
}
