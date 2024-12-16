import { Day } from "../day";
import * as fs from 'fs';

export class Robot {
    x: number;
    y: number;
    vx: number;
    vy: number;

    constructor(x: number, y: number, vx: number, vy: number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }

    static fromLine(line: string): Robot {
        const regex = /-?\d+/g;
        const [x, y, vx, vy] = line.match(regex)!;
        return new Robot(parseInt(x), parseInt(y), parseInt(vx), parseInt(vy));
    }

    move(max_x: number, max_y: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) {
            this.x = max_x + this.x + 1;
        }
        if (this.y < 0) {
            this.y = max_y + this.y + 1;
        }
        if (this.x > max_x) {
            this.x = this.x - max_x - 1;
        }
        if (this.y > max_y) {
            this.y = this.y - max_y - 1;
        }
    }

}

class Day14 extends Day {

    constructor() {
        super(14);
    }

    getQuadrants(max_x: number, max_y: number): [[number, number], [number, number]][] {
        const x = Math.floor(max_x / 2) - 1;
        const y = Math.floor(max_y / 2) - 1;
        return [[[0, 0], [x, y]], [[max_x - x, max_y - y], [max_x, max_y]], [[0, max_y - y], [x, max_y]], [[max_x - x, 0], [max_x, y]]];


    }

    solveForPartOne(input: string): string {
        const split_lines = input.split('\n');
        const robots = split_lines.map(Robot.fromLine);
        // zero based
        const max_x = 100;
        const max_y = 102;
        for (let i = 0; i < 100; i++) {
            robots.forEach(robot => robot.move(max_x, max_y));

        }
        const quadrants = this.getQuadrants(max_x, max_y);
        let quadrantScores = [];
        for (let quadrant of quadrants) {
            let score = 0;
            for (let robot of robots) {
                if (robot.x >= quadrant[0][0] && robot.x <= quadrant[1][0] && robot.y >= quadrant[0][1] && robot.y <= quadrant[1][1]) {
                    score++;
                }
            }
            quadrantScores.push(score);
        }
        return quadrantScores.reduce((a, b) => a * b, 1).toString();
    }

    solveForPartTwo(input: string): string {
        const split_lines = input.split('\n');
        const robots = split_lines.map(Robot.fromLine);
        // zero based
        const max_x = 100;
        const max_y = 102;
        for (let i = 0; i < 10000; i++) {
            robots.forEach(robot => robot.move(max_x, max_y));
            let newLines: string[][] = [];
            for (let i = 0; i <= max_y; i++) {
                newLines.push(Array(max_x + 1).fill('.'));
            }
            for (let robot of robots) {
                newLines[robot.y][robot.x] = '#';
            }
            if (newLines.some(line => line.join("").includes("###############################"))) {
                return (i + 1).toString()
            }
        } return "hello";
    }


}

export default new Day14;