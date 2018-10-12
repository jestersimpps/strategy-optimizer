import {ParameterConfig} from "../config/parameter.config";
import {SMA} from "technicalindicators";
import {Strategy} from "../models/strategy.model";

export const triple_sma: Strategy =
    {
        name: 'Sma strategy',
        input: 'close',
        buyParameters: [ParameterConfig.smaShort, ParameterConfig.smaMedium, ParameterConfig.smaLong],
        buyCondition: (inputs: number[], smaShort: number, smaMedium: number, smaLong: number) => {
            const smaShortArray = SMA.calculate({
                period: smaShort,
                values: inputs
            });
            const smaMediumArray = SMA.calculate({
                period: smaMedium,
                values: inputs
            });
            const smaLongArray = SMA.calculate({
                period: smaLong,
                values: inputs
            });
            return inputs.map((price, index) => (index > smaLong ?
                smaShortArray[index - smaShort] < smaMediumArray[index - smaMedium] &&
                smaMediumArray[index - smaMedium] < smaLongArray[index - smaLong] : false)
            );
        },
        sellParameters: [ParameterConfig.smaShort, ParameterConfig.smaMedium, ParameterConfig.smaLong],
        sellCondition: (inputs: number[], smaShort: number, smaMedium: number, smaLong: number) => {
            const smaShortArray = SMA.calculate({
                period: smaShort,
                values: inputs
            });
            const smaMediumArray = SMA.calculate({
                period: smaMedium,
                values: inputs
            });
            const smaLongArray = SMA.calculate({
                period: smaLong,
                values: inputs
            });
            return inputs.map((price, index) => (index > smaLong ?
                smaShortArray[index - smaShort] > smaMediumArray[index - smaMedium] &&
                smaMediumArray[index - smaMedium] > smaLongArray[index - smaLong] : false)
            );
        },
    };


