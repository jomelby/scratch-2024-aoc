import { Day } from "../day";

export class Computer {
    a: number
    b: number
    c: number
    program: number[]
    instructionPointer: number
    output: number[]

    constructor(a: number, b: number, c: number, program: number[]) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.program = program;
        this.instructionPointer = 0;
        this.output = []

    }

    static fromInput(input: string): Computer {
        const lines: string[] = input.split("\n");
        const a: number = parseInt(lines[0].split(": ")[1]);
        const b: number = parseInt(lines[1].split(": ")[1]);
        const c: number = parseInt(lines[2].split(": ")[1]);
        const register: number[] = lines[4].split(": ")[1].split(",").map((val) => parseInt(val));
        return new Computer(a, b, c, register);
    }

    getComboOperandValue(comboOperand: number): number {
        switch (comboOperand) {
            case 0:
                return 0;
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;
            case 4:
                return this.a;
            case 5:
                return this.b;
            case 6:
                return this.c;
            //chatGPT
            default:
                throw new Error(`Invalid comboOperand: ${comboOperand}`);
        }
    }

    adv(operand: number) {
        const numerator = this.a;
        const denominator = 2 ** (this.getComboOperandValue(operand));
        this.a = parseInt((numerator / denominator).toString());
        this.instructionPointer += 2;
    }

    bxl(operand: number) {
        this.b = this.b ^ operand;
        this.instructionPointer += 2;
    }

    bst(operand: number) {
        this.b = this.getComboOperandValue(operand) % 8;
        this.instructionPointer += 2;
    }
    jnz(operand: number) {
        if (this.a === 0) {
            this.instructionPointer += 2;
            return;
        }
        this.instructionPointer = operand;
    }
    bxc(operand: number) {
        this.b = this.b ^ this.c;
        this.instructionPointer += 2;
    }
    out(operand: number) {
        const output = this.getComboOperandValue(operand) % 8;
        this.output.push(output);
        this.instructionPointer += 2;
    }
    bdv(operand: number) {
        const numerator = this.a;
        const denominator = 2 ** (this.getComboOperandValue(operand));
        this.b = parseInt((numerator / denominator).toString());
        this.instructionPointer += 2;
    }
    cdv(operand: number) {
        const numerator = this.a;
        const denominator = 2 ** (this.getComboOperandValue(operand));
        this.c = parseInt((numerator / denominator).toString());
        this.instructionPointer += 2;
    }
    runProgram() {
        while (this.instructionPointer < this.program.length - 1) {
            let opcode = this.program[this.instructionPointer];
            let operand = this.program[this.instructionPointer + 1];
            switch (opcode) {
                case 0:
                    this.adv(operand);
                    break;
                case 1:
                    this.bxl(operand);
                    break;
                case 2:
                    this.bst(operand);
                    break;
                case 3:
                    this.jnz(operand);
                    break;
                case 4:
                    this.bxc(operand);
                    break;
                case 5:
                    this.out(operand);
                    break;
                case 6:
                    this.bdv(operand);
                    break;
                case 7:
                    this.cdv(operand);
                    break;
                default:
                    throw new Error("invalid case");
            }
        }
    }
    runProgramPartTwo() {
        while (this.instructionPointer < this.program.length - 1) {
            let opcode = this.program[this.instructionPointer];
            let operand = this.program[this.instructionPointer + 1];
            switch (opcode) {
                case 0:
                    this.adv(operand);
                    break;
                case 1:
                    this.bxl(operand);
                    break;
                case 2:
                    this.bst(operand);
                    break;
                case 3:
                    this.jnz(operand);
                    break;
                case 4:
                    this.bxc(operand);
                    break;
                case 5:
                    this.out(operand);
                    break;
                case 6:
                    this.bdv(operand);
                    break;
                case 7:
                    this.cdv(operand);
                    break;
                default:
                    throw new Error("invalid case");
            }
            // saw this in someone elses solution about an early exit
            if (this.output.toString() != this.program.slice(0, this.output.length - 1).toString()) {
                break;
            }
        }
    }

}


class Day17 extends Day {

    constructor() {
        super(17);
    }

    solveForPartOne(input: string): string {
        let computer = Computer.fromInput(input);
        computer.runProgram();
        console.log(computer);
        return computer.output.join(",");
    }

    solveForPartTwo(input: string): string {
        let a = 1;
        let found = true;
        const originalComputer = Computer.fromInput(input);
        while (true) {
            let computer = originalComputer;
            computer.a = a;
            computer.runProgramPartTwo();
            if (computer.output.toString() == originalComputer.program.toString()) {
                break;
            } else if (found) {
                a--;
            } else {
                a++;
            }
        }
        return a.toString();

    }
}

export default new Day17;