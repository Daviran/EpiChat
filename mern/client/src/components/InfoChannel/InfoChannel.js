import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';


import './InfoChannel.css';

export default function InfoChannel({ id, img, room, creator, pseudo, salon, setChosenRoom, chosenRooms, socket, setMessages, setShow }) {

    function handleClick(chan) {
        console.log("CHAN: " + chan)
        if(chosenRooms.includes(chan)) {
            console.log("CHAN SI INCLUDE: " + chan)
            let chanIndex = chosenRooms.indexOf(chan);
            console.log(chanIndex);
            chosenRooms.splice(chanIndex, 1);
            setChosenRoom(chosenRooms);
            console.log(chosenRooms);
            setChosenRoom(oldArray => [...oldArray, chan]);
            console.log(chosenRooms);
        } else {
            setChosenRoom(oldArray => [...oldArray, chan]);
            socket.emit('join', pseudo, room, message => {
                setMessages([message]);
            });
        }
        // let check = true;
        // console.log(chan);
        // if(chosenRooms !== undefined && chosenRooms === chan) check = false;
        // if(check === true) {
        //     socket.emit('join', pseudo, room, message => {
        //         console.log(message);
        //         console.log(chosenRooms);
        //         setMessages((list) => [list, message]);
        //         setChosenRoom(chan);
        //         console.log(chosenRooms);
        //         setShow(true);
        //     });
        // } else {
        //     return;
        //}
    }

    return (
        <>
        { salon !== room ? (<ListGroup.Item style={{borderRight: 'solid 20px rgb(7, 12, 29)'}} className='info-channel' onClick={() => handleClick(room)} >
            <Image className='info-channel__image' rounded src={`/${img}`} alt='channel illustration'/><span>{room}</span>
        </ListGroup.Item>)
         :
        <ListGroup.Item style={{borderRight: 'solid 40px white'}} className='info-channel' onClick={() => handleClick(room)} >
            <Image className='info-channel__image' rounded src={`/${img}`} alt='channel illustration'/><span>{room}</span>
        </ListGroup.Item> }
        </>
    )
}
