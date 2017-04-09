module.exports = {
    main: function (field) {
        var play = null;
        var wanted_depth = 3;
        max(wanted_depth, -Infinity, Infinity);

        function max(depth, alpha, beta) {
            if (depth === 0/*or keineZuegeMehr(spieler)*/) {

                return evaluate(depth);
            }
            var maxvalue = alpha;

            var surelose = true;
            var neutralgame = true;
            var maybeplay = 103;

            var i;
            for (i = 0; i<225; i++) {

                if (field[i] === 0) {
                    field[i] = 2;
                    var value = min(depth-1, maxvalue, beta);

                    //tests for a sure lose
                    if (value[0] !== -10) {
                        surelose = false;
                    }
                    if (value[0] !== 0) {
                        neutralgame = false;
                    }

                    field[i] = 0;

                    if (value[0] > maxvalue) {
                        maxvalue = value[0];
                        if (maxvalue >= beta) {
                            break;
                        }

                        if (depth === wanted_depth) {
                            play = i;
                            maybeplay = value[1];
                        }
                    }
                }
            }

            if (surelose) {
                play = maybeplay;
            }
            else if (neutralgame) {
                var priorityfield = [112, 97, 111, 113, 127, 82, 96, 98, 110, 114, 126, 128, 142, 67, 81, 83, 95, 99, 109, 115, 125, 129, 141, 143, 157, 52, 66, 68, 80, 84, 94, 100, 108, 116, 124, 130, 140, 144, 156, 158, 172, 37, 51, 53, 65, 69, 79, 85, 93, 101, 107, 117, 123, 131, 139, 145, 155, 159, 171, 173, 187, 22, 36, 38, 50, 54, 64, 70, 78, 86, 92, 102, 106, 118, 122, 132, 138, 146, 154, 160, 170, 174, 186, 188, 202, 7, 21, 23, 35, 39, 49, 55, 63, 71, 77, 87, 91, 103, 105, 119, 121, 133, 137, 147, 153, 161, 169, 175, 185, 189, 201, 203, 217, 6, 8, 20, 24, 34, 40, 48, 56, 62, 72, 76, 88, 90, 104, 120, 134, 136, 148, 152, 162, 168, 176, 184, 190, 200, 204, 216, 218, 5, 9, 19, 25, 33, 41, 47, 57, 61, 73, 75, 89, 135, 149, 151, 163, 167, 177, 183, 191, 199, 205, 215, 219, 4, 10, 18, 26, 32, 42, 46, 58, 60, 74, 150, 164, 166, 178, 182, 192, 198, 206, 214, 220, 3, 11, 17, 27, 31, 43, 45, 59, 165, 179, 181, 193, 197, 207, 213, 221, 2, 12, 16, 28, 30, 44, 180, 194, 196, 208, 212, 222, 1, 13, 15, 29, 195, 209, 211, 223, 0, 14, 210, 224];

                for(i = 0; i< 225; i++) {
                    if (field[priorityfield[i]] === 0) {
                        play = priorityfield[i];
                        break;
                    }
                }
            }
            return maxvalue;
        }

        function min(depth, alpha, beta) {
            if (depth === 0/*or keineZuegeMehr(spieler)*/) {
                return [evaluate(depth), -1];
            }
            var minvalue = beta;
            var minindex = 100;

            var i;
            for (i = 0; i<225; i++) {

                if (field[i] === 0) {
                    field[i] = 1;
                    var value = max(depth-1, alpha, minvalue);
                    field[i] = 0;

                    if (value < minvalue) {

                        minvalue = value;
                        minindex = i;
                        if (minvalue <= alpha) {
                            break;
                        }
                    }
                }
            }

            return [minvalue, minindex];
        }

        function evaluate(depth) {
            var a = check(field);
            if (a === 2) {
                return 10 - depth;
            }
            if (a === 1) {
                return depth-10;
            }
            else {
                return 0;
            }
        }

        if (play === null || play === -1) {
            alert("Problem: play = " + String(play));
        }
        console.log("roundover");
        return play;
    }
};

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
