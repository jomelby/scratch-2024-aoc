import { Day } from "../day";

// ChatGPT: Generate all possible combinations of operators
// equivalent to pythons itertools combinations with replacement
function generateCombinations(N: number, operators: string[]): string[][] {
    const result: string[][] = [];

    function backtrack(current: string[], depth: number) {
        if (depth === N) {
            result.push([...current]);
            return;
        }

        for (const operator of operators) {
            current.push(operator);
            backtrack(current, depth + 1);
            current.pop();
        }
    }

    backtrack([], 0);
    return result;
}

// Example usage:
// const combinations = generateCombinations(3);
// console.log(combinations);
// Output: [ [ '+', '+', '+' ], [ '+', '+', '*' ], [ '+', '*', '+' ], [ '+', '*', '*' ], [ '*', '+', '+' ], [ '*', '+', '*' ], [ '*', '*', '+' ], [ '*', '*', '*' ] ]

class Day7 extends Day {

    constructor() {
        super(7);
    }
    checkLine(line: string, operators: string[]): number {
        const expected_answer = parseInt(line.split(":")[0]);
        const numbers = line.split(": ")[1].split(" ").map(x => parseInt(x));
        // console.log(numbers);
        // first try adding all of the numbers togethers
        for (let operator_combination of generateCombinations(numbers.length - 1, operators)) {
            let sum = numbers[0];
            for (let i = 0; i < operator_combination.length; i++) {
                if (operator_combination[i] == "+") {
                    sum += numbers[i + 1];
                } else if (operator_combination[i] == "*") {
                    sum *= numbers[i + 1];
                } else {
                    sum = parseInt(sum.toString() + numbers[i + 1].toString());
                }
            }
            if (sum == expected_answer) {
                return expected_answer;
            }
        }
        return 0;

    }

    solveForPartOne(input: string): string {
        let sum = 0;
        for (let line of input.split('\n')) {
            sum += this.checkLine(line, ["+", "*"]);
        }
        return sum.toString();
    }

    solveForPartTwo(input: string): string {
        let sum = 0;
        for (let line of input.split('\n')) {
            sum += this.checkLine(line, ["+", "*", "||"]);
        }
        return sum.toString();
    }
}

export default new Day7;