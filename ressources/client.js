'use strict';
var socket = io();
var mode = 0;
var ultimatefield = new Array(225).fill(0);
var color1 = '#F1E0C5';
var color2 = '#F2545B';
var scorefield = [21, 28, 35, 42, 56, 56, 56, 56, 56, 56, 56, 42, 35, 28, 21, 28, 42, 49, 63, 77, 77, 77, 77, 77, 77, 77, 63, 49, 42, 28, 35, 49, 70, 84, 98, 98, 98, 98, 98, 98, 98, 84, 70, 49, 35, 42, 63, 84, 105, 119, 119, 119, 119, 119, 119, 119, 105, 84, 63, 42, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 42, 63, 84, 105, 119, 119, 119, 119, 119, 119, 119, 105, 84, 63, 42, 35, 49, 70, 84, 98, 98, 98, 98, 98, 98, 98, 84, 70, 49, 35, 28, 42, 49, 63, 77, 77, 77, 77, 77, 77, 77, 63, 49, 42, 28, 21, 28, 35, 42, 56, 56, 56, 56, 56, 56, 56, 42, 35, 28, 21];

var whosturn = 1;
function pclick(field) {
    var play;
    var winner = 0;
    var move = parseInt(field.id);
    //Player-mode
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
    //Qtupple-mode
    else if (mode === 2) {
        field.style.backgroundColor = color1;
        ultimatefield[move] = 1;
        winner = check(ultimatefield, move);
        if (winner !== 0) {
            declarewinner(winner);
            return 0;
        }
        play = ai(move);
        document.getElementById(play).classList.add('filled');
        document.getElementById(play).style.backgroundColor = color2;
        winner = check(ultimatefield, play);
        if (winner !== 0) {
            declarewinner(winner);
            return 0;
        }
    }
    //Computer Mode
    else if (mode === 3) {
        field.style.backgroundColor = color1;
        ultimatefield[move] = 1;
        winner = check(ultimatefield, move);
        if (winner !== 0) {
            declarewinner(winner);
            return 0;
        }

        play = 224;
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
        socket.emit('request', {currentfield: ultimatefield, });
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

function ai(playermove) {
    function evaluate(qtupple, field) {
        var O = 0;
        var X = 0;
        var nil = 0;

        var nilscore =      7;
        var Xscore =        15; // x = 1 = pc
        var XXscore =      400;
        var XXXscore =    1800;
        var XXXXscore = 100000;
        var Oscore =        35; // O = 2 = ai
        var OOscore =      800;
        var OOOscore =   15000;
        var OOOOscore = 800000;

        for (var i = 0; i<5; i++) {
            if (field[qtupple[i]] === 1) {
                X ++;
            }
            else if (field[qtupple[i]] === 2) {
                O ++;
            }
            else {
                nil ++;
            }
        }

        if (nil === 5) {
            return nilscore;
        }
        else if (X > 0 && O > 0) {
            return 0;
        }
        else if (X === 4) {
            return XXXXscore;
        }
        else if (O === 4) {
            return OOOOscore;
        }
        else if (O === 3) {
            return OOOscore;
        }
        else if (X === 3) {
            return XXXscore;
        }
        else if (O === 2) {
            return OOscore;
        }
        else if (X === 2) {
            return XXscore;
        }
        else if (O === 1) {
            return Oscore;
        }
        else if (X === 1) {
            return Xscore;
        }
    }
    function possible(index, add) {
        var subject;
        for (var i = 0; i<4; i++) {
            subject = index + i*add;
            if (add === 16) {
                if ((subject+1)%15 === 0 || subject > 209) {
                    return false;
                }
            }
            if (add === 14) {
                if (subject%15 === 0 || subject > 209) {
                    return false;
                }
            }
        }
        return true;
    }
    function update(index) {
        var oldfield = ultimatefield.slice(0);
        oldfield[index] = 0;

        //update scorefield horizontally and vertically
        var h_subject = Math.floor(index/15) * 15;
        var v_subject = index%15;
        var i;

        for (i = 0; i<10; i++) {
            var h_newvalue = evaluate([h_subject+i, h_subject+i+1,h_subject+i+2,h_subject+i+3,h_subject+i+4], ultimatefield);
            var v_newvalue = evaluate([v_subject+(i*15), v_subject+(i+1)*15,v_subject+(i+2)*15,v_subject+(i+3)*15,v_subject+(i+4)*15], ultimatefield);
            var h_oldvalue = evaluate([h_subject+i, h_subject+i+1,h_subject+i+2,h_subject+i+3,h_subject+i+4], oldfield);
            var v_oldvalue = evaluate([v_subject+(i*15), v_subject+(i+1)*15,v_subject+(i+2)*15,v_subject+(i+3)*15,v_subject+(i+4)*15], oldfield);

            for (var k=0; k<5;k++) {
                if (scorefield[h_subject+i+k] !== -1) {
                    scorefield[h_subject+i+k] = scorefield[h_subject+i+k] - h_oldvalue + h_newvalue;
                    //document.getElementById(h_subject+i+k).style.backgroundColor = 'GreenYellow';
                }
                if (scorefield[v_subject+(i+k)*15] !== -1) {
                    scorefield[v_subject+(i+k)*15] = scorefield[v_subject+(i+k)*15] - v_oldvalue + v_newvalue;
                    //document.getElementById(v_subject+(i+k)*15).style.backgroundColor = 'GreenYellow';
                }
            }
        }

        // update scorefield diagonally
        var dr_subject = index;
        var dl_subject = index;
        i=0;
        while (dr_subject%15 !== 0 && dr_subject > 14 && i<4) {
            dr_subject-=16;
            i++;
        }
        i=0;
        while ((dl_subject+1)%15 !== 0 && dl_subject > 14 && i<4) {
            dl_subject-=14;
            i++;
        }

        i=0;

        while (possible(dr_subject, 16) && i<5) {
            var dr_newvalue = evaluate([dr_subject, dr_subject+1*16,dr_subject+2*16,dr_subject+3*16,dr_subject+4*16], ultimatefield);
            var dr_oldvalue = evaluate([dr_subject, dr_subject+1*16,dr_subject+2*16,dr_subject+3*16,dr_subject+4*16], oldfield);

            for (k=0; k<5;k++) {
                if (scorefield[dr_subject+k*16] !== -1) {
                    scorefield[dr_subject+k*16] = scorefield[dr_subject+k*16] - dr_oldvalue + dr_newvalue;
                    //document.getElementById(dr_subject+k*16).style.backgroundColor = 'GreenYellow';
                }
            }

            dr_subject += 16;
            i++;
        }

        i=0;
        while (possible(dl_subject, 14) && i<5) {
            var dl_newvalue = evaluate([dl_subject, dl_subject+1*14,dl_subject+2*14,dl_subject+3*14,dl_subject+4*14], ultimatefield);
            var dl_oldvalue = evaluate([dl_subject, dl_subject+1*14,dl_subject+2*14,dl_subject+3*14,dl_subject+4*14], oldfield);

            for (k=0; k<5;k++) {
                if (scorefield[dl_subject+k*14] !== -1) {
                    scorefield[dl_subject+k*14] = scorefield[dl_subject+k*14] - dl_oldvalue + dl_newvalue;
                    //document.getElementById(dl_subject+k*14).style.backgroundColor = 'GreenYellow';
                }
            }

            dl_subject += 14;
            i++;
        }
    }

    // return best moves of scorefield
    update(playermove);
    scorefield[playermove] = -1;
    var moves = [0];
    var i;
    for (i = 0; i<225; i++) {
        if (scorefield[i] > scorefield[moves[0]]) {
            moves = [i];
        }
        else if (scorefield[i] === scorefield[moves[0]]) {
            moves.push(i);
        }
    }

    // choose randomly
    var max = moves[Math.floor(Math.random() * moves.length)];
    ultimatefield[max] = 2;
    update(max);

    scorefield[max] = -1;

    for (i = 0; i<225; i++) {
        //document.getElementById(i).innerHTML = scorefield[i];
    }
    return max;
}
