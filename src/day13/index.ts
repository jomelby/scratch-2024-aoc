import { Day } from "../day";


export class ClawMachine {
    a: [number, number];
    b: [number, number];
    prize: [number, number];
    constructor(a: [number, number], b: [number, number], prize: [number, number]) {
        this.a = a;
        this.b = b;
        this.prize = prize;
    }

    static fromLines(lines: string[]): ClawMachine {
        const a = lines[0].split(" ").slice(2).map((x) => parseInt(x.split("+")[1].replace(",", "")));
        const b = lines[1].split(" ").slice(2).map((x) => parseInt(x.split("+")[1].replace(",", "")));
        const prize = lines[2].split(" ").slice(1).map((x) => parseInt(x.split("=")[1].replace(",", "")));
        return new ClawMachine(a as [number, number], b as [number, number], prize as [number, number]);
    }

    cheapestWin(): number {
        let tokens = 0;
        // first find the maxiumum number of a and b that can be used to win the prize
        let max_a = Math.max(...[Math.floor(this.prize[0] / this.a[0]), Math.floor(this.prize[1] / this.a[1])]);
        let max_b = Math.max(...[Math.floor(this.prize[0] / this.b[0]), Math.floor(this.prize[1] / this.b[1])]);
        for (let n_a = 0; n_a <= max_a; n_a++) {
            for (let n_b = 0; n_b <= max_b; n_b++) {
                // no point checking if it is solvable if it wont be cheaper
                if (tokens !== 0 && n_a * 3 + n_b > tokens) {
                    continue;
                }
                if (this.solvable(n_a, n_b)) {
                    tokens = n_a * 3 + n_b;

                }
            }
        }
        return tokens;
    }

    cheapestWinUsingMaths(): number {
        // https://github.com/michaelerne/adventofcode-2024/blob/main/day_13.py

        // trying to solve a_x*a + b_x*b = prize_x and a_y*a + b_y*b = prize_y

        const a = Math.floor((this.b[0] * this.prize[1] - this.b[1] * this.prize[0]) / (this.a[1] * this.b[0] - this.a[0] * this.b[1]));
        const b = Math.floor((this.prize[0] - this.a[0] * a) / this.b[0]);
        if (((this.prize[0] - a * this.a[0]) % this.b[0]) == 0 && (this.b[0] * this.prize[1] - this.b[1] * this.prize[0]) % (this.a[1] * this.b[0] - this.a[0] * this.b[1]) == 0) {
            return 3 * a + b;
        }
        return 0;

    }

    solvable(n_a: number, n_b: number): boolean {
        return (this.a[0] * n_a + this.b[0] * n_b == this.prize[0]) && (this.a[1] * n_a + this.b[1] * n_b == this.prize[1]);
    }

}


class Day13 extends Day {

    constructor() {
        super(13);
    }

    solveForPartOne(input: string): string {
        const lines = input.split("\n");
        let runningLines: string[] = [];
        let clawMachines = [];
        for (let line of lines) {
            if (line == "") {
                clawMachines.push(ClawMachine.fromLines(runningLines));
                runningLines = [];
            } else {
                runningLines.push(line);
            }

        }
        let sum = clawMachines.map((x) => x.cheapestWin()).reduce((a, b) => a + b, 0);
        return sum.toString();
    }

    solveForPartTwo(input: string): string {
        const lines = input.split("\n");
        let runningLines: string[] = [];
        let clawMachines = [];
        for (let line of lines) {
            if (line == "") {
                let machine = ClawMachine.fromLines(runningLines);
                machine.prize = [machine.prize[0] + 10000000000000, machine.prize[1] + 10000000000000];
                // adjust x and y for the prize for part two
                clawMachines.push(machine);
                runningLines = [];
            } else {
                runningLines.push(line);
            }

        }
        let sum = clawMachines.map((x) => x.cheapestWinUsingMaths()).reduce((a, b) => a + b, 0);
        return sum.toString();
    }
}

export default new Day13;