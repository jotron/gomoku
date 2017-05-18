'use strict';
var socket = io();
var ultimatefield = new Array(225).fill(0);
var color1 = '#6fdb78';
var color2 = '#ffd863';
var Qtupple_scorefield = [21, 28, 35, 42, 56, 56, 56, 56, 56, 56, 56, 42, 35, 28, 21, 28, 42, 49, 63, 77, 77, 77, 77, 77, 77, 77, 63, 49, 42, 28, 35, 49, 70, 84, 98, 98, 98, 98, 98, 98, 98, 84, 70, 49, 35, 42, 63, 84, 105, 119, 119, 119, 119, 119, 119, 119, 105, 84, 63, 42, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 56, 77, 98, 119, 140, 140, 140, 140, 140, 140, 140, 119, 98, 77, 56, 42, 63, 84, 105, 119, 119, 119, 119, 119, 119, 119, 105, 84, 63, 42, 35, 49, 70, 84, 98, 98, 98, 98, 98, 98, 98, 84, 70, 49, 35, 28, 42, 49, 63, 77, 77, 77, 77, 77, 77, 77, 63, 49, 42, 28, 21, 28, 35, 42, 56, 56, 56, 56, 56, 56, 56, 42, 35, 28, 21];

var whosturn = 1;
function Minimax_Mode(field) {
    var move = parseInt(field.id);
    
    field.style.backgroundColor = color1;
    ultimatefield[move] = 1;
    var winner = check(ultimatefield, move);
    if (winner !== 0) {
        declarewinner(winner);
        return 0;
    }

    var play = 224;
    socket.on('minimaxanswer', function (next) {
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
    socket.emit('minimaxrequest', {currentfield: ultimatefield, });
}
function Qtupple_Mode(field) {
    var move = parseInt(field.id);
    field.style.backgroundColor = color1;
    ultimatefield[move] = 1;
    var winner = check(ultimatefield, move);
    if (winner !== 0) {
        declarewinner(winner);
        return 0;
    }
    var play = Qtupple_Algorithm(move);
    document.getElementById(play).classList.add('filled');
    document.getElementById(play).style.backgroundColor = color2;
    winner = check(ultimatefield, play);
    if (winner !== 0) {
        declarewinner(winner);
        return 0;
    }
}
function PlayervsPlayer_Mode(field) {
    var move = parseInt(field.id);
    if (whosturn === 1) {
            field.style.backgroundColor = color1;
            ultimatefield[move] = whosturn;
            whosturn = 2;
    }
    else {
        field.style.backgroundColor = color2;
        ultimatefield[move] = whosturn;
        whosturn = 1;
    }
    var winner = check(ultimatefield, move);
    if (winner !== 0) {
        declarewinner(winner);
        return 0;
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
    if (winner === 1) {
        document.getElementsByTagName('html')[0].style.animation = 'winnerone 4s infinite';
        document.getElementsByTagName('body')[0].style.animation = 'winnerone 4s infinite';
        alert("green won!");
    }
    else {
        document.getElementsByTagName('html')[0].style.animation = 'winnertwo 4s infinite';
        document.getElementsByTagName('body')[0].style.animation = 'winnertwo 4s infinite';
        alert("yellow won!");
    }
    setTimeout(function() {
        document.onclick = function() {location.reload();};
    }, 0);

}

function Qtupple_Algorithm(playermove) {
    function evaluate(qtupple, field) {
        function border(player) {
            var b = 0;
            var bt = 0;
            var difference = qtupple[3] - qtupple[2];
            if (!possible(qtupple[3], -difference) || qtupple[0] - difference === 3 - player) {
                if (qtupple[1] === player) {
                    bt++;
                }
                b++;
            }
            if (!possible(qtupple[3], difference) || qtupple[4] + difference === 3 - player) {
                if (qtupple[1] === player) {
                    bt++;
                }
                b++;
            }
            return [b, bt];
        }
        var O = 0;
        var X = 0;
        var cnil = 0; //consecutive nil
        var max_cnil = 0;
        var nil = 0;
        var b;

        var nilscore =       7;
        var Xscore =        15; // x = 1 = pc
        var XXscore =      400;
        var XXXscore =    1800; // one sided xxx
        var XXXdscore = 35000; // duble sided xxx
        var XXXXscore = 100000;
        var Oscore =        35; // O = 2 = ai
        var OOscore =      800;
        var OOOscore =   10000; // 15000
        var OOOdscore =  30000;
        var OOOOscore = 800000;

        for (var i = 0; i<5; i++) {
            var element = field[qtupple[i]];
            if (element === 1) {
                X ++;
                cnil = 0;
            }
            else if (element === 2) {
                O ++;
                cnil = 0;
            }
            else {
                cnil++;
                nil ++;
            }
            if (cnil > max_cnil) {
                max_cnil = cnil;
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
            b = border(2);
            if (max_cnil === 2 || b[0] == 2 || b[1] >= 1) {
                return OOOscore;
            }
            else {
                return OOOdscore;
            }
        }
        else if (X === 3) {
            b = border(1);
            if (max_cnil === 2 || b[0] == 2 || b[1] >= 1) {
                return XXXscore;
            }
            else {
                return XXXdscore;
            }
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

        //update Qtupple_scorefield horizontally and vertically
        var h_subject = Math.floor(index/15) * 15;
        var v_subject = index%15;
        var i;

        for (i = 0; i<=10; i++) {
            var h_newvalue = evaluate([h_subject+i, h_subject+i+1,h_subject+i+2,h_subject+i+3,h_subject+i+4], ultimatefield);
            var v_newvalue = evaluate([v_subject+(i*15), v_subject+(i+1)*15,v_subject+(i+2)*15,v_subject+(i+3)*15,v_subject+(i+4)*15], ultimatefield);
            var h_oldvalue = evaluate([h_subject+i, h_subject+i+1,h_subject+i+2,h_subject+i+3,h_subject+i+4], oldfield);
            var v_oldvalue = evaluate([v_subject+(i*15), v_subject+(i+1)*15,v_subject+(i+2)*15,v_subject+(i+3)*15,v_subject+(i+4)*15], oldfield);

            for (var k=0; k<5;k++) {
                if (Qtupple_scorefield[h_subject+i+k] !== -1) {
                    Qtupple_scorefield[h_subject+i+k] = Qtupple_scorefield[h_subject+i+k] - h_oldvalue + h_newvalue;
                    //document.getElementById(h_subject+i+k).style.backgroundColor = 'GreenYellow';
                }
                if (Qtupple_scorefield[v_subject+(i+k)*15] !== -1) {
                    Qtupple_scorefield[v_subject+(i+k)*15] = Qtupple_scorefield[v_subject+(i+k)*15] - v_oldvalue + v_newvalue;
                    //document.getElementById(v_subject+(i+k)*15).style.backgroundColor = 'GreenYellow';
                }
            }
        }

        // update Qtupple_scorefield diagonally
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
                if (Qtupple_scorefield[dr_subject+k*16] !== -1) {
                    Qtupple_scorefield[dr_subject+k*16] = Qtupple_scorefield[dr_subject+k*16] - dr_oldvalue + dr_newvalue;
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
                if (Qtupple_scorefield[dl_subject+k*14] !== -1) {
                    Qtupple_scorefield[dl_subject+k*14] = Qtupple_scorefield[dl_subject+k*14] - dl_oldvalue + dl_newvalue;
                    //document.getElementById(dl_subject+k*14).style.backgroundColor = 'GreenYellow';
                }
            }

            dl_subject += 14;
            i++;
        }
    }

    // return best moves of Qtupple_scorefield
    update(playermove);
    Qtupple_scorefield[playermove] = -1;
    var moves = [0];
    var i;
    for (i = 0; i<225; i++) {
        //document.getElementById(i).innerHTML = Qtupple_scorefield[i];
        if (Qtupple_scorefield[i] > Qtupple_scorefield[moves[0]]) {
            moves = [i];
        }
        else if (Qtupple_scorefield[i] === Qtupple_scorefield[moves[0]]) {
            moves.push(i);
        }
    }

    // choose randomly
    var max = moves[Math.floor(Math.random() * moves.length)];
    ultimatefield[max] = 2;
    update(max);

    Qtupple_scorefield[max] = -1;

    for (i = 0; i<225; i++) {
        //document.getElementById(i).innerHTML = Qtupple_scorefield[i];
    }
    return max;
}
