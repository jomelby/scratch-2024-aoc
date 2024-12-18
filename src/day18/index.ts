import { Day } from "../day";

class Day18 extends Day {

    constructor() {
        super(18);
    }

    solveForPartOne(input: string): string {
        // for the test it is 7x7 and only 12 bytes
        const maxX = 70;
        const maxY = 70;
        const start: [number, number] = [0, 0];
        const end: [number, number] = [maxX, maxY];
        const nBytes = 1024;
        const bytePositions: [number, number][] = [];
        const lines = input.split("\n");
        for (let i = 0; i < nBytes; i++) {
            let x: number = parseInt(lines[i].split(",")[0]!);
            let y: number = parseInt(lines[i].split(",")[1]!);
            bytePositions.push([x, y]);
        }
        const directions: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        let fewestSteps: number = Number.MAX_VALUE;
        let positionsChecked: [[number, number], number][] = [];
        // position and the step count
        let positionsToCheck: [[number, number], number][] = [[start, 0]];
        while (positionsToCheck.length > 0) {
            let [[x, y], count] = positionsToCheck.shift()!;
            positionsChecked.push([[x, y], count]);
            // no point continuing if the result would be greater
            if (count > fewestSteps) {
                continue
            }
            if ([x, y].toString() == end.toString() && count < fewestSteps) {
                fewestSteps = count;
                //because we are shifting this will be the shortest
                break;
            }
            // if we have already checked that position with a lower count
            if (positionsChecked.some((val) => val[0].toString() == [x, y].toString() && count > val[1])) {
                continue;
            }
            // ok we haven't ended now lets find new positions to check
            for (let [xMod, yMod] of directions) {
                let newX = x + xMod;
                let newY = y + yMod;
                if (bytePositions.some((bPos) => bPos[0] == newX && bPos[1] == newY)) {
                    continue
                } else if (newX < 0 || newY < 0 || newX > maxX || newY > maxY) {
                    continue
                }
                let newCount = count + 1;
                positionsToCheck.push([[newX, newY], newCount])

            }
        }

        return fewestSteps.toString();
    }
    solveForPartOneTakeTwo(input: string): string {
        //based on this https://github.com/Zedespook/advent-of-code-2024/blob/main/day18/part1.cpp
        // for the test it is 7x7 and only 12 bytes
        const maxX = 70;
        const maxY = 70;
        const start: [number, number] = [0, 0];
        const nBytes = 1024;
        const bytePositions: [number, number][] = [];
        const lines = input.split("\n");
        for (let i = 0; i < nBytes; i++) {
            let x: number = parseInt(lines[i].split(",")[0]!);
            let y: number = parseInt(lines[i].split(",")[1]!);
            bytePositions.push([x, y]);
        }
        let stepMap: Map<string, number> = new Map();
        stepMap.set(start.toString(), 0);
        const directions: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        let positionsToCheck: [number, number][] = [start];
        while (positionsToCheck.length > 0) {
            let [x, y] = positionsToCheck.shift()!;
            let positionSteps = stepMap.get([x, y].toString())!;
            console.log(positionSteps);
            console.log([x, y].toString());
            // ok we haven't ended now lets find new positions to check
            for (let [xMod, yMod] of directions) {
                let newX = x + xMod;
                let newY = y + yMod;
                if (bytePositions.some((bPos) => bPos[0] == newX && bPos[1] == newY)) {
                    continue;
                } else if (newX < 0 || newY < 0 || newX > maxX || newY > maxY) {
                    continue;
                }
                if (stepMap.has([newX, newY].toString())) {
                    continue
                }
                stepMap.set([newX, newY].toString(), positionSteps + 1);
                positionsToCheck.push([newX, newY]);

            }
        }
        console.log(stepMap)

        return stepMap.get([maxX, maxY].toString())!.toString();
    }

    hasSolution(bytePositions: [number, number][], maxX: number, maxY: number): number {
        let stepMap: Map<string, number> = new Map();
        const start: [number, number] = [0, 0];
        stepMap.set(start.toString(), 0);
        const directions: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        let positionsToCheck: [number, number][] = [start];
        while (positionsToCheck.length > 0) {
            let [x, y] = positionsToCheck.shift()!;
            let positionSteps = stepMap.get([x, y].toString())!;
            // ok we haven't ended now lets find new positions to check
            for (let [xMod, yMod] of directions) {
                let newX = x + xMod;
                let newY = y + yMod;
                if (bytePositions.some((bPos) => bPos[0] == newX && bPos[1] == newY)) {
                    continue;
                } else if (newX < 0 || newY < 0 || newX > maxX || newY > maxY) {
                    continue;
                }
                if (stepMap.has([newX, newY].toString())) {
                    continue
                }
                stepMap.set([newX, newY].toString(), positionSteps + 1);
                positionsToCheck.push([newX, newY]);

            }
        }
        if (stepMap.has([maxX, maxY].toString())) {
            return 1;
        } else {
            return 0;
        }
    }

    solveForPartTwo(input: string): string {
        //based on this https://github.com/Zedespook/advent-of-code-2024/blob/main/day18/part1.cpp
        const maxX = 70;
        const maxY = 70;
        const bytePositions: [number, number][] = [];
        const lines = input.split("\n");
        let currentBytePosition = 0;
        let bytes: number[] = [];
        for (let i = 0; i < lines.length; i++) {
            currentBytePosition = i;
            let x: number = parseInt(lines[i].split(",")[0]!);
            let y: number = parseInt(lines[i].split(",")[1]!);
            bytePositions.push([x, y]);
            bytes.push(i);
        }
        let bytesSolutions = bytes.map((byte) => this.hasSolution(bytePositions.slice(0, byte), maxX, maxY));
        return bytePositions[bytesSolutions.findIndex((val) => val == 0) - 1].toString();
    }
}

export default new Day18;