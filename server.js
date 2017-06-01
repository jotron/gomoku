var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gomoku = require("./minimax.js");
var validator = require('validator');

app.use(express.static('ressources'));

var usersonline = 0;

io.on('connection', function(socket){
    socket.on('minimaxrequest', function (data) {
        var i;
        var saneinput = true;
        for (i=0; i<225; i++) {
            if (!validator.isInt(String(data.currentfield[i]))) {
                saneinput = false;
            }
        }
        if (saneinput) {
            console.time('timer');
            var play = gomoku.main(data.currentfield, data.scorefield, data.qplay);
            console.timeEnd('timer');
            socket.emit('minimaxanswer', { move: play });
        }
        else {
            console.log("insane input");
            console.log(data.currentfield);
        }
    });
    socket.on('coop_request', function() {
        usersonline ++;
        console.log(usersonline);
        socket.on('disconnect', function() {
            usersonline --;
            console.log(usersonline);
        });
        socket.on('coop_disconnect', function() {
            usersonline--;
            console.log(usersonline);
            //socket.off('coop_request');
        });
    });
});

http.listen(80, function(){
    console.log('listening on *:80');
});
