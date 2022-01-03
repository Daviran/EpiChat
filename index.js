const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
io = require('socket.io')(server);

server.listen(8080);
