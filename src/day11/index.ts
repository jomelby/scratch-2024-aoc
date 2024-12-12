import { Day } from "../day";



function* blinkGenerator(stone: number): Generator<number> {
    if (stone === 0) {
        yield 1;
    } else if (stone.toString().length % 2 === 0) {
        yield parseInt(stone.toString().slice(0, stone.toString().length / 2))
        yield parseInt(stone.toString().slice(stone.toString().length / 2));
    } else {
        yield stone * 2024;
    }


}

class Day11 extends Day {

    constructor() {
        super(11);
    }

    blink(stones: number[]): number[] {
        let newStones = [];
        for (let stone of stones) {
            if (stone === 0) {
                newStones.push(1);
            } else if (stone.toString().length % 2 === 0) {
                newStones.push(parseInt(stone.toString().slice(0, stone.toString().length / 2)));
                newStones.push(parseInt(stone.toString().slice(stone.toString().length / 2)));
            } else {
                newStones.push(stone * 2024);
            }
        }
        return newStones;

    }

    memoizedBlink = memoize(this.blink.bind(this));


    blinkLargeArray(stones: number[]): number[] {
        let newStones = [];
        for (let stone of stones) {
            if (stone === 0) {
                newStones.push(1);
            } else if (stone.toString().length % 2 === 0) {
                newStones.push(parseInt(stone.toString().slice(0, stone.toString().length / 2)));
                newStones.push(parseInt(stone.toString().slice(stone.toString().length / 2)));
            } else {
                newStones.push(stone * 2024);
            }
        }
        return newStones;

    }

    solveForPartOne(input: string): string {
        let stones = input.split(' ').map((x) => parseInt(x));
        for (let i = 0; i < 25; i++) {
            stones = this.blink(stones);
        }

        return stones.length.toString();
    }


    blinkRecursive(stone: number, times: number, cache: Map<string, number>): number {
        const key = `${stone},${times}`;
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        if (times === 0) {
            return 1;
        } else {
            let new_stones = this.memoizedBlink([stone]);
            let count = 0;
            for (let new_stone of new_stones) {
                count += this.blinkRecursive(new_stone, times - 1, cache);
            }
            cache.set(key, count);
            return count;
        }
    }

    solveForPartTwo(input: string): string {
        let stones = input.split(' ').map((x) => parseInt(x));
        let count = 0;
        const cache = new Map<string, number>();
        for (let stone of stones) {
            count += this.blinkRecursive(stone, 75, cache);
        }
        return count.toString();
    }


    solveForPartTwoRecursively(input: string): string {
        let stones = input.split(' ').map((x) => parseInt(x));
        let count = 0;
        let cache = new Map<string, number>();
        // first number is the stone and the second number is the number of times to blink
        for (let stone of stones) {
            count += this.blinkRecursive(stone, 75, cache);
        }

        return count.toString();
    }
}

function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map<string, ReturnType<T>>();
    return function (...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key) as ReturnType<T>;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    } as T;
}


export default new Day11;