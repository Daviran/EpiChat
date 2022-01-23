import React, { useState, useEffect } from 'react';

import axios from 'axios';

import InfoChannelList from '../InfoChannelList/InfoChannelList';
import Modalchat from '../Modalchat/Modalchat';
import InfoUserList from '../InfoUserList/InfoUserList';


import './Chat.css';

export default function Chat({ id, pseudo, room, setChannelDisplay, socket }) {

    
    const [nickname, setNickname] = useState(pseudo);
    const [chosenRooms, setChosenRoom] = useState([room]);
    var roomIndex = chosenRooms.length -1;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [channels, setChannel] = useState([]);

    // const leaveRedirection = () => { 
    //     history.push("/");
    // }

    useEffect(() => {
    
        socket.emit('join', nickname, chosenRooms[roomIndex], message => {
            console.log(message);
            console.log(chosenRooms);
            console.log(socket.id)
            setMessages((list) => [...list, message]);
            getMessages(chosenRooms[roomIndex]);
        });
    
    }, [])

    const getMessages = async (currentRoom) => {
        let fetchMessages = await axios.get("http://localhost:5000/messages/");
        for (let i = 0; i < fetchMessages.data.length; i++) {
          if (fetchMessages.data[i].room === currentRoom) {
              setMessages(prevMessages => {
                return [...prevMessages, {
                    id: fetchMessages.data[i]._id,
                    room: fetchMessages.data[i].room,
                    author: fetchMessages.data[i].author,
                    message: fetchMessages.data[i].message}]
            });
          }
        }
      };

    useEffect(() => {
        socket.on('message', message => {
            console.log(message);
                setMessages((list) => [...list, message]);
                console.log(messages);
        })
    }, [socket]);

    useEffect(() => {
        socket.on('privateMessage', message => {
            console.log("SOOOOCKET: " + socket)
            console.log('PMPMPMPMPMPM: ' + message);
                setMessages((list) => [...list, message]);
                console.log(messages);
                setMessage('');
        })
    }, [socket]);

    useEffect(() => {
        console.log("OUAAAAAAH");
        socket.on('changeNickname', nickName => {
            console.log(nickName);
            setNickname(nickName[0]);
        })
    }, [socket]);

    // useEffect(() => {
    //     socket.on('join-channel', joinData => {
    //         console.log(joinData);
    //         joinRedirection(joinData.id, joinData.author, joinData.room)
    //     })
    // }, [socket]);

    useEffect(() => {
        socket.on('leave-channel', leaveData => {
            console.log(leaveData);
        })
    }, [socket]);

    useEffect(() => {
        socket.on('leave-this', leaveData => {
            console.log(leaveData);
            
            //leaveRedirection();
        })
    }, [socket]);

    const sendMessage = async (event) => {
        event.preventDefault();
        if(message !== '') {
                const messageData = {
                    room: chosenRooms[roomIndex],
                    author: nickname,
                    message: message,
                    time:
                        new Date(Date.now()).getHours() +
                        ":" + 
                        new Date(Date.now()).getMinutes(),
                    };
                await socket.emit('sendMessage', messageData, () => setMessage(''));
                const checkRegEx = /^\//;
                if(!checkRegEx.exec(messageData.message)) {
                    setMessages((list) => [...list, messageData]);
                } else {

                    const nick = /^\/nick/;
                    const list = /^\/list/;
                    const create = /^\/create/;
                    const suppression = /^\/delete/;
                    const join = /^\/join/;
                    const quit = /^\/quit/;
                    const users = /^\/users/;
                    const msg = /^\/msg/;

                    const regNick = nick.exec(message);
                    const regList = list.exec(message);
                    const regCreate = create.exec(message);
                    const regSuppression = suppression.exec(message);
                    const regJoin = join.exec(message);
                    const regQuit = quit.exec(message);
                    const regUsers = users.exec(message);
                    const regMsg = msg.exec(message);

                    const commandesData = {
                        room: chosenRooms[roomIndex],
                        author: chosenRooms[roomIndex],
                        message: '',
                        time:
                            new Date(Date.now()).getHours() +
                            ":" + 
                            new Date(Date.now()).getMinutes(),
                    };

                        if(regNick) {
                            const regNewNick = /(?<=\/nick ).[a-zà-ÿ]*/i;
                            const newNick = regNewNick.exec(regNick.input);

                            commandesData.message = 'Vous avez changé de pseudo !';
                            setMessages((list) => [...list, commandesData]);
                            setNickname(newNick);
                        }
                        else if(regList) {

                            const regNewList = /(?<=\/list ).[a-zà-ÿ]*/i;
                            const newList = regNewList.exec(regList.input);
                            console.log(newList);

                            let channelArray = []
                            if(!newList) {
                                for(let i = 0; i < channels.length; i++) {
                                    channelArray.push(channels[i].room);
                                }
                            } else {
                                for(let i = 0; i < channels.length; i++) {
                                    if(channels[i].room.includes(newList[0]) === true) {
                                        channelArray.push(channels[i].room);
                                    }
                                }
                            }
                            if(channelArray.length > 0) {
                                const channelList = channelArray.join(', ');
                                commandesData.message = channelList;
                                setMessages((list) => [...list, commandesData]);
                            } else {
                                commandesData.message = channelArray;
                                setMessages((list) => [...list, commandesData]);
                            }
                        }
                        else if(regCreate) {
                            const regNewCreate = /(?<=\/create ).[a-zà-ÿ]*/i;
                            const newCreate = regNewCreate.exec(regCreate.input);
                            const obj = {
                                id: (Math.random() * 10),
                                img: 'default.jpg',
                                room: newCreate[0],
                                creator: nickname
                            };
                            setChannel(oldRooms => [...oldRooms, obj]);
                            commandesData.message = `Salon ${newCreate} créé !`;
                            setMessages((list) => [...list, commandesData]);
                            
                        }
                        else if(regSuppression) {
                            const regNewSuppression = /(?<=\/delete ).[a-zà-ÿ]*/i;
                            const newSuppression = regNewSuppression.exec(regSuppression.input);
                            console.log(newSuppression[0]);
                            commandesData.message = `Salon ${newSuppression} supprimé !`;
                            setMessages((list) => [...list, commandesData]);
                            let chanIndex = channels.indexOf(newSuppression[0]);
                            channels.splice(chanIndex, 1);
                            setChannel(channels);
                        } else if(regJoin) {

                            const regNewJoin = /(?<=\/join ).[a-zà-ÿ]*/i;
                            const newJoin = regNewJoin.exec(regJoin.input); 

                            if(chosenRooms.includes(newJoin[0])) {
                                let chanIndex = chosenRooms.indexOf(newJoin[0]);
                                console.log(chanIndex);
                                chosenRooms.splice(chanIndex, 1);
                                setChosenRoom(chosenRooms);
                                console.log(chosenRooms);
                                setChosenRoom(oldArray => [...oldArray, newJoin[0]]);
                                console.log(chosenRooms);
                                getMessages(newJoin[0]);
                            } else {
                                setChosenRoom(oldArray => [...oldArray, newJoin[0]]);
                                socket.emit('join', nickname, newJoin[0], message => {
                                    setMessages([message]);
                                    getMessages(newJoin[0]);
                                });
                            }
                        } else if(regQuit) {
                            const regNewQuit = /(?<=\/quit ).[a-zà-ÿ]*/i;
                            const newQuit = regNewQuit.exec(regQuit.input); 

                            if(newQuit) {
                                let chanIndex = chosenRooms.indexOf(newQuit[0]);
                                chosenRooms.splice(chanIndex, 1);
                                setChosenRoom(() => chosenRooms);
                                socket.emit('leave', nickname, newQuit[0]);
                                setMessages('');
                                displayMessages();

                                    if(chosenRooms.length === 0) {
                                        setChannelDisplay(false);
                                    }

                            } else {
                                commandesData.message = "Veuillez indiquer un nom de salon valide !";
                                setMessages((list) => [...list, commandesData]);
                            }

                        } else if(regUsers) {

                            socket.emit('getChannelUsers', chosenRooms[roomIndex], (data) => {
                                commandesData.message = data;
                                setMessages((list) => [...list, commandesData]);
                            });

                        } else if(regMsg) {
                            const regNewMsg = /(?<=\/msg ).[a-zà-ÿ]*/i;
                            const newMsg = regNewMsg.exec(regMsg.input);
                            const regMessage = /^\/msg.[a-zà-ÿ]* /i;
                            const newMessage = message.replace(regMessage, '');
                            console.log(newMessage);
                            console.log("NEWMSG0: " + newMsg[0])

                            socket.emit('privateMessage', ({privNick: newMsg[0], privMSG: newMessage}), (erreur) => {
                                if(erreur){
                                    const commandesData = {
                                        room: 'Serveur',
                                        author: "Admin",
                                        message: erreur,
                                        time:
                                            new Date(Date.now()).getHours() +
                                            ":" + 
                                            new Date(Date.now()).getMinutes(),
                                    };
                                    setMessages((list) => [...list, commandesData]);
                                } else {
                                    const commandesData = {
                                        room: 'PM',
                                        author: `${nickname} à ${newMsg[0]}`,
                                        message: newMessage,
                                        time:
                                            new Date(Date.now()).getHours() +
                                            ":" + 
                                            new Date(Date.now()).getMinutes(),
                                    };
                                    setMessages((list) => [...list, commandesData]);
                                }
                            })

                        } else {
                            return;
                        }
                        // /^\/users/;
                        // /^\/msg/;
                    
                }
        }
    }

    function displayMessages() {
        let roomIndex = chosenRooms.length - 1;
        getMessages(chosenRooms[roomIndex]);
    }

    function test() {
        console.log(chosenRooms);
        console.log(chosenRooms[roomIndex]);
        console.log(messages);
    }

    return (
        <div className='outerChatContainer'>
                <InfoChannelList 
                    pseudo={nickname} 
                    salon={chosenRooms[roomIndex]} 
                    setChosenRoom={setChosenRoom} 
                    setMessages={setMessages} 
                    chosenRooms={chosenRooms} 
                    socket={socket} 
                    getMessages={getMessages} 
                    setChannel={setChannel}
                    channels={channels}/>
            <div className='innerChatContainer'>
                <Modalchat
                    getMessages={getMessages}
                    setChannelDisplay={setChannelDisplay}
                    socket={socket} 
                    room={chosenRooms[roomIndex]} 
                    pseudo={nickname} 
                    datas={messages} 
                    message={message} 
                    setMessage={setMessage} 
                    setMessages={setMessages}
                    sendMessage={sendMessage}
                    setChosenRoom={setChosenRoom} 
                    chosenRooms={chosenRooms}/>
            </div>
            <button onClick={() => test()}></button>
                {/* <InfoUserList socket={socket} pseudo={nickname} room={chosenRooms[roomIndex]} /> */}
        </div>
    )

}
