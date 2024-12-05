import { Day } from "../day";

class Day5 extends Day {

    constructor() {
        super(5);
    }

    checkUpdate(update: string, rules: Map<number, number[]>): number {
        let split_update: number[] = update.split(",").map(num => parseInt(num))
        // console.log(split_update);
        for (let i = 0; i < split_update.length; i++) {
            // need to check all the numbers before the value are not in the rules
            let number_of_interest = split_update[i]
            let update_numbers_to_check = split_update.slice(0, i)
            if (rules.has(number_of_interest)) {
                let rule_numbers_to_check = rules.get(number_of_interest)!;
                // console.log(number_of_interest)
                // console.log(rule_numbers_to_check)
                // console.log(update_numbers_to_check)
                if (update_numbers_to_check.some((value) => rule_numbers_to_check.includes(value))) {
                    return 0
                }
            }
        }
        return split_update[Math.floor(split_update.length / 2)]
    }

    solveForPartOne(input: string): string {
        let sum = 0;
        // going to use this like a defaultdict(list)
        let rules: Map<number, number[]> = new Map()
        const lines = input.split("\n")
        // console.log(lines.length)
        for (let line of lines) {
            // console.log(line)
            if (line == "") {
                break
            }
            let split_line = line.split("|")
            let first_number: number = parseInt(split_line[0])
            let second_number: number = parseInt(split_line[1])
            if (rules.has(first_number)) {
                // 
                let first_numbers = rules.get(first_number)
                if (first_numbers == undefined) {
                    continue
                }
                first_numbers.push(second_number)
                rules.set(first_number, first_numbers)
            } else {
                rules.set(first_number, [second_number])
            }
        }
        // updates start after the first empty line
        const updates = input.split("\n\n")[1].split("\n")
        for (let update of updates) {
            sum += this.checkUpdate(update, rules)
        }
        return sum.toString();
    }

    fixUpdate(update: string, rules: Map<number, number[]>): number {
        let split_update: number[] = update.split(",").map(num => parseInt(num))
        // for (let i = 0; i < split_update.length; i++) {
        //     // need to check all the numbers before the value are not in the rules
        //     let number_of_interest = split_update[i]
        //     let update_numbers_to_check = split_update.slice(0, i)
        //     if (rules.has(number_of_interest)) {
        //         let rule_numbers_to_check = rules.get(number_of_interest)!;
        //         if (update_numbers_to_check.some((value) => rule_numbers_to_check.includes(value))) {
        //             // need to do recursion
        //             for (let update_number_to_check of update_numbers_to_check) {
        //                 if (rule_numbers_to_check.includes(update_number_to_check)) {
        //                     // update split_update by moving the number to the right of the number of interest
        //                     console.log(split_update)
        //                     console.log("Update number to check" + update_number_to_check)
        //                     console.log("Number of interest" + number_of_interest)
        //                     console.log("rule numbers to check" + rule_numbers_to_check)
        //                     split_update = update_numbers_to_check.filter((value) => value != update_number_to_check).concat([number_of_interest]).concat([update_number_to_check]).concat(split_update.slice(i + 1))
        //                     console.log("Update after fixing" + split_update)
        //                     let new_update = split_update.join(",")
        //                     let new_update_check = this.checkUpdate(new_update, rules)
        //                     if (new_update_check > 0) {
        //                         return new_update_check
        //                     } else {
        //                         return this.fixUpdate(new_update, rules)
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        let hasChanges = true;

        while (hasChanges) {
            hasChanges = false;
            for (let i = 0; i < split_update.length; i++) {
                let number_of_interest = split_update[i];
                let update_numbers_to_check = split_update.slice(0, i);
                if (rules.has(number_of_interest)) {
                    let rule_numbers_to_check = rules.get(number_of_interest)!;
                    if (update_numbers_to_check.some((value) => rule_numbers_to_check.includes(value))) {
                        for (let update_number_to_check of update_numbers_to_check) {
                            if (rule_numbers_to_check.includes(update_number_to_check)) {
                                // Update split_update by moving the number to the right of the number of interest
                                // split_update = update_numbers_to_check.filter((value) => value != update_number_to_check)
                                //     .concat([number_of_interest])
                                //     .concat([update_number_to_check])
                                //     .concat(split_update.slice(i + 1));
                                // more memory efficient way to do this
                                // Move the conflicting number to the right of the number of interest in place
                                let index = split_update.indexOf(update_number_to_check);
                                split_update.splice(index, 1); // Remove the conflicting number
                                split_update.splice(i + 1, 0, update_number_to_check); // Insert it after the number of interest
                                // console.log("Update after fixing", split_update);
                                hasChanges = true;
                                break;
                            }
                        }
                        if (hasChanges) break;
                    }
                }
            }
        }

        let new_update = split_update.join(",");
        let new_update_check = this.checkUpdate(new_update, rules);
        return new_update_check;
    }

    fixUpdateUsingSort(update: string, rules: Map<number, number[]>): number {
        let split_update: number[] = update.split(",").map(num => parseInt(num))
        // console.log("original " + split_update)
        let hasChanges = true;
        let split_update_copy = split_update.slice();

        while (hasChanges) {
            hasChanges = false;
            for (const [key, value] of rules.entries()) {
                split_update_copy.sort((a, b) => {
                    if (a == key && value.includes(b)) {
                        return -1;
                    } else if (b == key && value.includes(a)) {
                        return 1;

                    }
                    return 0;
                }
                )
            }
            if (split_update_copy.join(",") != split_update.join(",")) {
                hasChanges = true;
                split_update = split_update_copy.slice();
            }
        }
        // console.log("fixed " + split_update_copy)
        let new_update_check = this.checkUpdate(split_update_copy.join(","), rules);
        return new_update_check;
    }

    solveForPartTwo(input: string): string {
        let sum = 0;
        // going to use this like a defaultdict(list)
        let rules: Map<number, number[]> = new Map()
        const lines = input.split("\n")
        // console.log(lines.length)
        for (let line of lines) {
            // console.log(line)
            if (line == "") {
                break
            }
            let split_line = line.split("|")
            let first_number: number = parseInt(split_line[0])
            let second_number: number = parseInt(split_line[1])
            if (rules.has(first_number)) {
                // 
                let first_numbers = rules.get(first_number)
                if (first_numbers == undefined) {
                    continue
                }
                first_numbers.push(second_number)
                rules.set(first_number, first_numbers)
            } else {
                rules.set(first_number, [second_number])
            }
        }
        // updates start after the first empty line
        const updates = input.split("\n\n")[1].split("\n")
        for (let update of updates) {
            if (this.checkUpdate(update, rules) == 0) {
                // this means that the original update violated the rules
                // sum += this.fixUpdate(update, rules)
                // try with sorting
                sum += this.fixUpdateUsingSort(update, rules)
            }
        }
        return sum.toString();

    }
}

export default new Day5;