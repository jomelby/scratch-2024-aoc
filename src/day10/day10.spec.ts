import day10 from './index';
import * as fs from 'fs';

let partOneInput: string;

beforeAll(async () => {
    partOneInput = await fs.promises.readFile(`./inputs/day10/part1_test.txt`, 'utf-8');
});

describe('On Day 10', () => {
    it(`part1 is identity function`, () => {
        expect(day10.solveForPartOne(partOneInput.toString())).toBe('36');
    }),
        it(`part2 is identity function`, () => {
            expect(day10.solveForPartTwo(partOneInput.toString())).toBe('81');
        });
});