import { Day } from "../day";

import * as fs from 'fs';

export class Warehouse {
    boxes: [number, number][];
    walls: [number, number][];
    robot: [number, number];
    moves: string[];

    constructor(boxes: [number, number][], walls: [number, number][], robot: [number, number], moves: string[]) {
        this.boxes = boxes;
        this.walls = walls;
        this.robot = robot;
        this.moves = moves;
    }

    static fromLines(line: string): Warehouse {
        const split_lines = line.split("\n");
        let boxes: [number, number][] = [];
        let walls: [number, number][] = [];
        let moves: string[] = [];
        let robot: [number, number] = [0, 0];
        for (let y = 0; y < split_lines.length; y++) {
            for (let x = 0; x < split_lines[y].length; x++) {
                let char = split_lines[y][x];
                if (char == "#") {
                    walls.push([x, y]);
                } else if (char == "O") {
                    boxes.push([x, y]);
                } else if (char == "@") {
                    robot = [x, y];
                } else if (char != ".") {
                    moves.push(char);
                }
            }

        }
        return new Warehouse(boxes, walls, robot, moves);
    }

    checkWall(x: number, y: number): boolean {
        return this.walls.some(([wx, wy]) => wx == x && wy == y);
    }

    // boxes that are adjacent to the robot but not already against a wall
    checkMovableBox(x: number, y: number, dx: number, dy: number): [number, number][] | null {
        let movableBoxes: [number, number][] = [];
        while (true) {
            if (this.checkWall(x, y)) {
                movableBoxes = [];
                return null
            }
            if (this.boxes.some(([bx, by]) => bx == x && by == y)) {
                movableBoxes.push([x, y]);
                x += dx;
                y += dy;
            } else {
                break;
            }
        }
        return movableBoxes;
    }

    updateBox(oldPos: [number, number], newPos: [number, number]) {
        let index = this.boxes.findIndex(([bx, by]) => bx == oldPos[0] && by == oldPos[1]);
        this.boxes[index] = newPos;
    }



    playMoves() {
        const moveMap = new Map<string, [number, number]>([
            [">", [1, 0]],
            ["<", [-1, 0]],
            ["^", [0, -1]],
            ["v", [0, 1]]
        ]);
        for (let move of this.moves) {
            let [dx, dy] = moveMap.get(move)!;
            let nextPos: [number, number] = [this.robot[0] + dx, this.robot[1] + dy];
            // check if moving into a wall
            if (this.checkWall(nextPos[0], nextPos[1])) {
                continue;
            }
            // check if moving a box
            let movableBoxes = this.checkMovableBox(nextPos[0], nextPos[1], dx, dy);
            if (movableBoxes == null) {
                continue;
            }
            // move the robot and all movable boxes
            this.robot = nextPos;
            for (let box of movableBoxes) {
                this.updateBox(box, [box[0] + dx, box[1] + dy]);
            }



        }
    }
    toString(): string {
        const max_x = Math.max(...this.boxes.map(([x, y]) => x), ...this.walls.map(([x, y]) => x), this.robot[0]);
        const max_y = Math.max(...this.boxes.map(([x, y]) => y), ...this.walls.map(([x, y]) => y), this.robot[1]);
        let newLines: string[][] = [];
        for (let i = 0; i <= max_y; i++) {
            newLines.push(Array(max_x + 1).fill('.'));
        }
        for (let [x, y] of this.boxes) {
            newLines[y][x] = "O";
        }
        for (let [x, y] of this.walls) {
            newLines[y][x] = "#";
        }
        newLines[this.robot[1]][this.robot[0]] = "@";
        return newLines.map(line => line.join("")).join("\n");

    }
}



export class WarehousePartTwo {
    boxes: [[number, number], [number, number]][];
    walls: [number, number][];
    robot: [number, number];
    moves: string[];

    constructor(boxes: [[number, number], [number, number]][], walls: [number, number][], robot: [number, number], moves: string[]) {
        this.boxes = boxes;
        this.walls = walls;
        this.robot = robot;
        this.moves = moves;
    }

    static fromLines(line: string): WarehousePartTwo {
        const split_lines = line.split("\n");
        let boxes: [[number, number], [number, number]][] = [];
        let walls: [number, number][] = [];
        let moves: string[] = [];
        let robot: [number, number] = [0, 0];
        for (let y = 0; y < split_lines.length; y++) {
            for (let x = 0; x < split_lines[y].length; x++) {
                let char = split_lines[y][x];
                if (char == "#") {
                    walls.push([2 * x, y]);
                    walls.push([2 * x + 1, y]);
                } else if (char == "O") {
                    boxes.push([[2 * x, y], [2 * x + 1, y]]);
                } else if (char == "@") {
                    robot = [2 * x, y];
                } else if (char != ".") {
                    moves.push(char);
                }
            }

        }
        return new WarehousePartTwo(boxes, walls, robot, moves);
    }

    checkWall(x: number, y: number): boolean {
        return this.walls.some(([wx, wy]) => wx == x && wy == y);
    }

    // boxes that are adjacent to the robot but not already against a wall
    checkMovableBox(x: number, y: number, dx: number, dy: number): [[number, number], [number, number]][] | null {
        let movableBoxes: [[number, number], [number, number]][] = [];
        // need to change this to have an array of coordinates to check 
        let coordinatesToCheck = [[x, y]];
        let coordinatesChecked = new Set<string>();
        while (coordinatesToCheck.length > 0) {
            let [x, y] = coordinatesToCheck.pop()!;
            coordinatesChecked.add([x, y].toString());
            if (this.checkWall(x, y)) {
                movableBoxes = [];
                return null
            }
            if (this.boxes.some(([[bx1, by1], [bx2, by2]]) => (bx1 == x && by1 == y) || (bx2 == x && by2 == y))) {
                let adjacentBox = this.boxes.filter(([[bx1, by1], [bx2, by2]]) => (bx1 == x && by1 == y) || (bx2 == x && by2 == y))[0];
                movableBoxes.push(adjacentBox);
                if (coordinatesChecked.has([adjacentBox[0][0] + dx, adjacentBox[0][1] + dy].toString())) {
                    continue;
                } else {
                    coordinatesToCheck.push([adjacentBox[0][0] + dx, adjacentBox[0][1] + dy]);
                }
                if (coordinatesChecked.has([adjacentBox[1][0] + dx, adjacentBox[1][1] + dy].toString())) {
                    continue;
                } else {
                    coordinatesToCheck.push([adjacentBox[1][0] + dx, adjacentBox[1][1] + dy]);
                }
            }
        }
        return movableBoxes;
    }

    updateBox(oldPos: [[number, number], [number, number]], newPos: [[number, number], [number, number]]) {
        let index = this.boxes.findIndex(([[bx, by], [bx1, by1]]) => bx == oldPos[0][0] && by == oldPos[0][1] && bx1 == oldPos[1][0] && by1 == oldPos[1][1]);
        this.boxes[index] = newPos;
    }



    playMoves() {
        const moveMap = new Map<string, [number, number]>([
            [">", [1, 0]],
            ["<", [-1, 0]],
            ["^", [0, -1]],
            ["v", [0, 1]]
        ]);
        for (let move of this.moves) {
            fs.appendFileSync("output.txt", move + "\n");
            let [dx, dy] = moveMap.get(move)!;
            let nextPos: [number, number] = [this.robot[0] + dx, this.robot[1] + dy];
            // check if moving into a wall
            if (this.checkWall(nextPos[0], nextPos[1])) {
                fs.appendFileSync("output.txt", this.toString() + "\n");
                continue;
            }
            // check if moving a box
            let movableBoxes = this.checkMovableBox(nextPos[0], nextPos[1], dx, dy);
            if (movableBoxes == null) {
                continue;
            }
            // I think it is possible that the movable boxes will not be unique
            let boxSet = new Set();
            let uniqueBoxes: [[number, number], [number, number]][] = [];
            for (let movableBox of movableBoxes) {
                if (boxSet.has(movableBox.toString())) {
                    continue;
                } else {
                    uniqueBoxes.push(movableBox);
                    boxSet.add(movableBox.toString());
                }
            }
            // move the robot and all movable boxes
            this.robot = nextPos;
            for (let box of uniqueBoxes) {
                this.updateBox(box, [[box[0][0] + dx, box[0][1] + dy], [box[1][0] + dx, box[1][1] + dy]]);
            }
            fs.appendFileSync("output.txt", this.toString() + "\n");


        }
    }
    toString(): string {
        const max_x = Math.max(...this.walls.map(([x, y]) => x));
        const max_y = Math.max(...this.walls.map(([x, y]) => y));
        let newLines: string[][] = [];
        for (let i = 0; i <= max_y; i++) {
            newLines.push(Array(max_x + 1).fill('.'));
        }
        for (let [[x, y], [x1, y1]] of this.boxes) {
            newLines[y][x] = "[";
            newLines[y][x1] = "]";
        }
        for (let [x, y] of this.walls) {
            newLines[y][x] = "#";
        }
        newLines[this.robot[1]][this.robot[0]] = "@";
        return newLines.map(line => line.join("")).join("\n");

    }
}

class Day15 extends Day {

    constructor() {
        super(15);
    }

    solveForPartOne(input: string): string {
        let warehouse = Warehouse.fromLines(input);
        warehouse.playMoves();
        let sum = 0;
        for (let i in warehouse.boxes) {
            sum += warehouse.boxes[i][0] + 100 * warehouse.boxes[i][1];
        }
        return sum.toString();
    }

    solveForPartTwo(input: string): string {
        let warehouse = WarehousePartTwo.fromLines(input);
        console.log(warehouse.toString());
        warehouse.playMoves();
        let sum = 0;
        for (let i in warehouse.boxes) {
            sum += warehouse.boxes[i][0][0] + 100 * warehouse.boxes[i][0][1];
        }
        return sum.toString();
    }
}

export default new Day15;