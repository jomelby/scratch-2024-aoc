import day7 from './index';
import fs from 'fs';


let partOneInput: string;

beforeAll(async () => {
    partOneInput = await fs.promises.readFile(`./inputs/day7/part1_test.txt`, 'utf-8');
});

describe('On Day 7', () => {
    it(`part1 is identity function`, () => {
        expect(day7.solveForPartOne(partOneInput.toString())).toBe('3749');
    }),
        it(`part1 check line`, () => {
            expect(day7.checkLine("3267: 81 40 27", ["+", "*"])).toBe(3267);
        }),
        it(`part1 is identity function`, () => {
            expect(day7.solveForPartTwo(partOneInput.toString())).toBe('11387');
        })
});