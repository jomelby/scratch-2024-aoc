import { Day } from "../day";


const directions: [number, number][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];

class Day16 extends Day {

    constructor() {
        super(16);
    }

    solveForPartOne(input: string): string {
        let lines = input.split('\n');
        let start: [number, number] = [0, 0];
        let end: [number, number] = [0, 0];
        for (let y = 0; y < lines.length; y++) {
            for (let x = 0; x < lines[y].length; x++) {
                if (lines[y][x] === 'S') {
                    start = [x, y];
                } else if (lines[y][x] === 'E') {
                    end = [x, y];
                }
            }

        }
        // going to keep track of the direction as well as the score and direction
        // x, y, score, direction
        let traveledPositions: [number, number, number, [number, number]][] = [];
        // start facing east
        let positionQueue: [number, number, number, [number, number], string[], number][] = [[start[0], start[1], 0, [1, 0], [], 0]];
        let lowestScore: number = Number.MAX_VALUE;
        while (positionQueue.length > 0) {
            let [x, y, score, direction, path, steps] = positionQueue.shift()!;
            let newPath = [...path];
            newPath.push([x, y].toString());
            steps += 1;
            // check if we are at the end
            if (x === end[0] && y === end[1]) {
                if (score < lowestScore) {
                    lowestScore = score;
                }
            }
            // unproductive path
            if (score > lowestScore) {
                continue;
            }
            // check if we have been here before but with a lower score
            if (traveledPositions.some((pos) => pos[0] === x && pos[1] === y && pos[2] <= score && pos[3] == direction)) {
                continue;
            }
            for (let dir of directions) {
                // check if we are going back the way we came
                if (dir[0] === -direction[0] && dir[1] === -direction[1]) {
                    continue;
                }
                let [newX, newY] = [x + dir[0], y + dir[1]]
                if (lines[newY][newX] !== "#") {
                    // same direction, score increments by 1
                    if (dir.toString() === direction.toString()) {
                        positionQueue.push([newX, newY, score + 1, dir, newPath, steps]);
                    } else {
                        // different direction, score increments by 2
                        positionQueue.push([newX, newY, score + 1001, dir, newPath, steps]);
                    }
                }

            }
            traveledPositions.push([x, y, score, direction]);


        }
        return lowestScore.toString();
    }

    solveForPartTwo(input: string): string {
        let lines = input.split('\n');
        let start: [number, number] = [0, 0];
        let end: [number, number] = [0, 0];
        for (let y = 0; y < lines.length; y++) {
            for (let x = 0; x < lines[y].length; x++) {
                if (lines[y][x] === 'S') {
                    start = [x, y];
                } else if (lines[y][x] === 'E') {
                    end = [x, y];
                }
            }

        }
        // going to keep track of the direction as well as the score and direction
        // x, y, score, direction
        let traveledPositions: [number, number, number, [number, number]][] = [];
        // start facing east
        let positionQueue: [number, number, number, [number, number], string[], number][] = [[start[0], start[1], 0, [1, 0], [], 0]];
        let lowestScore: number = Number.MAX_VALUE;
        let tilesTraveled = new Set<string>();
        while (positionQueue.length > 0) {
            let [x, y, score, direction, path, steps] = positionQueue.shift()!;
            let newPath = [...path];
            newPath.push([x, y].toString());
            steps += 1;
            // check if we are at the end
            if (x === end[0] && y === end[1]) {
                if (score < lowestScore) {
                    console.log("erasing old score")
                    lowestScore = score;
                    tilesTraveled = new Set<string>();
                    path.forEach((pos) => tilesTraveled.add(pos));
                    console.log(tilesTraveled.size);
                } else if (score === lowestScore) {
                    console.log("matching score");
                    path.forEach((pos) => tilesTraveled.add(pos));
                    console.log(tilesTraveled.size);
                } else {
                    continue;
                }
            }
            // unproductive path
            if (score > lowestScore) {
                continue;
            }
            // check if we have been here before but with a lower score
            if (traveledPositions.some((pos) => pos[0] === x && pos[1] === y && pos[2] < score && pos[3] == direction)) {
                continue;
            }
            for (let dir of directions) {
                // check if we are going back the way we came
                if (dir[0] === -direction[0] && dir[1] === -direction[1]) {
                    continue;
                }
                let [newX, newY] = [x + dir[0], y + dir[1]]
                if (lines[newY][newX] !== "#") {
                    // same direction, score increments by 1
                    if (dir.toString() === direction.toString()) {
                        positionQueue.push([newX, newY, score + 1, dir, newPath, steps]);
                    } else {
                        // different direction, score increments by 2
                        positionQueue.push([newX, newY, score + 1001, dir, newPath, steps]);
                    }
                }

            }
            traveledPositions.push([x, y, score, direction]);


        }
        console.log(lowestScore);
        return (tilesTraveled.size + 1).toString();
    }
}

export default new Day16;