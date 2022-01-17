import React, { useState, useEffect } from "react";
//import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import axios from "axios";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import InfoChannelList from "../InfoChannelList/InfoChannelList";
import InfoUserList from "../InfoUserList/InfoUserList";

import "./Chat.css";

export default function Chat({ location }) {
  const [pseudo, setPseudo] = useState("");
  const [pseudos, setPseudos] = useState([]);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000";

  const history = useHistory();
  const joinRedirection = (id, pseudo, room) => {
    let url = `http://localhost:3000/chat/${id}?pseudo=${pseudo}&room=${room}`;
    history.push(url);
  };

  const leaveRedirection = () => {
    history.push("/");
  };
  const getMessages = async (currentRoom) => {
    let fetchMessages = await axios.get("http://localhost:5000/messages/");
    console.log(currentRoom);
    console.log(fetchMessages.data.length)
    for (let i = 0; i < fetchMessages.data.length; i++) {
      if (fetchMessages.data[i].room === currentRoom) {
          console.log("condition ok")
          setMessages(prevMessages => {
            return [...prevMessages, {
                id: fetchMessages.data[i]._id,
                room: fetchMessages.data[i].room,
                creator: fetchMessages.data[i].author,
                message: fetchMessages.data[i].message}]
        });
      }
      else {
          console.log("condition not ok");
      }
    }
  };

  const socket = io.connect(ENDPOINT);
  useEffect(() => {
    const { pseudo, room } = queryString.parse(location.search);
    setPseudo(pseudo);
    setRoom(room);
    console.log(pseudo);
    console.log(room);
    console.log(pseudos);

    socket.on("connect", () => {});

    socket.emit("join", pseudo, room, (message) => {
      console.log(message);
      getMessages(room);
      setMessages((list) => [...list, message]);
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((list) => [...list, message]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("changeNickname", (nickname) => {
      console.log(nickname);
      setPseudo(nickname[0]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("join-channel", (joinData) => {
      console.log(joinData);
      joinRedirection(joinData.id, joinData.author, joinData.room);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("leave-channel", (leaveData) => {
      console.log(leaveData);
      //setPseudo(null);
      //leaveRedirection();
    });
  }, [socket]);

  useEffect(() => {
    socket.on("leave-this", (leaveData) => {
      console.log(leaveData);

      leaveRedirection();
    });
  }, [socket]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message !== "") {
      const messageData = {
        room: room,
        author: pseudo,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sendMessage", messageData, () => setMessage(""));
    }
  };

  return (
    <div className="outerChatContainer">
      <InfoChannelList pseudo={pseudo} salon={room} />
      <div className="innerChatContainer">
        <InfoBar
          socket={socket}
          room={room}
          pseudo={pseudo}
          setMessages={setMessages}
        />
        <Messages datas={messages} pseudo={pseudo} />
        <Input
          pseudo={pseudo}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      {/* <InfoUserList socket={socket} pseudos={pseudos} room={room} /> */}
    </div>
  );
}
