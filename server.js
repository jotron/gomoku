var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gomoku = require("./game.js");

app.use(express.static('ressources'));

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('request', function (data) {
        var play = gomoku.main(data.currentfield);
        console.log(play);
        socket.emit('answer', { move: play });
    });
});

http.listen(80, function(){
    console.log('listening on *:80');
});
