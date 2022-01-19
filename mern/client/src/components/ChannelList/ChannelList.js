import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Channel from '../Channel/Channel'
import Container from 'react-bootstrap/Container';
import Chat from '../Chat/Chat';

import "bootstrap/dist/css/bootstrap.min.css";
import './ChannelList.css';

export default function ChannelList({socket}) {

    const [channels, setChannel] = useState([]);
    const [channelDisplay, setChannelDisplay] = useState(false);
    const [chatId, setChatId] = useState('');
    const [chatRoom, setChatRoom] = useState('');
    const [pseudo, setPseudo] = useState('');
       
    useEffect(() => {
    const getChannels = async () => {
        var fetchChannels = await axios.get('http://localhost:5000/channel/');
        console.log(fetchChannels);
        for(let i = 0; i < fetchChannels.data.length; i++) {
            setChannel(prevChannels => {
                return [...prevChannels, {id: fetchChannels.data[i]._id, room: fetchChannels.data[i].name, creator: fetchChannels.data[i].creator, img: fetchChannels.data[i].img}]
            });
        }
        
        var checkChannels = () => {
            channels.forEach(channel => {
                for(let i = 0; i < fetchChannels.data.length; i++) {
                    if(channel.room === fetchChannels[i].name) {
                        return
                    } else {
                        setChannel(channels.filter((el) => el.room !== channel.room));
                    }
                }   
            })
        }
        checkChannels();
    }


        getChannels();
    }, []);


    const deleteChannel = async (id) => {
        console.log(id);
        console.log(channels);
        setChannel(channels.filter((el) => el._id !== id));
        console.log(channels);
        const deletedChannel = await axios.delete("http://localhost:5000/" + id);
        const response = await deletedChannel.json();
        console.log(response);

    }

    const upDatas = (thisChatId, thisChatName, thisUserPseudo) => {
        console.log(thisChatId);
        setChatId(thisChatId);
        setChatRoom(thisChatName);
        setPseudo(thisUserPseudo);
    }

    return (channels) ? (
        channelDisplay === false ?
        (<Container className='channel-container'>
            {channels.map((channel) => {
                return <Channel deleteChannel={deleteChannel} key={channel.id} room={channel.room} creator={channel.creator} id={channel.id} img={channel.img} setChannelDisplay={setChannelDisplay} upDatas={upDatas} />
            })}
        </Container>) : (<Chat socket={socket} key={chatId} id={chatId} pseudo={pseudo} room={chatRoom} setChannelDisplay={setChannelDisplay} />)
    ) : null
}
