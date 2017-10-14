function translate() {
    var changed = false;

    function round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    function readableMilimeters(mm) {
        function print(mm, cm, m, km) {
            var string = "";
            if (km != 0)
                string += round(km, 4) + " km ";
            if (m != 0)
                string += round(m, 4) + " m ";
            if (cm != 0)
                string += round(cm, 4) + " cm ";
            if (mm != 0)
                string += round(mm, 4) + " mm ";
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

    function resolveImperial(input) {
        if (input == null)
            return NaN;
        else {
            var split = input.split(" ");
            if (split.length == 2)
                return parseInt(split[0]) + resolveFractions(split[1]);
            else
                return resolveFractions(split[0]);
        }
    }

    function resolveFractions(input) {
        var indexOf = input.indexOf("/");
        if (indexOf > 0)
            return parseInt(input.substring(0, indexOf)) / parseInt(input.substring(indexOf + 1));
        else
            return parseFloat(input);
    }

    function replaceInches(match, p1, p2, offset, string) {
        changed = true;
        var footEnd = match.indexOf("'");
        var mm = 0;
        if (p1)
            mm += parseInt(p1) * 304.8;
        mm += resolveImperial(p2) * 25.4;
        return readableMilimeters(mm) + " (" + match.trim() + ")";
    }

    function replaceEach(arr) {
        for (var i = 0; i < arr.length; i++) {
            var text = arr[i].textContent.replace(/(?:(\d+)[′']\s)?((?:(?:\d\s)?\d[/.])?\d+)[″"]/g, replaceInches);
            if (changed) {
                arr[i].textContent = text;
                changed = false;
            }
        }
    }

    replaceEach(document.getElementsByTagName("p"));
}

translate();