const express = require('express');
const cors = require('cors');
var morgan = require('morgan');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());


const chatRoute = require('./routes/chat');;

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});


app.use('/chat', chatRoute);

let msgData = [];
let channelData;
io.on('connection', function (socket) {

    console.log('a user connected');
    socket.emit('msgData', msgData);

    socket.on('joinChannel', function (data){
        channelData = data.channel;
        socket.join(channelData)
        console.log(data)
        socket.broadcast.to(channelData).emit('newUserJoined', {username: data.username, message: 'has joined this channel.'})
    })

    socket.on('leaveChannel', function (data){
        msgData
        socket.broadcast.to(channelData).emit('userLeave', {username: data.username, message: 'has leaved this channel.'})
        socket.leave(channelData)
    })

    socket.on('sendMsg', function (data) {
        let defaultName = 'Anon'
        if (data.name) {
            defaultName = data.name
        }
        msgData.push({ username: defaultName, message: data.message })

        console.log('sendMsg', data);
        console.log('join', channelData)
        io.in(channelData).emit('newMsgData', data);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});