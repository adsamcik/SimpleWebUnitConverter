function readableMilimeters(mm) {
    function print(mm, cm, m, km) {
        var string = "";
        if (km != 0)
            string += km + " km ";
        if (m != 0)
            string += m + " m ";
        if (cm != 0)
            string += cm + " cm ";
        if (mm != 0)
            string += mm + " mm ";
        return string.trim();
    }

    if (mm > 10) {
        var cm = Math.floor(mm / 10);
        mm -= cm * 10;
        if (cm > 100) {
            var m = Math.floor(cm / 100);
            cm -= m * 100;
            if (m > 1000) {
                var km = Math.floor(m / 1000);
                m -= km * 1000;
                return print(mm, cm, m, km);
            }
            return print(mm, cm, m, 0);
        }
        return print(mm, cm, 0, 0);
    }
    return print(mm, 0, 0, 0);
}

function replaceInches(match, offset, string) {
    var footEnd = match.indexOf("'");
    var mm = parseInt(match.substring(0, match.indexOf("′"))) * 304.8;
    mm += parseInt(match.substring(footEnd, match.indexOf("″"))) * 25.4;
    return readableMilimeters(mm) + " (" + match + ")";
}


var p = document.getElementsByTagName("p");
for (var i = 0; i < p.length; i++) {
    p[i].textContent = p[i].textContent.replace(/\d+[′'][ ]?\d+[″"]/, replaceInches);
}