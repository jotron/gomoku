var a = [0, 0, 0, 0, 0]

for (var i in xxx(a)) {
    a[4] = 1;
    console.log(a[i]);
}

function xxx(b) {
    return b;
}
