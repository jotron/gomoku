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
        winner = check(ultimatefield, field.id);
        if (winner !== 0) {
            declarewinner(winner);
            return 0;
        }
    }

    //Computer Mode
    else if (mode === 2) {
        field.style.backgroundColor = color1;
        ultimatefield[field.id] = 1;
        winner = check(ultimatefield, field.id);
        if (winner !== 0) {
            declarewinner(winner);
            return 0;
        }

        var play = 224;
        socket.on('answer', function (next) {
            play = next.move;

            document.getElementById(play).classList.add('filled');
            document.getElementById(play).style.backgroundColor = color2;
            ultimatefield[play] = 2;
            winner = check(ultimatefield, play);
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

function check(field, play) {
    var whotries = field[play];
    var h_followers = 0;
    var h_subject = Math.floor(play/15) * 15;
    var v_followers = 0;
    var v_subject = play%15;
    var dr_followers = 0;
    var dr_subject = play;
    var dl_followers = 0;
    var dl_subject = play;

    while (!(dr_subject%15 === 0 || dr_subject < 15)) {
        dr_subject = dr_subject - 16;
    }
    while (!((dl_subject+1)%15 === 0 || dl_subject < 15)) {
        dl_subject = dl_subject - 14;
    }

    for (var k = 0; k < 15; k++) {
        if (field[h_subject] === whotries) {
            h_followers++;
        }
        else {
            h_followers = 0;
        }
        //
        if (field[v_subject] === whotries) {
            v_followers++;
        }
        else {
            v_followers = 0;
        }
        //
        if (field[dr_subject] === whotries) {
            dr_followers++;
        }
        else {
            dr_followers = 0;
        }
        //
        if (field[dl_subject] === whotries) {
            dl_followers++;
        }
        else {
            dl_followers = 0;
        }
        //
        if (h_followers >= 5 || v_followers >=5 || dr_followers>=5 || dl_followers>=5) {
            return whotries;
        }
        h_subject++;
        v_subject = v_subject + 15;
        if ((dr_subject+1)%15 !== 0 || dr_subject < 210) {
            dr_subject = dr_subject + 16;
        }
        if (dl_subject%15 !== 0 || dl_subject < 210) {
            dl_subject = dl_subject + 14;
        }
    }
    return 0;
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
