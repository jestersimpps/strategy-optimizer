import {ParameterConfig} from "../config/parameter.config";
import {SMA} from "technicalindicators";
import {Strategy} from "../models/strategy.model";
import {Kline} from "../models/kline.model";

export const triple_sma: Strategy =
    {
        name: 'Simple sma strategy',
        buyParameters: [ParameterConfig.smaShort, ParameterConfig.smaMedium, ParameterConfig.smaLong],
        buyCondition: (inputs: Kline[], smaShort: number, smaMedium: number, smaLong: number) => {
            const prices = inputs.map(i=>i.close);
            const smaShortArray = SMA.calculate({
                period: smaShort,
                values: prices
            });
            const smaMediumArray = SMA.calculate({
                period: smaMedium,
                values: prices
            });
            const smaLongArray = SMA.calculate({
                period: smaLong,
                values: prices
            });
            return prices.map((price, index) => (index > smaLong ?
                smaShortArray[index - smaShort] < smaMediumArray[index - smaMedium] &&
                smaMediumArray[index - smaMedium] < smaLongArray[index - smaLong] : false)
            );
        },
        sellParameters: [ParameterConfig.smaShort, ParameterConfig.smaMedium, ParameterConfig.smaLong],
        sellCondition: (inputs: Kline[], smaShort: number, smaMedium: number, smaLong: number) => {
            const prices = inputs.map(i=>i.close);
            const smaShortArray = SMA.calculate({
                period: smaShort,
                values: prices
            });
            const smaMediumArray = SMA.calculate({
                period: smaMedium,
                values: prices
            });
            const smaLongArray = SMA.calculate({
                period: smaLong,
                values: prices
            });
            return prices.map((price, index) => (index > smaLong ?
                smaShortArray[index - smaShort] > smaMediumArray[index - smaMedium] &&
                smaMediumArray[index - smaMedium] > smaLongArray[index - smaLong] : false)
            );
        },
    };


