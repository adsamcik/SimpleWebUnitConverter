function replaceInches(match, offset, string) {
    console.log("MATCH " + match);

    var footEnd = match.indexOf("'");
    var mm = parseInt(match.substring(0, match.indexOf("′"))) * 304.8;
    mm += parseInt(match.substring(footEnd, match.indexOf("″"))) * 25.4;
    return mm + " mm";
}


var p = document.getElementsByTagName("p");
for (var i = 0; i < p.length; i++) {
    p[i].textContent = p[i].textContent.replace(/\d+[′'][ ]?\d+[″"]/, replaceInches);
}