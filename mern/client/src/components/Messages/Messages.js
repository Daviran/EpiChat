import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';

import './Messages.css';

export default function Messages({ datas, pseudo, room }) {
    return ( datas ? (
        <ScrollToBottom className='scrollBar' >
            {datas.map((data, i) => <div key={i}><Message data={data} pseudo={pseudo} room={room}/></div>)}
        </ScrollToBottom> )
        : null 
    )
}
