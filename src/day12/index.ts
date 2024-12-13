import { Day } from "../day";


export class GardenPlot {
    label: string;
    coordinates: [number, number][];

    constructor(label: string, startingCoordinate: [number, number]) {
        this.label = label;
        this.coordinates = [startingCoordinate];
    }

    containsEdge(coordinate: [number, number]): number {
        const potentialEdges = [[1, 0], [0, 1], [0, -1], [-1, 0]];
        let edges = 0;
        for (let potentialEdge of potentialEdges) {
            if (this.containsCoordinate([coordinate[0] + potentialEdge[0], coordinate[1] + potentialEdge[1]])) {
                edges++;
            }
        }
        return edges;
    }

    containsCoordinate(coordinate: [number, number]): boolean {
        return this.coordinates.some((x) => x[0] == coordinate[0] && x[1] == coordinate[1]);
    }

    addCoordinate(coordinate: [number, number]) {
        this.coordinates.push(coordinate);
    }

    perimeter(): number {
        let area = 0;
        for (let coordinate of this.coordinates) {
            area += 4 - this.containsEdge(coordinate);
        }
        return area;

    }

    sides(): number {
        let edges = 0;
        this.coordinates = this.coordinates.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        let coordinatesEdges: [number, number, string[]][] = new Array();
        // first map out the edges of the all the coordinates
        for (let coordinate of this.coordinates) {
            let potentialEdges = [[1, 0, "right"], [0, 1, "down"], [0, -1, "up"], [-1, 0, "left"]];
            let edgeLabels: string[] = [];
            for (let potentialEdge of potentialEdges) {
                const [x, y, neighbor] = potentialEdge;
                if (this.containsCoordinate([coordinate[0] + parseInt(x.toString()), coordinate[1] + parseInt(y.toString())])) {
                    continue
                } else {
                    // nobody in the garden plot has this coordinate
                    edgeLabels.push(neighbor.toString());
                }

            }
            coordinatesEdges.push([coordinate[0], coordinate[1], edgeLabels]);
        }
        let coordinatesChecked: Map<string, string[]> = new Map();
        for (let i = 0; i < coordinatesEdges.length; i++) {
            let [x, y, edgeLabels] = coordinatesEdges[i];
            coordinatesChecked.set([x, y].toString(), edgeLabels);
            // check the coordinates around again and if they have already been counted then do not count the shared edge
            // only certain edges are possible
            let diffs: [number, number, string[]][] = [[1, 0, ["up", "down"]], [0, 1, ["left", "right"]], [0, -1, ["left", "right"]], [-1, 0, ["up", "down"]]];
            for (let diff of diffs) {
                let newCoordinate: [number, number] = [x + parseInt(diff[0].toString()), y + parseInt(diff[1].toString())];
                if (this.coordinates.some((c) => c[0] == newCoordinate[0] && c[1] == newCoordinate[1])) {
                    // this coordinate exists in the garden plot
                    if (coordinatesChecked.has([newCoordinate[0], newCoordinate[1]].toString())) {
                        // this coordinate has also been checked already
                        let checkedEdgeLabels = coordinatesChecked.get([newCoordinate[0], newCoordinate[1]].toString())!;
                        checkedEdgeLabels = checkedEdgeLabels.filter((x) => diff[2].includes(x));
                        let edgesToRemove = checkedEdgeLabels.filter((x) => edgeLabels.includes(x));
                        edgeLabels = edgeLabels.filter((x) => !edgesToRemove.includes(x));

                    }

                }
            }
            if (edgeLabels.length > 0) {
                edges += edgeLabels.length;
            }

        }
        return edges;
    }
}


class Day12 extends Day {

    constructor() {
        super(12);
    }

    solveForPartOne(input: string): string {
        let gardenPlots: GardenPlot[] = [];
        const split_lines = input.split("\n");
        let coordinatesChecked: [number, number][] = [];
        let max_x = split_lines[0].length;
        let max_y = split_lines.length
        for (let y = 0; y < split_lines.length; y++) {
            for (let x = 0; x < split_lines[y].length; x++) {
                if (coordinatesChecked.some((c) => c[0] == x && c[1] == y)) {
                    continue;
                } else {
                    coordinatesChecked.push([x, y]);
                }
                // if the coordinate has note been checked yet that must mean it is a new garden plot
                let label = split_lines[y][x];
                let gardenPlot = new GardenPlot(label, [x, y]);
                let coordinatesToCheck: [number, number][] = [[x, y]];
                while (coordinatesToCheck.length > 0) {
                    let coordinate = coordinatesToCheck.pop()!;
                    let diffs = [[1, 0], [0, 1], [0, -1], [-1, 0]];
                    for (let diff of diffs) {
                        let newCoordinate: [number, number] = [coordinate[0] + diff[0], coordinate[1] + diff[1]];
                        if (newCoordinate[0] < 0 || newCoordinate[0] >= max_x || newCoordinate[1] < 0 || newCoordinate[1] >= max_y) {
                            continue;
                        }
                        if (coordinatesChecked.some((c) => c[0] == newCoordinate[0] && c[1] == newCoordinate[1])) {
                            continue;
                        }
                        if (split_lines[newCoordinate[1]][newCoordinate[0]] == label) {
                            gardenPlot.addCoordinate(newCoordinate);
                            coordinatesToCheck.push(newCoordinate);
                            coordinatesChecked.push(newCoordinate);
                        }
                    }
                }
                gardenPlots.push(gardenPlot);
            }
        }
        return gardenPlots.map((x) => x.perimeter() * x.coordinates.length).reduce((a, b) => a + b).toString();


    }

    solveForPartTwo(input: string): string {
        let gardenPlots: GardenPlot[] = [];
        const split_lines = input.split("\n");
        let coordinatesChecked: [number, number][] = [];
        let max_x = split_lines[0].length;
        let max_y = split_lines.length
        for (let y = 0; y < split_lines.length; y++) {
            for (let x = 0; x < split_lines[y].length; x++) {
                if (coordinatesChecked.some((c) => c[0] == x && c[1] == y)) {
                    continue;
                } else {
                    coordinatesChecked.push([x, y]);
                }
                // if the coordinate has note been checked yet that must mean it is a new garden plot
                let label = split_lines[y][x];
                let gardenPlot = new GardenPlot(label, [x, y]);
                let coordinatesToCheck: [number, number][] = [[x, y]];
                while (coordinatesToCheck.length > 0) {
                    let coordinate = coordinatesToCheck.pop()!;
                    let diffs = [[1, 0], [0, 1], [0, -1], [-1, 0]];
                    for (let diff of diffs) {
                        let newCoordinate: [number, number] = [coordinate[0] + diff[0], coordinate[1] + diff[1]];
                        if (newCoordinate[0] < 0 || newCoordinate[0] >= max_x || newCoordinate[1] < 0 || newCoordinate[1] >= max_y) {
                            continue;
                        }
                        if (coordinatesChecked.some((c) => c[0] == newCoordinate[0] && c[1] == newCoordinate[1])) {
                            continue;
                        }
                        if (split_lines[newCoordinate[1]][newCoordinate[0]] == label) {
                            gardenPlot.addCoordinate(newCoordinate);
                            coordinatesToCheck.push(newCoordinate);
                            coordinatesChecked.push(newCoordinate);
                        }
                    }
                }
                gardenPlots.push(gardenPlot);
            }
        }
        return gardenPlots.map((x) => x.sides() * x.coordinates.length).reduce((a, b) => a + b).toString();
    }
}

export default new Day12;