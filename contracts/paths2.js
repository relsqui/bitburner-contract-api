/**
 * @param {int[][]} board
 */
export function blockedPaths(board) {
    var res = 0;
    if (board.length == 1 && board[0].length == 1) {
        return 1;
    }

    if (board.length > 1 && board[1][0] == 0) {
        res += blockedPaths(ns, board.slice(1));
    }

    if (board[0].length > 1 && board[0][1] == 0) {
        res += blockedPaths(ns, board.map((l) => {return l.slice(1)}));
    }

    return res;
}
