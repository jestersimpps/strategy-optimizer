import {ExchangeService} from "./services/exchange.service";
import {simple_bollinger_band_strategy} from "./strategies/simple-bollinger-band.strategy";
import {BruteForceService} from "./services/brute-force.service";

const exchange = new ExchangeService();
const bruteForce = new BruteForceService();

bruteForce.run(
    exchange.binance,
    1,
    'BTCUSDT',
    exchange.binance.klineInterval.m1,
    3000,
    [simple_bollinger_band_strategy]
);
