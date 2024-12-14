import day12, { GardenPlot } from './index';
import * as fs from 'fs';

let partOneInput: string;

beforeAll(async () => {
    partOneInput = await fs.promises.readFile(`./inputs/day12/part1.txt`, 'utf-8');
});



describe('On Day 12', () => {
    it(`part1 is identity function`, () => {
        expect(day12.solveForPartOne(partOneInput.toString())).toBe('1452678');
    }),
        it(`garden plot area`, () => {
            let gardenPlot = new GardenPlot('E', [8, 5]);
            expect(gardenPlot.perimeter()).toBe(4);
            gardenPlot.addCoordinate([8, 6]);
            expect(gardenPlot.perimeter()).toBe(6);
            gardenPlot.addCoordinate([8, 7]);
            expect(gardenPlot.perimeter()).toBe(8);
        }),
        it(`garden plot edges`, () => {
            let gardenPlot = new GardenPlot('E', [0, 0]);
            gardenPlot.coordinates = [[0, 0], [0, 1], [1, 1], [1, 2]];
            expect(gardenPlot.sides()).toBe(8);
        })
        ,
        it(`garden plot edges 1`, () => {
            let gardenPlot = new GardenPlot('E', [0, 0]);
            expect(gardenPlot.sides()).toBe(4);
        }),
        it(`garden plot edges square`, () => {
            let gardenPlot = new GardenPlot('E', [0, 0]);
            gardenPlot.addCoordinate([0, 1]);
            gardenPlot.addCoordinate([1, 1]);
            gardenPlot.addCoordinate([1, 0]);
            expect(gardenPlot.sides()).toBe(4);
        }),
        it(`part2 is identity function`, () => {
            expect(day12.solveForPartTwo(partOneInput.toString())).toBe('873584');
        })

});