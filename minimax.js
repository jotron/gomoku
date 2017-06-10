module.exports = {
    main: function (field, scorefield) {
        var play = null;
        var wanted_depth = 4;
        var evaluations = 0;
        var search_depth = 1;
        var neutralgame = true;
        var priorityfield = createpriorityfield(scorefield);

        //variable search-depth, gradually deeper
        while (search_depth <= wanted_depth) {
            //console.log(search_depth);
            neutralgame = true;
            max(search_depth, -Infinity, Infinity);
            if (!neutralgame) {
                break;
            }
            // if alway neutral game, play qtupple-algorithm
            else if (search_depth === wanted_depth) {
                play = priorityfield[0];
            }
            search_depth++;
        }

        function max(depth, alpha, beta) {
            var maxvalue = alpha;

            var i;
            var ii; //Wert im sortierten array
            for (i = 0; i<225; i++) {
                ii = priorityfield[i];
                if (field[ii] === 0) {
                    field[ii] = 2;
                    var value;
                    if (depth === 1 || field.indexOf(0) === -1 ) {
                        value = evaluate(ii, depth);
                    }
                    else {
                        value = min(depth-1, maxvalue, beta);
                    }

                    //tests for a sure lose
                    if (value !== 0 && depth === search_depth) {
                        neutralgame = false;
                    }

                    field[ii] = 0;

                    if (value > maxvalue) {
                        maxvalue = value;
                        if (maxvalue >= beta) {
                            break;
                        }

                        if (depth === search_depth) {
                            play = ii;
                        }
                    }
                }
            }
            return maxvalue;
        }

        function min(depth, alpha, beta) {
            var minvalue = beta;

            var i;
            var ii;
            for (i = 0; i<225; i++) {
                ii = priorityfield[i];
                if (field[ii] === 0) {
                    var value;
                    field[ii] = 1;

                    if (depth === 1 || field.indexOf(0) === -1 ) {
                        value = evaluate(ii, depth);
                    }
                    else {
                        value = max(depth-1, alpha, minvalue);
                    }
                    field[ii] = 0;

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
        console.log("Number of evaluations: " + String(evaluations));
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
        // dr = diagonal-right
        if (field[dr_subject] === whotries) {
            dr_followers++;
        }
        else {
            dr_followers = 0;
        }
        // dl = diagonal-left
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

// sort the qtupple-algorith-array after the best moves
function createpriorityfield(scorefield) {
    // fill an array with numbers from 0 to 224 in ES6 (Stackoveflow)
    var sorted = Array(225).fill().map((e,i)=>i);
    //custom sorting function, sorting after the score of the field in the qtupple-algorithm
    sorted.sort(function (a, b) {
        return scorefield[b] - scorefield[a];
    });
    return sorted;
}
