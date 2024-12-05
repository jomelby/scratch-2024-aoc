import day5 from './index';
import fs from 'fs';

let partOneInput: string;

beforeAll(async () => {
    partOneInput = await fs.promises.readFile(`./inputs/day5/part1_test.txt`, 'utf-8');
});
describe('On Day 5', () => {

    it(`part1 is identity function`, () => {
        expect(day5.solveForPartOne(partOneInput.toString())).toBe('143');
    })
    it(`part2 is identity function`, () => {
        expect(day5.solveForPartTwo(partOneInput.toString())).toBe('123');
    })
});