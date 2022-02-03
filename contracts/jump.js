/**
 * @param {int[]} data
 */
export function jump(data) {
    if (data[0] == 0) {
        return false;
    }
    for (var i=1; i <= data[0]; i++) {
        if (i == data.length-1) {
            return true;
        }
        var sub = jump(data.slice(i));
        if (sub) {
            return true;
        }
    }

    return false;
}
