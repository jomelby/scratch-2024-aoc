import { Day } from "../day";

class Day3 extends Day {

    constructor() {
        super(3);
    }

    multiply_match_string(match: string): number {
        // match string looks like mul(2,4)
        const split_match = match.replace("mul(", "").replace(")", "").split(",");
        // console.log(split_match);
        return parseInt(split_match[0]) * parseInt(split_match[1]);
    }

    solveForPartOne(input: string): string {
        console.log(input);
        const regex = /mul\(\d*,\d*\)/g;
        let matches = input.match(regex);
        let sum = 0;
        if (matches) {
            // console.log(matches);
            for (let match of matches) {
                // console.log(match);
                sum += this.multiply_match_string(match);
            }
        } else {
            console.log("No matches found");
        }
        return sum.toString();
    }

    sum_multiples(input: string): number {
        const regex = /mul\(\d*,\d*\)/g;
        let matches = input.match(regex);
        let sum = 0;
        if (matches) {
            // console.log(matches);
            for (let match of matches) {
                // console.log(match);
                sum += this.multiply_match_string(match);
            }
        } else {
            console.log("No matches found");
        }
        return sum;
    }

    solveForPartTwo(input: string): string {
        console.log(input);
        const regex = /mul\(\d*,\d*\)/g;
        const input_dont_split = input.split("don't()");
        // first element is considered a do
        let sum = this.sum_multiples(input_dont_split[0]);
        // subsequent elements are considered a don't so need to strip the don't until a do
        for (let i = 1; i < input_dont_split.length; i++) {
            const input_do = input_dont_split[i].split("do");
            for (let j = 1; j < input_do.length; j++) {
                sum += this.sum_multiples(input_do[j]);
            }
        }
        return sum.toString();
    }
}

export default new Day3;