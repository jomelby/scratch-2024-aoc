import day11 from './index';

describe('On Day 11', () => {
    it(`part1 is identity function`, () => {
        expect(day11.solveForPartOne('125 17')).toBe('55312');
    }),
        it(`part1 is identity function`, () => {
            expect(day11.solveForPartTwoRecursively('0')).toBe('22938365706844');
        })
});