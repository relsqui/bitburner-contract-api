export async function factor(num) {
    var sqrt = Math.sqrt(num);
    var i = 2;
    var res = num;
    while (true) {
        if (num % i == 0) {
            num /= i;
            // ns.tprintf(" / %d = %d", i, num);
            if (num != 1) {
                res = num;
            }
            continue
        }

        i++;
        if (i > sqrt) {
            break
        }
    }

    return res;
}
