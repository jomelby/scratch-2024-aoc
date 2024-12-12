import day11 from './index';

describe('On Day 11', () => {
    it(`part1 is identity function`, () => {
        expect(day11.solveForPartOne('125 17')).toBe('55312');
    }),
        it(`part1 is identity function`, () => {
            expect(day11.solveForPartTwoRecursively('64599 31 674832 2659361 1 0 8867 321')).toBe('55312');
        })
});