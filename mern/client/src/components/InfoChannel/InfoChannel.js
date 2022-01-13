import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import queryString from 'query-string';


import './InfoChannel.css';

export default function InfoChannel({ id, img, room, creator, pseudo, salon }) {

    

    return (
        <>
        { salon !== room ? (<ListGroup.Item style={{borderRight: 'solid 20px rgb(7, 12, 29)'}} className='info-channel' action href={`/chat/${id}/?pseudo=${pseudo}&room=${room}`}>
            <Image className='info-channel__image' rounded src={`/${img}`} alt='channel illustration'/><span>{room}</span>
        </ListGroup.Item>)
         :
        <ListGroup.Item style={{borderRight: 'solid 40px white'}} className='info-channel' action href={`/chat/${id}/?pseudo=${pseudo}&room=${room}`}>
            <Image className='info-channel__image' rounded src={`/${img}`} alt='channel illustration'/><span>{room}</span>
        </ListGroup.Item> }
        </>
    )
}
