import axios from 'axios';
import {Kline} from "../models/kline.model";
import {Exchange} from "../models/exchange.model";

export class ExchangeService {
    binance: Exchange = {
        name: 'Binance',
        fee: 0.1, // % fee paid to exchange to perform a trade
        klineInterval: {
            m1: '1m',
            m3: '3m',
            m5: '5m',
            m15: '15m',
            m30: '30m',
            h1: '1h',
            d1: '1d'
        },
        getKlines: (tradePair: string, interval: string, limit: number): Promise<Kline> => {
            // TODO: combine multiple calls to add more data points based on limit parameter (watch out for binance rate limiter, i think its 1200 requests per minute)
            // https://sammchardy.github.io/binance/2018/01/08/historical-data-download-binance.html
            return axios.get(`https://api.binance.com/api/v1/klines?symbol=${tradePair}&interval=${interval}`).then(response =>
                (response.data.map(k => ({
                        open: +k[1],
                        high: +k[2],
                        low: +k[3],
                        close: +k[4],
                        volume: +k[5],
                        openTime: +k[6],
                        closeTime: +k[0],
                    })
                )));
        },
        // getPrice: (tradePair: string): Promise<any> => {
        //     return axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${tradePair}`).then(response =>
        //         response.data
        //     );
        // }
    }
    // TODO: implement bittrex
    // https://medium.com/@samuelson78x/binance-get-historical-data-api-1bc8c758fa85/
}
