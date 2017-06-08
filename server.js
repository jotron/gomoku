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
        
        //Tests for sanity of the field-array
        var saneinput = true;
        for (i=0; i<225; i++) {
            if (!validator.isInt(String(data.currentfield[i]))) {
                saneinput = false;
            }
        }
        if (saneinput) {
            console.time('timer');
            var play = gomoku.main(data.currentfield, data.scorefield);
            console.timeEnd('timer');
            socket.emit('minimaxanswer', { move: play });
        }
        else {
            console.log("insane input");
            console.log(data.currentfield);
        }
    });
    socket.on('coop_request', function() {
        function coopdisconnection() {
            usersonline --;
            console.log(usersonline);
        }
        usersonline ++;
        console.log(usersonline);
        socket.on('disconnect', coopdisconnection );
        
        //if user clicks on another Mode while waiting for Coop
        socket.on('coop_disconnect', function() {
            coopdisconnection();
            socket.removeListener('disconnect', coopdisconnection);
        });
    });
    
    //Retransmit Moves in Online-Mode
    socket.on('onlinemove', function(move) {
        socket.broadcast.emit('onlinemove', move);
    });
    
    //Send number of players online every second to everyone
    setInterval(function() {
        socket.emit('onlinestate', {data: usersonline});
    }, 1000);
});

http.listen(80, function(){
    console.log('listening on *:80');
});
