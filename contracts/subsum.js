/**
 * @param {int[]} data
 */
function subsum(data) {
    var res = {len:0, sum:0};
    for (var l=1; l<data.length; l++) {
        for (var s=0; s+l+1<data.length; s++) {
            var sum = 0;
            var sl =  data.slice(s, s+l);
            sl.forEach((n) => {sum += 1.0*n});
            if (sum > res.sum) {
                res = {len: l, sum: sum};
            }
        }
    }
    
    return res;
}
