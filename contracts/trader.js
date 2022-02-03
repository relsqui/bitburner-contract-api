/**
 * @param {Object[]} trades
 * @param {int} trades.buy
 * @param {int} trades.sell
 * @param {int} tx
 */
export async function pickTrades(trades, tx) {
    if (tx >= trades.length) {
        return trades;
    }

    var trade;
    var bestProfit = 0;
    var bestNext;
    for (var b=0; b <= trades.length-tx; b++) {
        for (var s=b; s <= trades.length-tx; s++) {
            var profit = 0;
            var next = [];
            if (tx > 1) {
                next = await pickTrades(trades.slice(s+1), tx-1);
                next.forEach((t) => { profit += t.sell - t.buy })
            }
            
            if (trades[s].sell - trades[b].buy + profit > bestProfit) {
                trade = {buy: trades[b].buy, sell: trades[s].sell};
                bestProfit = trades[s].sell - trades[b].buy + profit;
                bestNext = next;
            }
        }
    }

    bestNext.unshift(trade);
    return bestNext;
}

export function getTrades(data) {
    // find transactions, buy at a local min, sell at a following local max
    var trades = [];
    var val = data[0];
    var yesterday = 0;
    for (var i = 0; i < data.length; i++) {
      var today = data[i];
      if (today < yesterday && val != 0) {
          trades.push({buy: val, sell: yesterday});
          val = 0;
      } else if (today > yesterday && val == 0) {
          val = yesterday;
      }
      yesterday = today;
    }
    if (val > 0) {
        trades.push({buy: val, sell: yesterday});
    }

    return trades;
}
