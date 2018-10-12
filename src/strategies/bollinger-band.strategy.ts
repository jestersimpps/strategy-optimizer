import {ParameterConfig} from "../config/parameter.config";
import {BollingerBands} from "technicalindicators";
import {Strategy} from "../models/strategy.model";
import {Kline} from "../models/kline.model";

export const bollinger_band_strategy: Strategy =
    {
        name: 'Bollinger band strategy',
        buyParameters: [ParameterConfig.bbstdDev, ParameterConfig.bbLength, ParameterConfig.bbLowerDeviation],
        buyCondition: (inputs: Kline[], bbstdDev: number, bbLength: number, bbLowerDeviation: number) => {
            const prices = inputs.map(i=>i.close);
            const bb = BollingerBands.calculate({
                period: bbLength,
                stdDev: bbstdDev,
                values: prices
            });
            return prices.map((price, index) => (index > bbLength ? price < bb[index - bbLength].lower - (price * bbLowerDeviation): false));
        },
        sellParameters: [ParameterConfig.bbstdDev, ParameterConfig.bbLength, ParameterConfig.bbUpperDeviation],
        sellCondition: (inputs: Kline[], bbstdDev: number, bbLength: number, bbUpperDeviation: number) => {
            const prices = inputs.map(i=>i.close);
            const bb = BollingerBands.calculate({
                period: bbLength,
                stdDev: bbstdDev,
                values: prices
            });
            return prices.map((price, index) => (index > bbLength? price > bb[index - bbLength].upper + (price * bbUpperDeviation): false));
        },
    }



