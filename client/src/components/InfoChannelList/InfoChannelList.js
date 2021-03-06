import React, {useState, useEffect} from 'react'
import axios from 'axios';
import InfoChannel from '../InfoChannel/InfoChannel';
import ListGroup from 'react-bootstrap/ListGroup';

import '../InfoChannelList/InfoChannelList.css';


export default function InfoChannelList({ pseudo, salon, setChosenRoom, chosenRooms, socket, setMessages, setShow, getMessages, channels, setChannel }) {

    useEffect(() => {
    const getChannels = async () => {
        const fetchChannels = await axios.get('http://localhost:5000/channel/');
        for(let i = 0; i < fetchChannels.data.length; i++) {
            setChannel(prevChannels => {
                return [...prevChannels, {id: fetchChannels.data[i]._id, img: fetchChannels.data[i].img, room: fetchChannels.data[i].name, creator: fetchChannels.data[i].creator}]
            });
        }
        console.log(fetchChannels.data)    
        };

        getChannels();
    }, []);

    return (
        <ListGroup className='infoChannelList'>
            {channels.map((channel) => {
                return <InfoChannel 
                        getMessages={getMessages}
                        setShow={setShow}
                        key={channel.id} 
                        id={channel.id} 
                        img={channel.img} 
                        room={channel.room} 
                        creator={channel.creator} 
                        pseudo={pseudo} salon={salon} 
                        setChosenRoom={setChosenRoom}
                        chosenRooms={chosenRooms}
                        socket={socket}
                        setMessages={setMessages}/>
            })}
        </ListGroup>
    )
}
