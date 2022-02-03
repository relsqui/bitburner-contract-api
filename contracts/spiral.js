export function spiral(data) {
    var w = data[0].length;
    var h = data.length;
    var res = [];
    var top = 0;
    var left = 0;
    var right = w - 1;
    var bottom = h - 1;
    var pos = { x: 0, y: 0 };
    var dir = { x: 1, y: 0 };

    while (true) {
        res.push(data[pos.y][pos.x]);
        if (left > pos.x + dir.x ||
            pos.x + dir.x > right ||
            top > pos.y + dir.y ||
            pos.y + dir.y > bottom) {
            if (dir.x == 1 && dir.y == 0) {
                dir = { x: 0, y: 1 };
                top++;
            } else if (dir.x == 0 && dir.y == 1) {
                dir = { x: -1, y: 0 };
                right--;
            } else if (dir.x == -1 && dir.y == 0) {
                dir = { x: 0, y: -1 };
                bottom--;
            } else if (dir.x == 0 && dir.y == -1) {
                dir = { x: 1, y: 0 };
                left++;
            }
        }

        pos.y += dir.y;
        pos.x += dir.x;

        if (left > right || top > bottom) {
            break;
        }
    }

    return res;
}
