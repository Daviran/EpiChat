const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origins: "http://localhost:3000",
        methods: ["GET", "POST"] 
    },
})

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


// const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

const dbo = require("./db/conn");
const ObjectId = require("mongodb").ObjectId;
const { error } = require('console');

io.on('connection', (socket) => {
    console.log("SOCKETID: " + socket.id);

    socket.on('join', (pseudo, room, cb) => {
        socket.join(room);
        const id = socket.id;
        addUser({id, pseudo, room});
        const user = getUser(pseudo);
        console.log(user);

        const welcomeMessage = {
            room: room,
            author: room,
            message: `${pseudo} s'est connecté à ${room}`,
            time:
                new Date(Date.now()).getHours() +
                ":" + 
                new Date(Date.now()).getMinutes(),
        };

        socket.broadcast.to(room).emit('message', welcomeMessage);


        const messageData = {
            room: room,
            author: room,
            message: `${pseudo}, bienvenue dans le salon ${room}`,
            time:
                new Date(Date.now()).getHours() +
                ":" + 
                new Date(Date.now()).getMinutes(),
        };
        cb(messageData);

    });

    socket.on('get-room-users', (data, cb) => {
        room = data.trim().toLowerCase();
        console.log(room);
        let usersRoom = []
        usersRoom.push(getUsersInRoom(room));
        console.log("USERSROOM: " + usersRoom);
        console.log("TYPESERVER: " + typeof(usersRoom));
        cb(usersRoom);
    })

    socket.on('sendMessage', (data, cb) => {
        console.log({data});
        const nick = /^\/nick/;
        const list = /^\/list/;
        const create = /^\/create/;
        const suppression = /^\/delete/;
        const join = /^\/join/;
        const quit = /^\/quit/;
        const users = /^\/users/;
        const msg = /^\/msg/;

        const message = data.message;
        const pseudo = data.author;

        const regNick = nick.exec(message);
        const regList = list.exec(message);
        const regCreate = create.exec(message);
        const regSuppression = suppression.exec(message);
        const regJoin = join.exec(message);
        const regQuit = quit.exec(message);
        const regUsers = users.exec(message);
        const regMsg = msg.exec(message);

        let connect = dbo.getDb();


        if(regNick) {

            const regNewNick = /(?<=\/nick ).[a-zà-ÿ]*/i;
            const newNick = regNewNick.exec(regNick.input);

            const messageData = {
                room: data.room,
                author: data.room,
                message: `Abracadabra, ${pseudo} devient ${newNick}`,
                time:
                    new Date(Date.now()).getHours() +
                    ":" + 
                    new Date(Date.now()).getMinutes(),
            };

            socket.to(data.room).emit('message', messageData);

        } else if(regList) {
            
            const regNewList = /(?<=\/list ).[a-zà-ÿ]*/i;
            const newList = regNewList.exec(regList.input);            

            connect.collection("channels")
            .find({})
            .toArray(function (err, result) {
                if (err) throw err;
                
                var channels = [];

                if(newList == null) { 
                    for(let i = 0; i <result.length; i++) {
                        channels.push(result[i].name);
                    }
                } else {
                    for(let i = 0; i <result.length; i++) {
                        if(result[i].name.includes(newList) == true) {
                            channels.push(result[i].name);
                        }
                    }
                }

            var channelsData = channels.join(', ');

                const messageData = {
                    room: data.room,
                    author: data.room,
                    message: channelsData,
                    time:
                        new Date(Date.now()).getHours() +
                        ":" + 
                        new Date(Date.now()).getMinutes(),
                };

                socket.broadcast.to(data.room).emit('message', messageData);
            });

            
            

        } else if(regCreate) {

            const regNewCreate = /(?<=\/create ).[a-zà-ÿ]*/i;
            const newCreate = regNewCreate.exec(regCreate.input);
            
            let myobj = {
                name: newCreate[0],
                creator: pseudo,
                img: 'default.jpg',
              };
              connect.collection("channels").insertOne(myobj, function (err, res) {
                if (err) throw err;

                const messageData = {
                    room: data.room,
                    author: data.room,
                    message: `Salon ${newCreate} créé par ${pseudo} !`,
                    time:
                        new Date(Date.now()).getHours() +
                        ":" + 
                        new Date(Date.now()).getMinutes(),
                };

                socket.to(data.room).emit('message', messageData);
              });
           
        } else if(regSuppression) {

            const regNewSuppression = /(?<=\/delete ).[a-zà-ÿ]*/i;
            const newSuppression = regNewSuppression.exec(regSuppression.input);
            
            connect.collection("channels")
            .find({})
            .toArray(function (err, result) {
                if (err) throw err;
                
                let channelId;

                for(let i = 0; i <result.length; i++) {
                    if(result[i].name == newSuppression) {
                        channelId = result[i]._id;
                    }
                }

                let myquery = { _id: ObjectId( channelId )};
                connect.collection("channels").deleteOne(myquery, function (err, obj) {
                    if (err) throw err;
                    const messageData = {
                        room: data.room,
                        author: data.room,
                        message: `Salon ${newSuppression} supprimé par ${pseudo} !`,
                        time:
                            new Date(Date.now()).getHours() +
                            ":" + 
                            new Date(Date.now()).getMinutes(),
                    };
    
                    socket.to(data.room).emit('message', messageData);
                });

            })

        } else if(regJoin) {

            const regNewJoin = /(?<=\/join ).[a-zà-ÿ]*/i;
            const newJoin = regNewJoin.exec(regJoin.input);            

            connect.collection("channels")
            .find({})
            .toArray(function (err, result) {
                if (err) throw err;
                
                let channelId;

                
                if(newJoin == null) { 
                    const messageData = {
                        room: data.room,
                        author: data.room,
                        message: "Nom de salon incorrect",
                        time:
                            new Date(Date.now()).getHours() +
                            ":" + 
                            new Date(Date.now()).getMinutes(),
                    };
    
                    socket.to(data.room).emit('message', messageData);
                } else {
                    for(let i = 0; i <result.length; i++) {
                        if(result[i].name == newJoin) {
                            channelId = result[i]._id;
                        }
                    }

                    const joinData = {
                        id: channelId,
                        room: newJoin,
                        author: pseudo,
                    };
    
    
                    socket.emit('join-channel', joinData );

                }
            });

        } else if(regQuit) {
            const regNewQuit = /(?<=\/quit ).[a-zà-ÿ]*/i;
            const newQuit = regNewQuit.exec(regQuit.input); 

            if(newQuit) {
                socket.leave(newQuit[0]);
                removeUser(pseudo);
            

                // if(data.room != newQuit) {

                    const messageData = {
                        room: data.room,
                        author: data.room,
                        message: `${pseudo} a quitté le salon ${newQuit[0]} !`,
                        time:
                            new Date(Date.now()).getHours() +
                            ":" + 
                            new Date(Date.now()).getMinutes(),
                    };

                    socket.to(data.room).emit('message', messageData);
                    //socket.emit('leave-channel', pseudo);

                // } else if(data.room != newQuit) {
                //     socket.emit('leave-this', newQuit);
                // }
            }

        } else if(regUsers) {
            socket.on('getChannelUsers', (dataCurrentRoom, cb) => {
                const newRoom = dataCurrentRoom.trim().toLowerCase();
                const channelUsers = getUsersInRoom(newRoom);
                console.log(channelUsers);
                const channelUsersShaped = channelUsers.join(', ');
                cb(channelUsersShaped);
            })
        } else if(regMsg) {
            socket.on('privateMessage', (privateData, cb) => {
                const privateNick = privateData.privNick;
                const privateMsg = privateData.privMSG;
                console.log("privateNick: " + privateNick);
                console.log("privateMsg: " + privateMsg);
                const formatNick = privateNick.trim().toLowerCase();
                console.log("Pseudo PM: " + formatNick)
                const user = getUser(formatNick);
                if(user) {
                    const userId = user.id;
                    console.log('USERID PRIVATE MSG: ' + userId);
                    const privateMessageData = {
                        room: 'PM',
                        author: data.author,
                        message: privateMsg,
                        time:
                            new Date(Date.now()).getHours() +
                            ":" + 
                            new Date(Date.now()).getMinutes(),
                    };
                    socket.to(userId).emit('privateMessage', privateMessageData);
                    console.log("ES TU ICI PETIT SCARABEE ?");
    
                    cb();
                } else {
                    const erreur = "Utilisateur non connecté...";
                    cb(erreur);
                }
            })
        } else {
          // voir pour supprimer le messageData superflue
            let messageData = {
                room: data.room,
                author: data.author,
                message: data.message,
            }
              connect.collection("messages").insertOne(messageData, function (err, res) {
                if (err) throw err;
              });


            socket.to(data.room).emit('message', data);
        }


        cb();
    });


    socket.on('leave', (pseudo, room) => {
        console.log("SOCKETID: " + socket.id);

        socket.leave(room);
        removeUser(pseudo);

        const messageData = {
            room: room,
            author: room,
            message: `${pseudo} a quitté le salon ${room}`,
            time:
                new Date(Date.now()).getHours() +
                ":" + 
                new Date(Date.now()).getMinutes(),
        };
        socket.to(room).emit('message', messageData);
    })
    // socket.on('sendMessage', messageSent);
    // socket.on('disconnect', userLeft);


    // console.log("new connection");
    // console.log("SOCKET: " + socket);

    // socket.on('join', ({ pseudo, room }, callback) => {
    //     console.log("Hey");
    //     const { error, user } = addUser({ id: socket.id, pseudo, room });

    //     if(error) return callback(error);

    //     socket.emit('message', { user: 'admin', text: `${user.pseudo}, bienvenue dans le salon ${user.room}`});
    //     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.pseudo} s'est connecté !`})

    //     console.log("pseudo: " + pseudo);
    //     console.log("room: " + room);

    //     console.log("userPseudo: " + user.pseudo);
    //     console.log("userRoom: " + user.room);

    //     socket.join(user.room);

    //     callback();
    // })

    // socket.on('sendMessage', (message, callback) => {
    //     const user = getUser(socket.id);
    //     console.log(user);

    //     io.to(user.room).emit('message', { user: user.pseudo, text: message});

    //     callback();
    // })

    socket.on('disconnect', () => {
        console.log('User has left !');
        // const id = socket.id;
        // const user = getUser(id);
        // console.log(user.pseudo);
        // const messageData = {
        //     message: `${user} a quitté le salon`,
        //     time:
        //         new Date(Date.now()).getHours() +
        //         ":" + 
        //         new Date(Date.now()).getMinutes(),
        // };
        // socket.to(room).emit('message', messageData);
    })
});
httpServer.listen(port,()=>{
    dbo.connectToServer(function(err){
        if(err) console.error(err);
    });
});

console.log(`Server is running on port : ${port}`)