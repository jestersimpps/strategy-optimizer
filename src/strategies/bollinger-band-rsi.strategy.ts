import {ParameterConfig} from "../config/parameter.config";
import {BollingerBands, RSI} from "technicalindicators";
import {Strategy} from "../models/strategy.model";
import {Kline} from "../models/kline.model";

export const bollinger_band_rsi_strategy: Strategy =
    {
        name: 'Bollinger band rsi strategy',
        buyParameters: [ParameterConfig.bbstdDev, ParameterConfig.bbLength, ParameterConfig.bbLowerDeviation],
        buyCondition: (inputs: Kline[], bbstdDev: number, bbLength: number, bbLowerDeviation: number) => {
            const prices = inputs.map(i=>i.close);
            const bb = BollingerBands.calculate({
                period: bbLength,
                stdDev: bbstdDev,
                values: prices
            });
            return prices.map((price, index) => (index > bbLength ? price < bb[index - bbLength].lower - (price * bbLowerDeviation) : false));
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



