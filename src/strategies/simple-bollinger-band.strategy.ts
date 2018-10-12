import {ParameterConfig} from "../config/parameter.config";
import {BollingerBands} from "technicalindicators";
import {Strategy} from "../models/strategy.model";

export const simple_bollinger_band_strategy: Strategy =
    {
        name: 'Simple Bollinger band strategy',
        input: 'close',
        buyParameters: [ParameterConfig.bbstdDev, ParameterConfig.bbLength,],
        buyCondition: (inputs: number[], bbstdDev: number, bbLength: number) => {
            const bb = BollingerBands.calculate({
                period: bbLength,
                stdDev: bbstdDev,
                values: inputs
            });
            return inputs.map((price, index) => (index > bbLength ? price < bb[index - bbLength].lower : false));
        },
        sellParameters: [ParameterConfig.bbstdDev, ParameterConfig.bbLength,],
        sellCondition: (inputs: number[], bbstdDev: number, bbLength: number) => {
            const bb = BollingerBands.calculate({
                period: bbLength,
                stdDev: bbstdDev,
                values: inputs
            });
            return inputs.map((price, index) => (index > bbLength ? price > bb[index - bbLength].upper : false));
        },
    }



