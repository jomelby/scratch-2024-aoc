import { Day } from "../day";

class Day4 extends Day {

    constructor() {
        super(4);
    }

    searchLinesForChar(lines: string[], char: string, x: number, y: number): number[] {
        for (let i = -1; i < 3; i++) {
            for (let j = -1; j < 3; j++) {
                let search_x = x + i;
                let search_y = y + j;
                if (search_x < 0 || search_y < 0 || search_x >= lines[y].length || search_y >= lines.length) {
                    continue;
                }

                if (lines[search_y][search_x] == char) {
                    return [search_x, search_y];
                }
            }
        }
        return [-1, -1];
    }

    searchHorizontal(lines: string[], x: number, y: number): number {
        let count = 0;
        const forward = lines[y].slice(x, x + 4);
        if (forward == 'XMAS') {
            count++;
        }
        const backward = lines[y].slice(x - 3, x + 1);
        // console.log(backward);
        if (backward == 'SAMX') {
            count++;
        }
        return count;
    }
    searchVertical(lines: string[], x: number, y: number): number {
        let count = 0;
        let y_values = [];
        for (let i = 0; i < lines.length; i++) {
            y_values.push(lines[i][x]);
        }
        let y_values_str = y_values.join('');
        const down = y_values_str.slice(y, y + 4);
        if (down.toString() == 'XMAS') {
            count++;
        }
        const up = y_values_str.slice(y - 3, y + 1);
        if (up.toString() == 'SAMX') {
            count++;
        }
        return count;
    }
    searchDiagonal(lines: string[], x: number, y: number): number {
        let found = 0;
        let down_right_diagonal = '';
        for (let i = 0; i < 4; i++) {
            if (x + i >= lines[y].length || y + i >= lines.length) {
                break;
            }
            down_right_diagonal += lines[y + i][x + i];
        }
        if (down_right_diagonal == 'XMAS') {
            // console.log('found down right at ' + x + ' ' + y);
            found++;
        }
        let up_left_diagonal = '';
        for (let i = 0; i < 4; i++) {
            if (x - i < 0 || y - i < 0) {
                break;
            }
            up_left_diagonal += lines[y - i][x - i];
        }
        if (up_left_diagonal == 'XMAS') {
            // console.log('found up left at ' + x + ' ' + y);
            found++;
        }
        let down_left_diagonal = '';
        for (let i = 0; i < 4; i++) {
            if (x - i < 0 || y + i >= lines.length) {
                break;
            }
            down_left_diagonal += lines[y + i][x - i];
        }
        if (down_left_diagonal == 'XMAS') {
            // console.log('found down left at ' + x + ' ' + y);
            found++;
        }
        let up_right_diagonal = '';
        for (let i = 0; i < 4; i++) {
            if (x + i >= lines[y].length || y - i < 0) {
                break;
            }
            up_right_diagonal += lines[y - i][x + i];
        }
        if (up_right_diagonal == 'XMAS') {
            // console.log('found up right at ' + x + ' ' + y);
            found++;
        }
        return found;
    }

    solveForPartOne(input: string): string {
        let count: number = 0;
        let lines = input.split("\n");
        for (let y = 0; y < lines.length; y++) {
            for (let x = 0; x < lines[y].length; x++) {
                if (lines[y][x] == 'X') {
                    count += this.searchHorizontal(lines, x, y);
                    count += this.searchVertical(lines, x, y);
                    count += this.searchDiagonal(lines, x, y);
                }

            }
        } return count.toString();
    }

    getCrossSection(lines: string[], x: number, y: number): string[] {
        let down_right = '';
        for (let i = 0; i < 3; i++) {
            if (x + i >= lines[y].length || y + i >= lines.length) {
                break;
            }
            down_right += lines[y + i][x + i];
        }
        let up_right = '';
        for (let i = 0; i < 3; i++) {
            // this time we start two down from the original y
            if (x + i >= lines[y].length) {
                break;
            }
            up_right += lines[y + 2 - i][x + i];
        }

        return [down_right, up_right];
    }

    solveForPartTwo(input: string): string {
        let count: number = 0;
        let lines = input.split("\n");
        // don't need to go to the edge since the getCrossSection function will handle that
        for (let y = 0; y < lines.length - 2; y++) {
            for (let x = 0; x < lines[y].length - 2; x++) {
                //might speed things up a bit if we don't check the cross section if the first character is an A
                if (lines[y][x] == 'A') {
                    continue;
                }
                let cross_section = this.getCrossSection(lines, x, y);
                if ((cross_section[0] == 'MAS' || cross_section[0] == 'SAM') && (cross_section[1] == 'MAS' || cross_section[1] == 'SAM')) {
                    count++;
                }
            }
        }
        return count.toString();
    }
}

export default new Day4;