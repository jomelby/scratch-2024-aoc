import day18 from './index';
import * as fs from 'fs';

let partOneInput: string;
let testInput: string;

beforeAll(async () => {
    partOneInput = await fs.promises.readFile(`./inputs/day18/part1.txt`, 'utf-8');
    testInput = await fs.promises.readFile(`./inputs/day18/part1_test.txt`, 'utf-8');
});


describe('On Day 18', () => {
    it(`part1 is identity function`, () => {
        expect(day18.solveForPartOneTakeTwo(testInput)).toBe('22');
    })
    it(`part1`, () => {
        expect(day18.solveForPartOneTakeTwo(partOneInput)).toBe('22');
    })
    it(`part2`, () => {
        expect(day18.solveForPartTwo(partOneInput)).toBe('[6,1]');
    })
});