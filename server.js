var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gomoku = require("./game.js");

app.use(express.static('ressources'));

io.on('connection', function(socket){
    socket.on('request', function (data) {
        console.time('timer');
        var play = gomoku.main(data.currentfield);
        console.timeEnd('timer');
        socket.emit('answer', { move: play });
    });
});

http.listen(80, function(){
    console.log('listening on *:80');
});
