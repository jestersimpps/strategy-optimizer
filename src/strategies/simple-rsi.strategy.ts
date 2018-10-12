import {ParameterConfig} from "../config/parameter.config";
import {RSI} from "technicalindicators";
import {Strategy} from "../models/strategy.model";
import {Kline} from "../models/kline.model";

export const simple_rsi_strategy: Strategy =
    {
        name: 'Bollinger band rsi strategy',
        buyParameters: [ParameterConfig.rsiLength, ParameterConfig.rsiBottomCondition],
        buyCondition:(inputs: Kline[], rsiLength: number, rsiBottomCondition: number) => {
            const prices = inputs.map(i=>i.close);
            const rsi = RSI.calculate({
                period: rsiLength,
                values: prices
            });
            return prices.map((price, index) => (index > rsiLength ? rsi[index - rsiLength] < rsiBottomCondition : false));
        },
        sellParameters: [ParameterConfig.rsiLength, ParameterConfig.rsiTopCondition],
        sellCondition: (inputs: Kline[], rsiLength: number, rsiTopCondition: number) => {
            const prices = inputs.map(i=>i.close);
            const rsi = RSI.calculate({
                period: rsiLength,
                values: prices
            });
            return prices.map((price, index) => (index > rsiLength ? rsi[index - rsiLength] > rsiTopCondition : false));
        },
    }



