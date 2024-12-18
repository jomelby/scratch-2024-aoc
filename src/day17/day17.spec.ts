import day17, { Computer } from './index';
import * as fs from 'fs';

let partOneInput: string;
let testInput: string;

beforeAll(async () => {
    partOneInput = await fs.promises.readFile(`./inputs/day17/part1.txt`, 'utf-8');
    testInput = await fs.promises.readFile(`./inputs/day17/part1_test.txt`, 'utf-8');
});


describe('On Day 17', () => {
    it(`part1 is identity function`, () => {
        expect(day17.solveForPartOne(testInput)).toBe('4,6,3,5,6,3,5,2,1,0');
    })
    it("computer tests", () => {
        let computer = new Computer(0, 0, 9, [2, 6]);
        computer.runProgram();
        expect(computer.b).toBe(1)
        computer = new Computer(10, 0, 0, [5, 0, 5, 1, 5, 4]);
        computer.runProgram();
        expect(computer.output.toString()).toBe([0, 1, 2].toString())
        computer = new Computer(2024, 0, 0, [0, 1]);
        computer.runProgram();
        expect(computer.a).toBe(2024 / 2);
        expect(computer.output.toString()).toBe([].toString())
        computer = new Computer(2024, 0, 0, [0, 1, 5, 4, 3, 0]);
        computer.runProgram();
        expect(computer.a).toBe(0);
        expect(computer.output.toString()).toBe([4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0].toString())
        computer = new Computer(0, 29, 0, [1, 7]);
        computer.runProgram();
        expect(computer.b).toBe(26)
        computer = new Computer(0, 2024, 43690, [4, 0]);
        computer.runProgram();
        expect(computer.b).toBe(44354)

    })
    // it(`part1`, () => {
    //     expect(day17.solveForPartOne(partOneInput)).toBe('7,1,3,4,1,2,6,7,1');
    // })
    // it(`part2 test`, () => {
    //     expect(day17.solveForPartTwo(testInput)).toBe('117440');
    // })
});