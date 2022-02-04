import { getTrades, pickTrades } from "./contracts/trader.js";
import { mkIPs } from "./contracts/ips.js";
import { makeValid } from "./contracts/parens.js";
import { paths } from "./contracts/paths.js";
import { blockedPaths } from "./contracts/paths2.js";
import { getSum } from "./contracts/sum.js";
import { subsum } from "./contracts/subsub.js";
import { spiral } from "./contracts/spiral.js";
import { factor } from "./contracts/factor.js";
import { solveIntervals } from "./contracts/intervals.js";
import { jump } from "./contracts/jump.js";
import { trianglePath } from "./contracts/triangle.js";
import { allSums } from "./contracts/maths.js";

export async function handleContract(ns, cType, cData) {
    switch (cType) {
        case "Algorithmic Stock Trader I":
        case "Algorithmic Stock Trader II":
        case "Algorithmic Stock Trader III":
        case "Algorithmic Stock Trader IV":
            var level = 0;
            var tx = [undefined, 1, 999, 2];
            switch(cType.split(" ")[3]) {
                case "I":
                    level = 1;
                    break;
                case "II":
                    level = 2;
                    break;
                case "III":
                    level = 3;
                    break;
                case "IV":
                    level = 4;
                    tx[4] = cData[0];
                    cData = cData[1];
                    break;
            }

            var trades = getTrades(ns, cData);
            var picks = await pickTrades(ns, trades, tx[level]);
            var answer = 0;
            for (var p in picks) {
                answer += picks[p].sell - picks[p].buy;
            }
            break;
        case "Unique Paths in a Grid I":
            var answer = paths(cData);
            break;
        case "Unique Paths in a Grid II":
            var answer = blockedPaths(ns, cData);
            break;
        case "Sanitize Parentheses in Expression":
            var answer = makeValid(cData)
            break;
        case "Generate IP Addresses":
            var answer = mkIPs(ns, cData, 4);
            break;
        case "Total Ways to Sum":
            var answer = getSum(cData)-1;
            break;
        case "Subarray with Maximum Sum":
            var answer = subsum(cData).sum;
            break;
        case "Find All Valid Math Expressions":
            var answer = await allSums(String(cData[0]), cData[1]);
            break;
        case "Minimum Path Sum in a Triangle":
            var answer = trianglePath(cData);
            break;
        case "Spiralize Matrix":
            var answer = spiral(cData);
            break;
        case "Find Largest Prime Factor":
            var answer = await factor(ns, cData);
            break;
        case "Merge Overlapping Intervals":
            var answer = solveIntervals(cData);
            break;
        case "Array Jumping Game":
            var answer = jump(cData);
    }
}

export async function handler (event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const headers = {
        'Content-Type': 'application/json',
    };

    return {
        statusCode: 200,
        body: JSON.stringify(event.queryStringParameters),
        headers,
    };
};
