'use strict';
var socket = io();
var mode = 0;
var ultimatefield = new Array(225).fill(0);
var color1 = '#F1E0C5';
var color2 = '#F2545B';

var whosturn = 1;
function pclick(field) {

    var winner = 0;
    //Player Mode
    if (mode === 1) {
        if (whosturn === 1) {
            field.style.backgroundColor = color1;
            ultimatefield[field.id] = whosturn;
            whosturn = 2;
        }
        else {
            field.style.backgroundColor = color2;
            ultimatefield[field.id] = whosturn;
            whosturn = 1;
        }
        winner = check(ultimatefield);
        if (winner !== 0) {
            declarewinner(winner);
            return 0;
        }
    }

    //Computer Mode
    else if (mode === 2) {
        field.style.backgroundColor = color1;
        ultimatefield[field.id] = 1;
        winner = check(ultimatefield);
        if (winner !== 0) {
            declarewinner(winner);
            return 0;
        }

        var play = 224;
        socket.on('answer', function (next) {
            play = next.move;
            console.log(next);
            console.log(play);

            document.getElementById(play).classList.add('filled');
            document.getElementById(play).style.backgroundColor = color2;
            ultimatefield[play] = 2;
            winner = check(ultimatefield);
            if (winner !== 0) {
                declarewinner(winner);
                return 0;
            }
			document.getElementById('wholefield').style.pointerEvents = '';
            document.getElementById('loader').style.display = 'none';
        });
		
		//loading button and deactivate interactions while waiting
        document.getElementById('wholefield').style.pointerEvents = 'none';
		document.getElementById('loader').style.display = 'initial';
        socket.emit('request', {currentfield: ultimatefield});
    }
}

function check(field) {
    var winner = 0;
    // horizontal und vertikal
    var horizontal_and_vertical = function() {
        var i;
        for (i = 0; i < 15; i++) {
            var h_followers = 0;
            var h_whotries = 42;
            var v_followers = 0;
            var v_whotries = 42;
            for (var k = 0; k < 15; k++) {
                var h_subject = field[i * 15 + k];
                var v_subject = field[i + k * 15];
                if (h_subject !== 0) {
                    if (h_subject === h_whotries) {
                        h_followers++;
                    }
                    else {
                        h_whotries = h_subject;
                        h_followers = 1;
                    }
                }
                else {
                    h_whotries = 0;
                    h_followers = 0;
                }
                if (v_subject !== 0) {
                    if (v_subject === v_whotries) {
                        v_followers++;
                    }
                    else {
                        v_whotries = v_subject;
                        v_followers = 1;
                    }
                }
                else {
                    v_whotries = 0;
                    v_followers = 0;
                }
                if (h_followers >= 5) {
                    return h_whotries;
                }
                if (v_followers >= 5) {
                    return v_whotries;
                }
            }
        }
        return 0;
    };
    winner = horizontal_and_vertical();
    //diagonal
    if (winner === 0) {
        var diagonal = function() {
            var returnvalue = 0;
            //nach rechts
            var to_the_right = function(x) {
                var subject;
                var right_end = false;
                var whotries;
                var followers;
                while (!right_end) {
                    subject = field[x];
                    if (subject !== 0) {
                        if (subject === whotries) {
                            followers++;
                        }
                        else {
                            whotries = subject;
                            followers = 1;
                        }
                    }
                    else {
                        whotries = 0;
                        followers = 0;
                    }
                    if (followers >= 5) {
                        returnvalue = whotries;
                        return true;
                    }
                    if (x >= 210 || (x+1)%15 === 0) {
                        right_end = true;
                    }
                    x = x+16;
                }
                return false;
            };
            //nach links
            var to_the_left = function(x) {
                var subject;
                var left_end = false;
                var whotries;
                var followers;
                while (!left_end) {
                    subject = field[x];
                    if (subject !== 0) {
                        if (subject === whotries) {
                            followers++;
                        }
                        else {
                            whotries = subject;
                            followers = 1;
                        }
                    }
                    else {
                        whotries = 0;
                        followers = 0;
                    }
                    if (followers >= 5) {
                        returnvalue = whotries;
                        return true;
                    }
                    if (x%15 === 0 || x >= 210) {
                        left_end = true;
                    }
                    x = x+14;
                }
                return false;
            };
            var i;
            for (i=0; i<=10;i++) {to_the_right(i);}
            for (i=0; i<=10;i++) {to_the_right(i*15);}
            for (i=4; i<15;i++) {to_the_left(i);}
            for (i=1; i<=11;i++) {to_the_left((i*15)-1);}
            return returnvalue;
        };
        winner = diagonal();
    }
    return winner;
}


function declarewinner(winner) {

    var wrapper = document.getElementById("overlay");
    setTimeout(function () {

        while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
        }
        if (winner === 1) {
            wrapper.style.backgroundColor = color1;
        }
        else {
            wrapper.style.backgroundColor = color2;
        }
        var winnergif = document.createElement('img');
        if (mode == 1 || winner === 1) {
            winnergif.setAttribute('src', 'winner.gif');
        }
        else {
            winnergif.setAttribute('src', 'loser.gif');
        }
        wrapper.appendChild(winnergif);
        wrapper.classList.remove("fade");
    }, (200));

    setTimeout( function() {
        wrapper.style.cursor = 'pointer';
        wrapper.addEventListener('click', function() {
            location.reload();
        });
    }, (1000));

}
