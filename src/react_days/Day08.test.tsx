import { calculateAntinodes } from "./Day08";
import { describe, expect } from '@jest/globals';



// can't seem to get this working
describe('Day 8 Test', () => {
    it(`calculate antinodes`, () => {
        console.log("calculating antinodes");
        expect(calculateAntinodes([1, 1], [2, 2])).toEqual([[0, 0], [3, 3]]);
    })
});