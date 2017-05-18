module.exports = {
    main: function (field) {
        var play = null;
        var wanted_depth = 4;
        var evaluations = 0;
        var search_depth = 1;
        var neutralgame = true;

        while (search_depth <= wanted_depth) {
            //console.log(search_depth);
            neutralgame = true;
            max(search_depth, -Infinity, Infinity);
            if (!neutralgame) {
                break;
            }
            else if (search_depth === wanted_depth) {
                var priorityfield = [112, 97, 111, 113, 127, 82, 96, 98, 110, 114, 126, 128, 142, 67, 81, 83, 95, 99, 109, 115, 125, 129, 141, 143, 157, 52, 66, 68, 80, 84, 94, 100, 108, 116, 124, 130, 140, 144, 156, 158, 172, 37, 51, 53, 65, 69, 79, 85, 93, 101, 107, 117, 123, 131, 139, 145, 155, 159, 171, 173, 187, 22, 36, 38, 50, 54, 64, 70, 78, 86, 92, 102, 106, 118, 122, 132, 138, 146, 154, 160, 170, 174, 186, 188, 202, 7, 21, 23, 35, 39, 49, 55, 63, 71, 77, 87, 91, 103, 105, 119, 121, 133, 137, 147, 153, 161, 169, 175, 185, 189, 201, 203, 217, 6, 8, 20, 24, 34, 40, 48, 56, 62, 72, 76, 88, 90, 104, 120, 134, 136, 148, 152, 162, 168, 176, 184, 190, 200, 204, 216, 218, 5, 9, 19, 25, 33, 41, 47, 57, 61, 73, 75, 89, 135, 149, 151, 163, 167, 177, 183, 191, 199, 205, 215, 219, 4, 10, 18, 26, 32, 42, 46, 58, 60, 74, 150, 164, 166, 178, 182, 192, 198, 206, 214, 220, 3, 11, 17, 27, 31, 43, 45, 59, 165, 179, 181, 193, 197, 207, 213, 221, 2, 12, 16, 28, 30, 44, 180, 194, 196, 208, 212, 222, 1, 13, 15, 29, 195, 209, 211, 223, 0, 14, 210, 224];
                //console.log("picking from list");
                for(var i = 0; i< 225; i++) {
                    if (field[priorityfield[i]] === 0) {
                        play = priorityfield[i];
                        break;
                    }
                }
            }
            search_depth++;
        }

        function max(depth, alpha, beta) {
            var maxvalue = alpha;

            var i;
            for (i = 0; i<225; i++) {
                if (field[i] === 0) {
                    field[i] = 2;
                    var value;
                    if (depth === 1 /*or keineZuegeMehr(spieler)*/) {
                        value = evaluate(i, depth);
                    }
                    else {
                        value = min(depth-1, maxvalue, beta);
                    }

                    //tests for a sure lose
                    if (value !== 0 && depth === search_depth) {
                        neutralgame = false;
                    }

                    field[i] = 0;

                    if (value > maxvalue) {
                        maxvalue = value;
                        if (maxvalue >= beta) {
                            break;
                        }

                        if (depth === search_depth) {
                            play = i;
                        }
                    }
                }
            }
            return maxvalue;
        }

        function min(depth, alpha, beta) {
            var minvalue = beta;

            var i;
            for (i = 0; i<225; i++) {
                if (field[i] === 0) {
                    var value;
                    field[i] = 1;

                    if (depth === 1 /*or keineZuegeMehr(spieler)*/) {
                        value = evaluate(i, depth);
                    }
                    else {
                        value = max(depth-1, alpha, minvalue);
                    }
                    field[i] = 0;

                    if (value < minvalue) {
                        minvalue = value;
                        if (minvalue <= alpha) {
                            break;
                        }
                    }
                }
            }

            return minvalue;
        }

        function evaluate(play, depth) {
            evaluations++;
            var a = check(field, play);
            if (a === 2) { //AI
                return 10 + depth;
            }
            if (a === 1) {
                return -10-depth;
            }
            else {
                return 0;
            }
        }

        if (play === null || play === -1) {
            console.log("Problem: play = " + String(play));
        }
        console.log(evaluations);
        console.log("roundover");
        return play;
    }
};

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
