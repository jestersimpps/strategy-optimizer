import {ParameterConfig} from "../config/parameter.config";
import {BollingerBands} from "technicalindicators";
import {Strategy} from "../models/strategy.model";
import {Kline} from "../models/kline.model";

export const simple_bollinger_band_strategy: Strategy =
    {
        name: 'Simple Bollinger band strategy',
        buyParameters: [ParameterConfig.bbstdDev, ParameterConfig.bbLength,],
        buyCondition: (inputs: Kline[], bbstdDev: number, bbLength: number) => {
            const prices = inputs.map(i=>i.close);
            const bb = BollingerBands.calculate({
                period: bbLength,
                stdDev: bbstdDev,
                values: prices
            });
            return prices.map((price, index) => (index > bbLength ? price < bb[index - bbLength].lower : false));
        },
        sellParameters: [ParameterConfig.bbstdDev, ParameterConfig.bbLength,],
        sellCondition: (inputs: Kline[], bbstdDev: number, bbLength: number) => {
            const prices = inputs.map(i=>i.close);
            const bb = BollingerBands.calculate({
                period: bbLength,
                stdDev: bbstdDev,
                values: prices
            });
            return prices.map((price, index) => (index > bbLength ? price > bb[index - bbLength].upper : false));
        },
    }



