import {Kline} from "../models/kline.model";
import * as Combinatorics from 'js-combinatorics';
import {Strategy} from "../models/strategy.model";

// Brute force will try every possible combination of parameters to test your strategy
export class BruteForceService {

    run(exchange, amount: number, tradingPair: string, interval: string, limit: number, strategies: Strategy[]) {

        console.log('getting candlesticks...')
        exchange.getKlines(tradingPair, interval, limit).then((klines: Kline[]) => {

            console.log(`${klines.length} data points recieved.`)
            strategies.forEach(strategy => {
                let buyTriggerArrays: { triggers: boolean[], conditionState: number[] }[] = []
                let sellTriggerArrays: { triggers: boolean[], conditionState: number[] }[] = []
                const inputs = klines.map(kline => kline[strategy.input]);

                console.log('generating buy trigger arrays...')
                const buyConditionStates = Combinatorics.cartesianProduct.apply(this, strategy.buyParameters).toArray();
                buyConditionStates.forEach(conditionState => {
                    buyTriggerArrays.push({
                        triggers: strategy.buyCondition.apply(this, [inputs, ...conditionState]),
                        conditionState
                    })
                })

                console.log(`${buyTriggerArrays.length} trigger arrays generated.`)
                console.log('generating sell trigger arrays...')
                const sellConditionStates = Combinatorics.cartesianProduct.apply(this, strategy.sellParameters).toArray();
                sellConditionStates.forEach(conditionState => {
                    sellTriggerArrays.push({
                        triggers: strategy.sellCondition.apply(this, [inputs, ...conditionState]),
                        conditionState
                    })
                })

                console.log(`${sellTriggerArrays.length} trigger arrays generated.`)
                console.log('mapping buy prices to trigger arrays...')
                const buyStrategies = buyTriggerArrays.map(buyTriggerArray => {
                    return {
                        parameters: buyTriggerArray.conditionState,
                        triggers: klines.map((kline, index) => {
                            return {
                                type: 'buy',
                                openTime: kline.openTime,
                                closeTime: kline.closeTime,
                                price: kline[strategy.input],
                                trigger: buyTriggerArray.triggers[index],
                            }
                        })
                    }
                })

                console.log('mapping sell prices to trigger arrays...')
                const sellStrategies = sellTriggerArrays.map(sellTriggerArray => {
                    return {
                        parameters: sellTriggerArray.conditionState,
                        triggers: klines.map((kline, index) => {
                            return {
                                type: 'sell',
                                openTime: kline.openTime,
                                closeTime: kline.closeTime,
                                price: kline[strategy.input],
                                trigger: sellTriggerArray.triggers[index],
                            }
                        })
                    }
                })

                let profit = 0;
                console.log(`\n optimizing ${exchange.name} ${tradingPair} ${interval} - ${strategies.map(strat => strat.name).join(',')}:`);
                // TODO: make faster;
                buyStrategies.forEach(buyArray => {
                    sellStrategies.forEach(sellArray => {
                        const buys = buyArray.triggers.filter((a) => (a.trigger));
                        const sells = sellArray.triggers.filter((a) => (a.trigger));

                        const orders = buys
                            .concat(sells)
                            .sort((a, b) => a.closeTime - b.closeTime)
                            .filter((a, index, array) => (index === 0 && array[index].type === 'buy' ? a.trigger : false ||
                            index > 1 && array[index].type !== array[index - 1].type ? a.trigger : false));

                        const buyOrders = orders.filter((a) => (a.type === 'buy'));
                        const sellOrders = orders.filter((a) => (a.type === 'sell'));

                        if (buyOrders.length < sellOrders.length) {
                            sellOrders.shift()
                        }

                        const cost = buyOrders.reduce((a, b) => (a + b.price + (amount * b.price * exchange.fee / 100)), 0);
                        const turnover = sellOrders.filter((a) => (a.type === 'sell')).reduce((a, b) => (a + b.price - (amount * b.price * exchange.fee / 100)), 0);

                        let currentProfit = (amount * (turnover - cost));

                        if (currentProfit > profit) {
                            profit = currentProfit;
                            console.log(`${buyOrders.length} order(s) - buyparams: ${buyArray.parameters} | sellparams: ${sellArray.parameters} - profit: ${currentProfit}`);
                        }
                    })
                })
            })
        })
    }

}
