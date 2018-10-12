import {ParameterConfig} from "../config/parameter.config";
import {SMA} from "technicalindicators";
import {Strategy} from "../models/strategy.model";
import {Kline} from "../models/kline.model";

export const triple_sma_volume: Strategy =
    {
        name: 'Sma volume strategy',
        buyParameters: [ParameterConfig.smaShort, ParameterConfig.smaMedium, ParameterConfig.smaLong, ParameterConfig.volumeDeviation],
        buyCondition: (inputs: Kline[], smaShort: number, smaMedium: number, smaLong: number, volumeDeviation: number) => {
            const prices = inputs.map(i=>i.close);
            const volumes = inputs.map(i=>i.volume);
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
            const avgVolume = volumes.reduce((a,b) => a + b, 0) / volumes.length;

            return volumes.map((volume, index) => (index > smaLong ?
                smaShortArray[index - smaShort] < smaMediumArray[index - smaMedium] &&
                smaMediumArray[index - smaMedium] < smaLongArray[index - smaLong] &&
                volume > volumeDeviation * avgVolume: false)
            );
        },
        sellParameters: [ParameterConfig.smaShort, ParameterConfig.smaMedium, ParameterConfig.smaLong, ParameterConfig.volumeDeviation],
        sellCondition: (inputs: Kline[], smaShort: number, smaMedium: number, smaLong: number, volumeDeviation: number) => {
            const prices = inputs.map(i=>i.close);
            const volumes = inputs.map(i=>i.volume);
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
            const avgVolume = volumes.reduce((a,b) => a + b, 0) / volumes.length;

            return volumes.map((volume, index) => (index > smaLong ?
                smaShortArray[index - smaShort] > smaMediumArray[index - smaMedium] &&
                smaMediumArray[index - smaMedium] > smaLongArray[index - smaLong] &&
                volume > volumeDeviation * avgVolume : false)
            );
        },
    };


