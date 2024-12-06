import { Day } from "../day";

class Day6 extends Day {

    constructor() {
        super(6);
    }


    findObstructions(lines: string[]): number[][] {
        let obstructions: number[][] = [];
        for (let y = 0; y < lines.length; y++) {
            for (let x = 0; x < lines[y].length; x++) {
                if (lines[y][x] == "#") {
                    obstructions.push([x, y]);
                }
            }
        }
        return obstructions;
    }
    findStartingPosition(lines: string[]): number[] {
        let starting_position = [-1, -1];
        for (let y = 0; y < lines.length; y++) {
            if (lines[y].includes("^")) {
                starting_position = [lines[y].indexOf("^"), y];
                break;
            }
        }
        return starting_position;
    }

    findAllPositions(lines: string[], obstructions: number[][], position: number[]): Set<string> {
        let obstructed = true;
        // start going up
        let direction = [0, -1];
        // didn't seem to like the array as a key
        const direction_map = new Map<string, number[]>([
            ["0,-1", [1, 0]],  // up -> right
            ["1,0", [0, 1]], // right -> down
            ["0,1", [-1, 0]], // down -> left
            ["-1,0", [0, -1]]  // left -> up
        ]);
        const ending_x_positions = new Set([0, lines[0].length - 1]);
        const ending_y_positions = new Set([0, lines.length - 1]);
        let unique_positions = new Set<string>();
        while (obstructed) {
            // console.log(position);
            unique_positions.add(position.toString());
            // check if we are at the end
            if (ending_x_positions.has(position[0]) || ending_y_positions.has(position[1])) {
                break;
            }
            // brute force, one until we hit an obstruction
            position = [position[0] + direction[0], position[1] + direction[1]];
            // originally did this by includes, not sure why it didn't work
            if (obstructions.some(obstruction => obstruction[0] === position[0] && obstruction[1] === position[1])) {                // not an allowed move, so move back
                position = [position[0] - direction[0], position[1] - direction[1]];
                // turn
                direction = direction_map.get(direction.toString())!;

            }
        }
        return unique_positions;

    }
    checkSolvable(lines: string[], obstructions: number[][], position: number[]): number {
        // it is solvable if there is a path to an edge
        let obstructed = true;
        // start going up
        let direction = [0, -1];
        // didn't seem to like the array as a key
        const direction_map = new Map<string, number[]>([
            ["0,-1", [1, 0]],  // up -> right
            ["1,0", [0, 1]], // right -> down
            ["0,1", [-1, 0]], // down -> left
            ["-1,0", [0, -1]]  // left -> up
        ]);
        const ending_x_positions = new Set([0, lines[0].length - 1]);
        const ending_y_positions = new Set([0, lines.length - 1]);
        let unique_positions = new Set<string>();
        let unique_positions_and_direction = new Set<string>();
        while (obstructed) {
            // console.log(position);
            unique_positions.add(position.toString());

            // check if we are at the end
            if (ending_x_positions.has(position[0]) || ending_y_positions.has(position[1])) {
                // console.log("found an edge");
                // console.log(position);
                return 0;
            }
            if (unique_positions_and_direction.has(position.toString() + direction.toString())) {
                return 1;
            }
            unique_positions_and_direction.add(position.toString() + direction.toString());
            // brute force, one until we hit an obstruction
            position = [position[0] + direction[0], position[1] + direction[1]];
            // originally did this by includes, not sure why it didn't work
            if (obstructions.some(obstruction => obstruction[0] === position[0] && obstruction[1] === position[1])) {                // not an allowed move, so move back
                position = [position[0] - direction[0], position[1] - direction[1]];
                // turn
                direction = direction_map.get(direction.toString())!;

            }
        }
        return 0;

    }


    solveForPartOne(input: string): string {
        const lines = input.split("\n");
        const obstructions = this.findObstructions(lines);
        // console.log(obstructions);
        let position = this.findStartingPosition(lines);
        let obstructed = true;
        // start going up
        let direction = [0, -1];
        // didn't seem to like the array as a key
        const direction_map = new Map<string, number[]>([
            ["0,-1", [1, 0]],  // up -> right
            ["1,0", [0, 1]], // right -> down
            ["0,1", [-1, 0]], // down -> left
            ["-1,0", [0, -1]]  // left -> up
        ]);
        const ending_x_positions = new Set([0, lines[0].length - 1]);
        const ending_y_positions = new Set([0, lines.length - 1]);
        let unique_positions = new Set<string>();
        while (obstructed) {
            // console.log(position);
            unique_positions.add(position.toString());
            // check if we are at the end
            if (ending_x_positions.has(position[0]) || ending_y_positions.has(position[1])) {
                break;
            }
            // brute force, one until we hit an obstruction
            position = [position[0] + direction[0], position[1] + direction[1]];
            // originally did this by includes, not sure why it didn't work
            if (obstructions.some(obstruction => obstruction[0] === position[0] && obstruction[1] === position[1])) {                // not an allowed move, so move back
                position = [position[0] - direction[0], position[1] - direction[1]];
                // turn
                direction = direction_map.get(direction.toString())!;

            }
        }
        return unique_positions.size.toString();
    }

    solveForPartTwo(input: string): string {
        //First find all of the positions that are travelled to
        const lines = input.split("\n");
        const obstructions = this.findObstructions(lines);
        // console.log(obstructions);
        const position = this.findStartingPosition(lines);
        // console.log(position)
        const possible_obstructions = this.findAllPositions(lines, obstructions, position);
        let possible_obstruction_positions = Array.from(possible_obstructions).map(position => position.split(",").map(Number));
        // console.log(possible_obstruction_positions);
        let count = 0;
        for (let new_obstruction of possible_obstruction_positions) {
            // add obstruction to the list of existing obstructions
            // console.log(new_obstruction);
            obstructions.push(new_obstruction);
            let solvable = this.checkSolvable(lines, obstructions, position);
            // console.log(solvable);
            count += solvable;
            // remove the obstruction
            obstructions.pop();
        }
        return count.toString();
    }
}

export default new Day6;