import React, { useState, useEffect } from "react";

// We use Route in order to define the different routes of our application
import { BrowserRouter as Router, Route } from "react-router-dom";

// We import all the components we need in our app
// import Navbar from "./components/navbar";
// import Edit from "./components/edit";
// import Create from "./components/create";
// import RecordList from "./components/recordList";
import Banner from './components/Banner/Banner';
import ChannelList from "./components/ChannelList/ChannelList";
import CreateChannel from "./components/CreateChannel/CreateChannel";
import EditChannel from "./components/EditChannel/EditChannel";
import Chat from "./components/Chat/Chat";

import io from 'socket.io-client';

const App = () => {

  const ENDPOINT = 'http://localhost:5000'
    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io.connect(ENDPOINT);
        setSocket(newSocket);

        return () => newSocket.close();
    }, [])

  return (
    <div>
      <Router>
        <Banner />
            <Route exact path="/">
              <ChannelList socket={socket} />
            </Route>
            <Route path="/edit/:id" component={EditChannel} />
            <Route path="/chat/:id" component={Chat} />
            <Route exact path="/create">
              <CreateChannel />
            </Route>
      </Router>
    </div>
  );
};

export default App;