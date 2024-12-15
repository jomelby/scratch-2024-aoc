import day14, { Robot } from './index';
import * as fs from 'fs';

let partOneInput: string;
let testInput: string;

beforeAll(async () => {
    partOneInput = await fs.promises.readFile(`./inputs/day14/part1.txt`, 'utf-8');
    testInput = await fs.promises.readFile(`./inputs/day14/part1_test.txt`, 'utf-8');
});


describe('On Day 14', () => {
    it(`part1 is identity function`, () => {
        // for this to work reset the max x and max y
        expect(day14.solveForPartOne(testInput)).toBe('12');
    });
    it(`part2 is identity function`, () => {
        expect(day14.solveForPartTwo(partOneInput)).toBe('7083');
    });
    it("moving", () => {
        let robot = Robot.fromLine("p=2,4 v=2,-3");
        robot.move(10, 6)
        expect(robot.x).toBe(4);
        expect(robot.y).toBe(1);
        robot.move(10, 6)
        expect(robot.x).toBe(6);
        expect(robot.y).toBe(5);
        robot.move(10, 6)
        expect(robot.x).toBe(8);
        expect(robot.y).toBe(2);
        robot.move(10, 6)
        expect(robot.x).toBe(10);
        expect(robot.y).toBe(6);
        robot.move(10, 6)
        expect(robot.x).toBe(1);
        expect(robot.y).toBe(3);
        robot.move(10, 6)
        expect(robot.x).toBe(3);
        expect(robot.y).toBe(0);
        robot.move(10, 6)
        expect(robot.x).toBe(5);
        expect(robot.y).toBe(4);
    })
});