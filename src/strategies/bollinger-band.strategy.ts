import {ParameterConfig} from "../config/parameter.config";
import {BollingerBands} from "technicalindicators";
import {Strategy} from "../models/strategy.model";

export const bollinger_band_strategy: Strategy =
    {
        name: 'Bollinger band strategy',
        input: 'close',
        buyParameters: [ParameterConfig.bbstdDev, ParameterConfig.bbLength, ParameterConfig.bbLowerDeviation],
        buyCondition: (inputs: number[], bbstdDev: number, bbLength: number, bbLowerDeviation: number) => {
            const bb = BollingerBands.calculate({
                period: bbLength,
                stdDev: bbstdDev,
                values: inputs
            });
            return inputs.map((price, index) => (index > bbLength ? price < bb[index - bbLength].lower - (price * bbLowerDeviation): false));
        },
        sellParameters: [ParameterConfig.bbstdDev, ParameterConfig.bbLength, ParameterConfig.bbUpperDeviation],
        sellCondition: (inputs: number[], bbstdDev: number, bbLength: number, bbUpperDeviation: number) => {
            const bb = BollingerBands.calculate({
                period: bbLength,
                stdDev: bbstdDev,
                values: inputs
            });
            return inputs.map((price, index) => (index > bbLength? price > bb[index - bbLength].upper + (price * bbUpperDeviation): false));
        },
    }



