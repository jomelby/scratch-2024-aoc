import { Day } from "../day";

class Day1 extends Day {

    constructor() {
        super(1);
    }

    solveForPartOne(input: string): string {
        const splitInput = input.split("\n");
        const left_array: number[] = [];
        const right_array: number[] = [];

        for (let line of splitInput) {
            // console.log(line);
            const splitLine = line.split("   ");
            // console.log(splitLine);
            left_array.push(parseInt(splitLine[0]));
            right_array.push(parseInt(splitLine[1]));
        }
        left_array.sort((a, b) => a - b);
        right_array.sort((a, b) => a - b);
        let sum: number = 0;
        for (let i in left_array) {
            sum += Math.abs(left_array[i] - right_array[i]);
        }

        return sum.toString();
    }

    solveForPartTwo(input: string): string {
        const splitInput = input.split("\n");
        const left_array: number[] = [];
        const right_array: number[] = [];

        for (let line of splitInput) {
            // console.log(line);
            const splitLine = line.split("   ");
            // console.log(splitLine);
            left_array.push(parseInt(splitLine[0]));
            right_array.push(parseInt(splitLine[1]));
        }
        let sum: number = 0;
        for (let left_value of left_array) {
            const count = right_array.filter(x => x === left_value).length;
            sum += count * left_value;
        }
        return sum.toString();
    }
}

export default new Day1;