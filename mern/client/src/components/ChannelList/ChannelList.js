import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Channel from '../Channel/Channel'

export default function ChannelList() {

    const [channels, setChannel] = useState([]);
       
    useEffect(() => {
    const getChannels = async () => {
        const fetchChannels = await axios.get('http://localhost:5000/channel/');
        for(let i = 0; i < fetchChannels.data.length; i++) {
            setChannel(prevChannels => {
                return [...prevChannels, {id: fetchChannels.data[i]._id, room: fetchChannels.data[i].name, creator: fetchChannels.data[i].creator}]
            });
        }        
        };

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

    return (channels) ? (
        <div>
            {channels.map((channel) => {
                return <Channel deleteChannel={deleteChannel} key={channel.id} room={channel.room} creator={channel.creator} id={channel.id} />
            })}
        </div>
    ) : null
}
