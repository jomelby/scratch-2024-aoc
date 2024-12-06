import day6 from './index';
import fs from 'fs';

let partOneInput: string;

beforeAll(async () => {
    partOneInput = await fs.promises.readFile(`./inputs/day6/part1_test.txt`, 'utf-8');
});
describe('On Day 6', () => {

    it(`part1 is identity function`, () => {
        expect(day6.solveForPartOne(partOneInput.toString())).toBe('41');
    })
    it(`part2 is identity function`, () => {
        expect(day6.solveForPartTwo(partOneInput.toString())).toBe('6');
    })
});