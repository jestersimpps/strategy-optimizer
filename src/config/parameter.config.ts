import { Generators } from "../utils/generators";

export class ParameterConfig {

    // Bollinger bands
    static bbLength = Generators.numberGenerator(1, 120, 1);
    static bbstdDev = Generators.numberGenerator(1, 5, 1);
    static bbLowerDeviation = Generators.numberGenerator(0.0001, 0.002, 0.0001); // x * price < bbLower
    static bbUpperDeviation = Generators.numberGenerator(0.0001, 0.002, 0.0001); // x* price > bbUpper

    // rsi
    static rsiLength = Generators.numberGenerator(5, 100, 1);
    static rsiBottomCondition = Generators.numberGenerator(10, 50, 1);
    static rsiTopCondition = Generators.numberGenerator(50, 90, 1);

    //sma
    static smaShort = Generators.numberGenerator(1, 10, 1);
    static smaMedium = Generators.numberGenerator(3, 20, 1);
    static smaLong = Generators.numberGenerator(9, 30, 1);

    //volume
    static volumeDeviation = Generators.numberGenerator(1, 1.2, 0.01);

}
