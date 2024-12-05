import day4 from './index';

describe('On Day 4', () => {
    it(`part1 is identity function`, () => {
        expect(day4.solveForPartOne("MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX")).toBe('18');
    }),
        it(`part2 is identity function`, () => {
            expect(day4.solveForPartTwo("MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX")).toBe('9');
        })
});