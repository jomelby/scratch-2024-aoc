import { Day } from "../day";

class Day10 extends Day {

    constructor() {
        super(10);
    }

    getTrailMap(input: string): Map<string, number> {
        let map = new Map<string, number>();
        let lines = input.split("\n");
        for (let y = 0; y < lines.length; y++) {
            let line = lines[y];
            for (let x = 0; x < line.length; x++) {
                map.set([x, y].toString(), parseInt(line[x]));

            }
        }
        return map;
    }
    getSurroundingPoints(point: string, trail_map: Map<string, number>): [number, number][] {
        let [x, y] = point.replace("[", "").replace("]", "").split(",").map((x) => parseInt(x));
        let points: [number, number][] = [];
        if (trail_map.has([x + 1, y].toString())) {
            points.push([x + 1, y]);
        }
        if (trail_map.has([x - 1, y].toString())) {
            points.push([x - 1, y]);
        }
        if (trail_map.has([x, y + 1].toString())) {
            points.push([x, y + 1]);
        }
        if (trail_map.has([x, y - 1].toString())) {
            points.push([x, y - 1]);
        }
        return points;
    }
    solveForPartOne(input: string): string {
        const trail_map = this.getTrailMap(input);
        let trailheads = [];
        let trailhead_points_reachable = new Map<string, string[]>();
        for (let [key, value] of trail_map) {
            if (value == 0) {
                trailheads.push(key);
                trailhead_points_reachable.set(key, []);
            }
        }

        for (let trailhead of trailheads) {
            let points = this.getSurroundingPoints(trailhead, trail_map);
            let points_to_check: [[number, number], number][] = [];
            for (let point of points) {
                points_to_check.push([point, 1]);
            }
            while (points_to_check.length > 0) {
                let [point, elevation] = points_to_check.pop()!;
                if (trail_map.get(point.toString()) == elevation) {
                    if (elevation == 9) {
                        let existing_peaks = trailhead_points_reachable.get(trailhead)!;
                        if (existing_peaks.indexOf(point.toString()) == -1) {
                            trailhead_points_reachable.set(trailhead, [...existing_peaks, point.toString()]);
                        }
                    } else {
                        let next_points = this.getSurroundingPoints(point.toString(), trail_map);
                        for (let next_point of next_points) {
                            points_to_check.push([next_point, elevation + 1]);
                        }
                    }
                }

            }
        }
        console.log(trailhead_points_reachable);
        let sum = 0;
        for (let [key, value] of trailhead_points_reachable) {
            sum += value.length;
        }
        return sum.toString();
    }

    solveForPartTwo(input: string): string {
        const trail_map = this.getTrailMap(input);
        let trailheads = [];
        let trail_head_route_count = new Map<string, number>();
        for (let [key, value] of trail_map) {
            if (value == 0) {
                trailheads.push(key);
                trail_head_route_count.set(key, 0);
            }
        }

        for (let trailhead of trailheads) {
            let points = this.getSurroundingPoints(trailhead, trail_map);
            let points_to_check: [[number, number], number][] = [];
            for (let point of points) {
                points_to_check.push([point, 1]);
            }
            while (points_to_check.length > 0) {
                let [point, elevation] = points_to_check.pop()!;
                if (trail_map.get(point.toString()) == elevation) {
                    if (elevation == 9) {
                        trail_head_route_count.set(trailhead, trail_head_route_count.get(trailhead)! + 1);

                    } else {
                        let next_points = this.getSurroundingPoints(point.toString(), trail_map);
                        for (let next_point of next_points) {
                            points_to_check.push([next_point, elevation + 1]);
                        }
                    }
                }

            }
        }
        console.log(trail_head_route_count);
        let sum = 0;
        for (let [key, value] of trail_head_route_count) {
            sum += value;
        }
        return sum.toString();
    }
}

export default new Day10;