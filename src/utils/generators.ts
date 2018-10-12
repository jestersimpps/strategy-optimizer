export class Generators {

    static numberGenerator(lower: number, upper: number, step: number) : number[] {
        let array = [];
        for (let _i = lower; _i < upper; _i = _i + step) {
            array.push(_i);
        }
        return array;
    }

}