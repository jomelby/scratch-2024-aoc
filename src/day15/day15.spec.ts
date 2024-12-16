import day15 from './index';


import * as fs from 'fs';

let partOneInput: string;
let testInput: string;

beforeAll(async () => {
    partOneInput = await fs.promises.readFile(`./inputs/day15/part1.txt`, 'utf-8');
    testInput = await fs.promises.readFile(`./inputs/day15/part1_test.txt`, 'utf-8');
});



describe('On Day 15', () => {
    it(`part1 is identity function`, () => {
        expect(day15.solveForPartOne(testInput)).toBe('10092');
    })
    it(`part1 input`, () => {
        expect(day15.solveForPartOne(partOneInput)).toBe('1465523');
    })
    it(`part2 is identity function`, () => {
        expect(day15.solveForPartTwo(testInput)).toBe('9021');
    })
    it(`part2 input`, () => {
        expect(day15.solveForPartTwo(partOneInput)).toBe('1471049');
    })
});