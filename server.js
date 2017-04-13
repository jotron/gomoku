var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gomoku = require("./game.js");
var validator = require('validator');

app.use(express.static('ressources'));

io.on('connection', function(socket){
    socket.on('request', function (data) {
        var i;
        var saneinput = true;
        for (i=0; i<225; i++) {
            if (!validator.isInt(String(data.currentfield[i]))) {
                saneinput = false;
            }
        }
        if (saneinput) {
            console.time('timer');
            var play = gomoku.main(data.currentfield);
            console.timeEnd('timer');
            socket.emit('answer', { move: play });
        }
        else {
            console.log("insane input");
            console.log(data.currentfield);
        }
    });
});

http.listen(80, function(){
    console.log('listening on *:80');
});
