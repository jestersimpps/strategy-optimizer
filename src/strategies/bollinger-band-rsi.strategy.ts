import {ParameterConfig} from "../config/parameter.config";
import {BollingerBands, RSI} from "technicalindicators";
import {Strategy} from "../models/strategy.model";

export const bollinger_band_rsi_strategy: Strategy =
    {
        name: 'Bollinger band rsi strategy',
        input: 'close',
        buyParameters: [ParameterConfig.bbstdDev, ParameterConfig.bbLength, ParameterConfig.bbLowerDeviation],
        buyCondition: (inputs: number[], bbstdDev: number, bbLength: number, bbLowerDeviation: number) => {
            const bb = BollingerBands.calculate({
                period: bbLength,
                stdDev: bbstdDev,
                values: inputs
            });
            return inputs.map((price, index) => (index > bbLength ? price < bb[index - bbLength].lower - (price * bbLowerDeviation) : false));
        },
        sellParameters: [ParameterConfig.rsiLength, ParameterConfig.rsiTopCondition],
        sellCondition: (inputs: number[], rsiLength: number, rsiTopCondition: number) => {
            const rsi = RSI.calculate({
                period: rsiLength,
                values: inputs
            });
            return inputs.map((price, index) => (index > rsiLength ? rsi[index - rsiLength] > rsiTopCondition : false));
        },
    }



