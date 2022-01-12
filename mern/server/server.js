const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origins: ["*"],
        methods: ["GET", "POST"] 
    }
})

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


// const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

const dbo = require("./db/conn");
const { error } = require('console');


io.on('connection', socket => {

    socket.on('join', (pseudo, room) => {
       
        socket.emit('message', { user: 'admin', text: `${pseudo}, bienvenue dans le salon ${room}`});
        socket.broadcast.to(room).emit('message', { user: 'admin', text: `${pseudo} s'est connecté !`})

    });

    socket.on('sendMessage', (message, callback) => {
        socket.broadcast.emit('message', message);

        callback();
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

    // socket.on('disconnection', () => {
    //     console.log('User has left !');
    // })
})

httpServer.listen(port,()=>{
    dbo.connectToServer(function(err){
        if(err) console.error(err);
    });
});
console.log(`Server is running on port : ${port}`)
// io = require('socket.io')(server);


    // Middleware

//     app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())


// io.on('connection', (socket) => {
//     var socket_user = { "tmp_username": null, "username": null, "email": null, "id": null, "is_admin":null };

//     // arrivée d'un client
//     socket.on('nouveau_client', (pseudo) => {
//         socket_user.tmp_username = pseudo
//         socket.emit('nouveau_client', "Bienvenue " + pseudo + " sur ircEpi")
//     })


//     //register du client
//     socket.on('register', (user) => {
//         var email = user.email
//         var username = user.username
//         var password = user.password
//         connection.query('INSERT INTO users SET email = ?, username = ?, password = ?, is_admin = ?', [
//             email,
//             username,
//             password,
//             0]
//         );
//         socket.emit('register', "Votre compte a bien été créé");
//     })

//     //login du client
//     socket.on('login', (user) => {
//         var email = user.email
//         var password = user.password
//         connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function (err, rows, fields) {
//             if (rows.length === 1) {
//                 socket_user.username = rows[0].username
//                 socket_user.email = rows[0].email
//                 socket_user.id = rows[0].id
//                 socket_user.is_admin = rows[0].is_admin
//                 socket.emit('login', socket_user)
//             } else {
//                 console.log("mauvais mdp")
//             }
//         })
//     })

//     //channel

//     var channel_name;

//     socket.on('join-channel', (channel) => {
//         if (socket_user.username == null)
//             socket_user.username = socket_user.tmp_username;
//         channel_name = channel
//         socket.join(channel)
//         socket.emit('join-channel', "Vous avez rejoint le channel "+channel)
//         socket.in(channel_name).broadcast.emit('join-channel', socket_user.username + " a rejoint le channel " + channel)
//     })

//     socket.on('leave-channel', (channel) => {
//         socket.leave(channel)
//         // socket.emit('join-channel', "Vous avez rejoint le channel "+channel)
//         socket.in(channel).broadcast.emit('leave-channel', socket_user.username + " a quitté le channel " + channel)
//     })

//     socket.on('get-channels', () => {
//         var channels = []
//         connection.query('SELECT * FROM channels', function (err, rows, fields) {
//             for (i = 0; i < rows.length; i++) {
//                 var aChannel = {name: null, created_by: null}
//                 aChannel.name = rows[i].name
//                 aChannel.created_by = rows[i].created_by
//                 channels.push(aChannel)
//             }
//             socket.emit('get-channels', channels)
//             socket.broadcast.emit('get-channels', channels)
//         })

//     })

//     socket.on('new-channel', (channel) => {
//         if (socket_user.username == null)
//             socket_user.username = socket_user.tmp_username;
//         if (channel === '') {
//             socket.emit('error', 'Le nom du channel ne peut pas être vide.')
//         } else {
//             channel_name = channel
//             connection.query('INSERT INTO channels SET name = ?, created_by = ?', [
//                 channel,
//                 socket_user.username
//             ], function (err) {
//                 if (err) {
//                     socket.emit('error', err.code)
//                 } else {
//                     socket.emit('new-channel', channel, socket_user)
//                 }
//             })
//         }
//     })

//     socket.on('delete-channel', (channel) => {
//         if (socket_user.username == null)
//             socket_user.username = socket_user.tmp_username;
//         if (channel === '') {
//             socket.emit('error', 'Le nom du channel ne peut pas être vide.')
//         } else {
//             connection.query('DELETE FROM channels WHERE name = ?', [
//                 channel
//             ], function (err) {
//                 if (err) {
//                     socket.emit('error', err.code)
//                 } else {
//                     socket.emit('delete-channel', channel, socket_user)
//                 }
//             })
//         }
//     })

//     socket.on('rename-channel', (prevChannel, channel) => {
//         console.log("channel : ", channel);
//         console.log("prevchannel : ", prevChannel);
//         if (socket_user.username == null)
//             socket_user.username = socket_user.tmp_username;
//         if (channel === '' || prevChannel === '') {
//             socket.emit('error', 'Le nom du channel ne peut pas être vide.')
//         } else {
//             connection.query('UPDATE channels SET name = ? WHERE name = ?', [
//                 channel,
//                 prevChannel
//             ], function (err) {
//                 if (err) {
//                     socket.emit('error', err.code)
//                 } else {
//                     socket.emit('rename-channel', channel, socket_user)
//                 }
//             })
//         }
//     })

//     socket.on('new-message', (message) => {
//         var date =  new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
//         if (socket_user.username == null)
//             socket_user.username = socket_user.tmp_username;
//         connection.query('INSERT INTO messages SET message = ?, created_at = ?, channel = ?, created_by = ?', [
//             message,
//             date,
//             channel_name,
//             socket_user.username
//         ], function (err) {
//             if (err) {
//                 socket.in(channel_name).emit('error', err)
//             } else {
//                 socket.emit('new-message', { message: message, created_at: date, created_by: socket_user.username })
//                 socket.broadcast.in(channel_name).emit('new-message', { message: message, created_at: date, created_by: socket_user.username })
//             }
//         })
//     })


//     socket.on('prev-msgs', () => {
//         console.log('je rentre dans prev msgs')
//         console.log(channel_name)
//         var messages = []

//         connection.query('SELECT message, created_by, created_at FROM messages WHERE channel= ? ORDER BY id', [
//             channel_name
//         ],
//             function (err, rows, fields) {
//                 for (i = 0; i < rows.length; i++) {
//                     var tmp_message = {
//                         message: null,
//                         created_at: null,
//                         created_by: null
//                     }
//                     tmp_message.message = rows[i].message;
//                     tmp_message.created_by = rows[i].created_by;
//                     tmp_message.created_at = (rows[i].created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '');;
//                     messages.push(tmp_message);
//                 }
//                 socket.emit('prev-msgs', messages)
//             })

//     })

// })
