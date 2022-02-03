/**
 * @param {number[][]} tri
 */
export function trianglePath(tri) {
    var path = [];
    var max = 0;
    for (var l = 0; l < tri.length; l++) {
        path.push(0);
    }

    while (true) {
        var l = tri.length - 1;
        var sum = add(tri, path);
        if (sum < max || max == 0) {
            max = sum;
        }
        path = next(tri, path);
        if (!path) {
            break
        }
    }

    return max;
}

function next(data, path) {
    var i = data.length - 1;
    // Walk up the path that went to the right
    while (i > 0 && path[i] == path[i - 1] + 1) {
        i--
    }
    // If we're at the top, we're done
    if (i == 0) {
        return false;
    }

    // move to the right
    var change = false;
    if (path[i] == path[i - 1]) {
        change = true;
        path[i]++
    }
    // Everything below this point goes left
    if (!change) {
        return false;
    }
    for (var j = i + 1; j < data.length; j++) {
        path[j] = path[j - 1];
    }
    return path;
}

function add(data, path) {
    var res = 0;
    for (var i = 0; i < data.length; i++) {
        res += 1*data[i][path[i]];
    }
    return res
}
