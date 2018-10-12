export interface Strategy {
    name: string;
    input: 'close' | 'open' | 'high' | 'low' | 'volume',
    buyParameters: number[][];
    buyCondition: any; // gives back an array of true/false
    sellParameters: number[][];
    sellCondition: any; // gives back an array of true/false
}
