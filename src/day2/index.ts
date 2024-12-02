import { Day } from "../day";

class Day2 extends Day {

    constructor() {
        super(2);
    }

    solveForPartOne(input: string): string {
        const splitInput = input.split("\n");
        let count = 0;
        for (let line of splitInput) {
            const line_array: number[] = line.split(" ").map(Number);
            // let difference_array: number[] = [];
            // // check that no item in the array differs by more than 3
            // for (let i = 0; i < line_array.length - 1; i++) {
            //     const difference = line_array[i] - line_array[i + 1];
            //     difference_array.push(difference);
            // }
            // const all_positive = difference_array.filter((a) => a > 0).length == difference_array.length;
            // const all_negative = difference_array.filter((a) => a < 0).length == difference_array.length;
            // if (!all_positive && !all_negative) {
            //     // console.log("not all differences are the same sign");
            //     // console.log(difference_array);
            //     continue;
            // }
            // difference_array = difference_array.map((a) => Math.abs(a));
            // if (difference_array.filter((a) => a > 3 || a < 1).length > 0) {
            //     // console.log("differs by more than 3 or less than 1");
            //     // console.log(difference_array);
            //     continue;
            // }
            // count++;
            if (this.check_array(line_array)) {
                count++;
            }

        }
        return count.toString();
    }

    check_array(array: number[]): boolean {
        let difference_array: number[] = [];
        // check that no item in the array differs by more than 3
        for (let i = 0; i < array.length - 1; i++) {
            const difference = array[i] - array[i + 1];
            difference_array.push(difference);
        }
        const all_positive = difference_array.filter((a) => a > 0).length == difference_array.length;
        const all_negative = difference_array.filter((a) => a < 0).length == difference_array.length;
        if (!all_positive && !all_negative) {
            // console.log("not all differences are the same sign");
            // console.log(difference_array);
            return false;
        }
        difference_array = difference_array.map((a) => Math.abs(a));
        if (difference_array.filter((a) => a > 3 || a < 1).length > 0) {
            // console.log("differs by more than 3 or less than 1");
            // console.log(difference_array);
            return false;
        }
        return true;
    }

    solveForPartTwo(input: string): string {
        const splitInput = input.split("\n");
        let count = 0;
        for (let line of splitInput) {
            const line_array: number[] = line.split(" ").map(Number);
            // console.log(line_array);
            let update_count = false;
            for (let i = 0; i < line_array.length; i++) {
                let shortened_array = []
                const left_array = line_array.slice(0, i);
                const right_array = line_array.slice(i + 1);
                shortened_array = left_array.concat(right_array);
                // console.log(shortened_array);
                if (this.check_array(shortened_array)) {
                    update_count = true;
                    break;
                }
            }
            if (update_count) {
                count++;
            }
        }
        return count.toString();
    }
}

export default new Day2;