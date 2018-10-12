import {Kline} from "./kline.model";

export interface Exchange {
    name: string;
    fee: number;
    getKlines: (tradePair: string, interval: string, limit: number) => Promise<Kline>;
    klineInterval: {
        m1: string;
        m3: string;
        m5: string;
        m15: string;
        m30: string;
        h1: string;
        d1: string;
    }
}
