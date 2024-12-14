import day13, { ClawMachine, } from './index';

import * as fs from 'fs';

let partOneInput: string;
let testInput: string;

beforeAll(async () => {
    partOneInput = await fs.promises.readFile(`./inputs/day13/part1_test.txt`, 'utf-8');
    testInput = await fs.promises.readFile(`./inputs/day13/part1.txt`, 'utf-8');
});

const firstClawMachine = new ClawMachine([94, 34], [22, 67], [8400, 5400])

const firstClawMachinePartTwo = new ClawMachine([94, 34], [22, 67], [10000000008400, 10000000005400])
// gcd x = 2, gcd y = y = 1
// max_a = 106382978812
// max_b = 149253731423
// max_b score = = [3283582091306, 10000000005341]

const secondClawMachinePartTwo = new ClawMachine([26, 66], [67, 21], [10000000012748, 10000000012176])
// gcd x = 1, gcd y = 3
// max_a = 151515151699
// max_b = 149253731468
// a_x*b_y - a_y*b_x = 
// max_a score = 

const thirdClawMachinePartTwo = new ClawMachine([17, 86], [84, 37], [10000000007870, 10000000006450])


describe('On Day 13', () => {
    it(`part1 is identity function`, () => {
        expect(day13.solveForPartOne(partOneInput.toString())).toBe('480');
    }), it(`clawMachine solvable`, () => {
        expect(firstClawMachine.solvable(80, 40)).toBe(true);
    }), it(`clawMachine cheapest win`, () => {
        expect(firstClawMachine.cheapestWinUsingMaths()).toBe(280);
    }),
        it(`part2 is identity function`, () => {
            expect(day13.solveForPartTwo(partOneInput.toString())).toBe('875318608908');
        })
});