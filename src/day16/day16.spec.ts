import day16 from './index';
import * as fs from 'fs';

let partOneInput: string;
let testInput: string;

beforeAll(async () => {
    partOneInput = await fs.promises.readFile(`./inputs/day16/part1.txt`, 'utf-8');
    testInput = await fs.promises.readFile(`./inputs/day16/part1_test.txt`, 'utf-8');
});

describe('On Day 16', () => {
    it(`part1 is identity function`, () => {
        expect(day16.solveForPartOne(testInput)).toBe('7036');
    })
    it(`part1 `, () => {
        expect(day16.solveForPartOne(partOneInput)).toBe('78428');
    })
    it(`part2 is identity function`, () => {
        expect(day16.solveForPartTwo(testInput)).toBe('45');
    })
    it(`part2 `, () => {
        expect(day16.solveForPartTwo(partOneInput)).toBe('463');
    })
});