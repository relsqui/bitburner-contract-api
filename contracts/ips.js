
/**
 * @param {string} digits
 * @param {int} n
 */
export function mkIPs(digits, n) {
    if (digits.length > n*3 || digits[0] == "0") {
        return [];
    }

    var res = [];
    for (var i=0; i<3; i++) {
        if (i >= digits.length) {
            break;
        }
        var oct = digits.substr(0, i+1);
        if (oct > 255) {
            break;
        }
        if (n > 1) {
            var sub = mkIPs(digits.substr(i+1), n-1);
            if (sub.length > 0) {
                sub.forEach((s) => {res.unshift(oct + "." + s)});
            }
        } else if (i == digits.length-1) {
            res.unshift(oct);
        }
    }

    return res;
}
