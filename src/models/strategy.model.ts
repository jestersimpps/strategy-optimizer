export interface Strategy {
    name: string;
    buyParameters: number[][];
    buyCondition: any; // gives back an array of true/false
    sellParameters: number[][];
    sellCondition: any; // gives back an array of true/false
}
