import React, {useState, useEffect} from 'react'
import axios from 'axios';
import InfoChannel from '../InfoChannel/InfoChannel';
import ListGroup from 'react-bootstrap/ListGroup';

export default function InfoChannelList({ pseudo }) {

    const [channels, setChannel] = useState([]);
       
    useEffect(() => {
    const getChannels = async () => {
        const fetchChannels = await axios.get('http://localhost:5000/channel/');
        for(let i = 0; i < fetchChannels.data.length; i++) {
            setChannel(prevChannels => {
                return [...prevChannels, {id: fetchChannels.data[i]._id, img: fetchChannels.data[i].img, room: fetchChannels.data[i].name, creator: fetchChannels.data[i].creator}]
            });
        }
        console.log(fetchChannels.data)    
        console.log(channels);
        console.log(pseudo);
        };

        getChannels();
    }, []);

    return (
        <ListGroup>
            <h1>InfoChannellist</h1>
            {channels.map((channel) => {
                <InfoChannel id={channel.id} img={channel.img} room={channel.room} creator={channel.creator} pseudo={pseudo} />
            })}
        </ListGroup>
    )
}
